import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const JWT_SECRET = process.env.JWT_SECRET || 'pharmacontext_secret_key'

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid authorization header' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, JWT_SECRET)
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const user = await User.findById(decoded.id).select('-password')
    if (!user) return res.status(401).json({ message: 'User not found' })

    req.user = user
    next()
  } catch (err) {
    console.error('Auth middleware error:', err.message)
    return res.status(401).json({ message: 'Not authorized' })
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user) return res.status(401).json({ message: 'Not authorized' })
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' })
  next()
}

export default { requireAuth, requireAdmin }
