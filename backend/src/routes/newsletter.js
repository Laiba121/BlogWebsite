import { Router } from 'express'

const router = Router()

// POST /api/subscribe
router.post('/subscribe', (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  // For now just simulate saving
  res.json({ message: 'Subscribed successfully' })
})

export default router   // ✅ REQUIRED