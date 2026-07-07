import express from 'express'
import Comment from '../models/Comment.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/:medicineId', async (req, res) => {
  try {
    const comments = await Comment.find({ medicineId: req.params.medicineId })
      .sort({ createdAt: -1 })
      .lean()

    res.json(comments)
  } catch (error) {
    console.error('Fetch comments error:', error.message)
    res.status(500).json({ message: 'Unable to load comments.' })
  }
})

router.post('/:medicineId', requireAuth, async (req, res) => {
  try {
    const { name, message } = req.body || {}

    if (!name || !message) {
      return res.status(400).json({ message: 'Name and message are required.' })
    }

    const comment = await Comment.create({
      medicineId: req.params.medicineId,
      medicineName: req.body.medicineName || '',
      name: String(name).trim(),
      message: String(message).trim(),
    })

    res.status(201).json({
      message: 'Comment posted successfully.',
      comment,
    })
  } catch (error) {
    console.error('Create comment error:', error.message)
    res.status(500).json({ message: 'Unable to post comment.' })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' })
    }

    res.json({ message: 'Comment deleted successfully.' })
  } catch (error) {
    console.error('Delete comment error:', error.message)
    res.status(500).json({ message: 'Unable to delete comment.' })
  }
})

export default router
