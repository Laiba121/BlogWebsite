import nodemailer from 'nodemailer'

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  })
}

async function sendMail({ to, subject, html, text, devLink }) {
  const transporter = createTransporter()
  const { SMTP_FROM, SMTP_USER } = process.env

  if (!transporter) {
    console.log(`Email not sent because SMTP is not configured. ${subject}: ${devLink}`)
    return { devLink }
  }

  await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to,
    subject,
    html,
    text,
  })

  return { devLink: null }
}

export function buildVerificationUrl(token) {
  const appUrl = process.env.APP_URL || 'http://localhost:5173'
  return `${appUrl.replace(/\/$/, '')}/verify-email/${token}`
}

export function buildPasswordResetUrl(token) {
  const appUrl = process.env.APP_URL || 'http://localhost:5173'
  return `${appUrl.replace(/\/$/, '')}/reset-password/${token}`
}

export async function sendVerificationCodeEmail(email, code) {
  const result = await sendMail({
    to: email,
    subject: 'Your PharmaContext verification code',
    devLink: code,
    text: `Use this verification code to confirm your account: ${code}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Your PharmaContext verification code</h2>
        <p>Enter the code below in the app to verify your email address.</p>
        <p style="font-size: 22px; font-weight: 700; letter-spacing: 1px;">${code}</p>
        <p>If you did not request this, you can ignore this message.</p>
      </div>
    `,
  })

  return {
    ...result,
    devCode: result.devLink ? code : null,
  }
}

export async function sendVerificationEmail(email, token) {
  const link = buildVerificationUrl(token)

  return sendMail({
    to: email,
    subject: 'Verify your PharmaContext account',
    devLink: link,
    text: `Verify your PharmaContext account: ${link}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Verify your PharmaContext account</h2>
        <p>Confirm your email address to finish creating your account.</p>
        <p><a href="${link}" style="background:#2563eb;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px;display:inline-block;">Verify email</a></p>
        <p>If the button does not work, copy this link:</p>
        <p>${link}</p>
      </div>
    `,
  })
}

export async function sendPasswordResetEmail(email, token) {
  const link = buildPasswordResetUrl(token)

  return sendMail({
    to: email,
    subject: 'Reset your PharmaContext password',
    devLink: link,
    text: `Reset your PharmaContext password: ${link}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your PharmaContext password</h2>
        <p>Use this secure link to choose a new password.</p>
        <p><a href="${link}" style="background:#2563eb;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px;display:inline-block;">Reset password</a></p>
        <p>If the button does not work, copy this link:</p>
        <p>${link}</p>
      </div>
    `,
  })
}
