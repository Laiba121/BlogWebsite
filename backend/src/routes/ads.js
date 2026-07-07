import { Router } from 'express'
import AdSettings from '../models/AdSettings.js'

const router = Router()

const getOrCreateSettings = async () => {
  const settings = await AdSettings.findOne()
  if (settings) return settings
  return AdSettings.create({})
}

router.get('/', async (_req, res) => {
  try {
    const settings = await getOrCreateSettings()
    res.json({ success: true, settings })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/', async (req, res) => {
  try {
    const settings = await getOrCreateSettings()
    const updates = {}

    if (req.body.publisherId !== undefined) updates.publisherId = req.body.publisherId
    if (req.body.slotId !== undefined) updates.slotId = req.body.slotId
    if (req.body.enabled !== undefined) updates.enabled = req.body.enabled
    if (req.body.placement !== undefined) updates.placement = req.body.placement

    const updated = await AdSettings.findByIdAndUpdate(settings._id, updates, { returnDocument: 'after' })
    res.json({ success: true, settings: updated })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
