import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'careerpulse_secret_key'

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(409).json({ message: 'Email is already registered.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    const respUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null,
      bio: user.bio || ''
    }

    res.status(201).json({ user: respUser, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to create user at this time.' })
  }
})

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

    const respUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null,
      bio: user.bio || ''
    }

    res.json({ user: respUser, token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Unable to sign in at this time.' })
  }
})

export default router
