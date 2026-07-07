import fs from 'fs'
import { Router } from 'express'
import multer from 'multer'
import SiteSettings from '../models/SiteSettings.js'
import cloudinary from '../config/cloudinary.js'

const router = Router()
const upload = multer({ dest: 'uploads/' })

const getOrCreateSettings = async () => {
  const settings = await SiteSettings.findOne()
  if (settings) return settings

  return SiteSettings.create({})
}

router.get('/', async (_req, res) => {
  try {
    const settings = await getOrCreateSettings()
    res.json({ success: true, settings })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/', upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'favicon', maxCount: 1 }]), async (req, res) => {
  try {
    const settings = await getOrCreateSettings()
    const allowedFields = [
      'siteName',
      'tagline',
      'supportEmail',
      'supportPhone',
      'facebook',
      'linkedin',
      'metaTitle',
      'metaDescription',
      'smtpHost',
      'smtpEmail',
    ]

    const updates = {}
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field]
      }
    })

    const uploadFile = async (file) => {
      if (!file) return null
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'pharmacontext/settings',
        resource_type: 'auto',
      })
      try { fs.unlinkSync(file.path) } catch (error) {
        console.error('Unable to delete temp upload', error)
      }
      return result.secure_url
    }

    if (req.files?.logo?.[0]) {
      updates.logoUrl = await uploadFile(req.files.logo[0])
    }

    if (req.files?.favicon?.[0]) {
      updates.faviconUrl = await uploadFile(req.files.favicon[0])
    }

    const updated = await SiteSettings.findByIdAndUpdate(settings._id, updates, { returnDocument: 'after' })
    res.json({ success: true, settings: updated })
  } catch (error) {
    console.error('Settings update error', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
