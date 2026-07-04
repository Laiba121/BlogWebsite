import crypto from 'crypto'
import express from 'express'
import axios from 'axios'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { sendPasswordResetEmail, sendVerificationCodeEmail } from '../utils/mailer.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'pharmacontext_secret_key'
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const TOKEN_BYTES = 32
const EMAIL_TOKEN_MINUTES = 2
const RESET_TOKEN_MINUTES = 60

async function verifyGoogleIdToken(idToken) {
  const response = await axios.get('https://oauth2.googleapis.com/tokeninfo', {
    params: { id_token: idToken },
  })

  const data = response.data
  if (!data?.email_verified || data.email_verified !== 'true') {
    throw new Error('Google account email is not verified.')
  }

  if (GOOGLE_CLIENT_ID && data.aud !== GOOGLE_CLIENT_ID) {
    throw new Error('Google ID token audience does not match.')
  }

  return data
}

function buildJwtToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
}

function createRawToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex')
}

function createVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function buildResponseUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar || null,
    bio: user.bio || '',
  }
}

function emailVerificationExpires() {
  return new Date(Date.now() + EMAIL_TOKEN_MINUTES * 60 * 1000)
}

function passwordResetExpires() {
  return new Date(Date.now() + RESET_TOKEN_MINUTES * 60 * 1000)
}

async function setVerificationToken(user) {
  const code = createVerificationCode()
  user.emailVerificationToken = hashToken(code)
  user.emailVerificationExpires = emailVerificationExpires()
  await user.save()

  const mailResult = await sendVerificationCodeEmail(user.email, code)
  return { ...mailResult, code }
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const existingUser = await User.findOne({ email: normalizedEmail })

    if (existingUser?.isEmailVerified) {
      return res.status(409).json({ message: 'Email is already in use.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = existingUser || new User({ email: normalizedEmail })

    user.name = name
    user.password = hashedPassword
    user.isEmailVerified = false
    user.passwordResetToken = null
    user.passwordResetExpires = null

    const mailResult = await setVerificationToken(user)

    res.status(existingUser ? 200 : 201).json({
      message: mailResult.devLink
        ? `SMTP is not configured, so no email was sent. Use this verification code: ${mailResult.code}`
        : 'Verification code sent. Please check your inbox before signing in.',
      devCode: mailResult.code || null,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to create user at this time.' })
  }
})

async function handleGoogleAuth(req, res) {
  try {
    const { idToken } = req.body
    if (!idToken) {
      return res.status(400).json({ message: 'Google ID token is required.' })
    }

    const googleData = await verifyGoogleIdToken(idToken)
    const normalizedEmail = googleData.email.toLowerCase().trim()
    let user = await User.findOne({ email: normalizedEmail })

    if (!user) {
      user = new User({
        name: googleData.name || 'Google User',
        email: normalizedEmail,
        password: crypto.randomBytes(32).toString('hex'),
        isEmailVerified: true,
        avatar: googleData.picture || null,
      })
    } else {
      user.name = user.name || googleData.name || user.email
      user.avatar = user.avatar || googleData.picture || null
      user.isEmailVerified = true
    }

    await user.save()
    const token = buildJwtToken(user)
    res.json({ user: buildResponseUser(user), token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.response?.data?.error_description || error.message || 'Unable to sign in with Google at this time.' })
  }
}

router.post('/signup/google', handleGoogleAuth)
router.post('/signin/google', handleGoogleAuth)

async function findVerificationTokenUser(token) {
  return User.findOne({
    emailVerificationToken: hashToken(token),
    isEmailVerified: false,
  })
}

router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body
    if (!email || !code) {
      return res.status(400).json({ message: 'Email and verification code are required.' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const codeHash = hashToken(code)
    const user = await User.findOne({
      email: normalizedEmail,
      emailVerificationToken: codeHash,
      emailVerificationExpires: { $gt: new Date() },
      isEmailVerified: false,
    })

    if (!user) {
      const expiredUser = await User.findOne({
        email: normalizedEmail,
        isEmailVerified: false,
      })

      if (expiredUser && expiredUser.emailVerificationExpires && expiredUser.emailVerificationExpires <= new Date()) {
        return res.status(410).json({
          message: 'Verification code has expired. You can request a new one.',
          email: normalizedEmail,
        })
      }

      return res.status(400).json({ message: 'Verification code is invalid.' })
    }

    user.isEmailVerified = true
    user.emailVerificationToken = null
    user.emailVerificationExpires = null
    await user.save()

    const token = buildJwtToken(user)
    res.json({
      message: 'Email verified. You are now signed in.',
      user: buildResponseUser(user),
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to verify email at this time.' })
  }
})

router.post('/verify-email/resend', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const user = await User.findOne({ email: normalizedEmail })
    if (!user || user.isEmailVerified) {
      return res.status(400).json({ message: 'No unverified account found for that email.' })
    }

    const mailResult = await setVerificationToken(user)
    res.json({
      message: mailResult.devLink
        ? `SMTP is not configured, so no email was sent. Use this verification code: ${mailResult.code}`
        : 'A new verification code has been sent.',
      devCode: mailResult.devLink ? mailResult.code : null,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to resend verification code at this time.' })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    if (user.role !== 'admin' && !user.isEmailVerified) {
      return res.status(403).json({
        message: 'Your account is not verified yet. Please verify your email using the code sent to your inbox, or request a new verification code.',
      })
    }

    const token = buildJwtToken(user)

    res.json({ user: buildResponseUser(user), token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to sign in at this time.' })
  }
})

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user || !user.isEmailVerified) {
      return res.json({ message: 'If a verified account exists for that email, a password reset link has been sent.' })
    }

    const token = createRawToken()
    user.passwordResetToken = hashToken(token)
    user.passwordResetExpires = passwordResetExpires()
    await user.save()

    const mailResult = await sendPasswordResetEmail(user.email, token)
    res.json({
      message: 'If a verified account exists for that email, a password reset link has been sent.',
      devLink: mailResult.devLink,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to start password reset at this time.' })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ message: 'Reset token and new password are required.' })
    }

    const user = await User.findOne({
      passwordResetToken: hashToken(token),
      passwordResetExpires: { $gt: new Date() },
      isEmailVerified: true,
    })

    if (!user) {
      return res.status(400).json({ message: 'Password reset link is invalid or expired.' })
    }

    user.password = await bcrypt.hash(password, 10)
    user.passwordResetToken = null
    user.passwordResetExpires = null
    await user.save()

    res.json({ message: 'Password updated. You can now sign in.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to reset password at this time.' })
  }
})

router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() })
    if (!user || user.isEmailVerified) {
      return res.status(400).json({ message: 'No unverified account found for that email.' })
    }

    const mailResult = await setVerificationToken(user)
    res.json({
      message: mailResult.devLink
        ? `SMTP is not configured, so no email was sent. Use this verification code: ${mailResult.code}`
        : 'A new verification code has been sent.',
      devCode: mailResult.devLink ? mailResult.code : null,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to resend verification code at this time.' })
  }
})

export default router
