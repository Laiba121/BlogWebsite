import express from "express"
import multer from "multer"
import fs from "fs"
import cloudinary from "../config/cloudinary.js"
import Article from "../models/Articles.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()
const upload = multer({ dest: "uploads/" })

// Protect all admin routes
router.use(requireAuth)
router.use(requireAdmin)

router.post("/articles", upload.single("image"), async (req, res) => {
  try {
    // Guard: no file uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" })
    }

    const result = await cloudinary.uploader.upload(req.file.path)

    // Clean up temp file
    fs.unlinkSync(req.file.path)

    const newArticle = await Article.create({
      title:       req.body.title,
      slug:        req.body.slug,
      category:    req.body.category,
      description: req.body.description,
      content:     req.body.content,
      image:       result.secure_url,
      author:      req.body.author,
      featured:    req.body.featured === "true",
      trending:    req.body.trending === "true",
      readTime:    req.body.readTime,
    })

    res.status(201).json(newArticle)

  } catch (err) {
    console.error("❌ Admin error:", err.message)
    res.status(500).json({ error: err.message })
  }
})

// Get current admin profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    res.json(user)
  } catch (err) {
    console.error('Profile get error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// Update admin profile (fields + optional avatar upload)
router.put('/profile', upload.single('avatar'), async (req, res) => {
  try {
    const updates = {}
    if (req.body.name) updates.name = req.body.name
    if (req.body.email) updates.email = req.body.email.toLowerCase()
    if (req.body.bio !== undefined) updates.bio = req.body.bio

    // If password provided, hash it
    if (req.body.password) {
      const hashed = await bcrypt.hash(req.body.password, 10)
      updates.password = hashed
    }

    // If file uploaded, upload to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path)
      updates.avatar = result.secure_url
      // cleanup
      try { fs.unlinkSync(req.file.path) } catch (e) { /* ignore */ }
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password')
    res.json(user)
  } catch (err) {
    console.error('Profile update error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

export default router