import { Router } from 'express'
import Category from '../models/Category.js'
import Drug from '../models/Drug.js'

const router = Router()

const makeSlug = (value = '') => value
  .toString()
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 1 }).lean()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' })
    }

    const slug = makeSlug(name)
    if (!slug) {
      return res.status(400).json({ success: false, message: 'Category name is invalid' })
    }

    const exists = await Category.findOne({ $or: [{ name: new RegExp(`^${name.trim()}$`, 'i') }, { slug }] })
    if (exists) {
      return res.status(409).json({ success: false, message: 'Category already exists' })
    }

    const category = await Category.create({ name: name.trim(), slug, description: description?.trim() || '' })
    res.status(201).json({ success: true, category })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Category name is required' })
    }

    const slug = makeSlug(name)
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }

    const duplicate = await Category.findOne({ _id: { $ne: category._id }, $or: [{ name: new RegExp(`^${name.trim()}$`, 'i') }, { slug }] })
    if (duplicate) {
      return res.status(409).json({ success: false, message: 'Category already exists' })
    }

    category.name = name.trim()
    category.slug = slug
    category.description = description?.trim() || ''
    await category.save()

    res.json({ success: true, category })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }

    await Drug.updateMany({ category: category.name }, { $unset: { category: '' } })
    res.json({ success: true, message: 'Category deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/:id/assign-medicines', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' })
    }

    const { medicineIds = [] } = req.body
    if (!Array.isArray(medicineIds)) {
      return res.status(400).json({ success: false, message: 'medicineIds must be an array' })
    }

    await Drug.updateMany({ _id: { $in: medicineIds } }, { $set: { category: category.name } })
    await Drug.updateMany({ _id: { $nin: medicineIds }, category: category.name }, { $unset: { category: '' } })

    const medicines = await Drug.find({ category: category.name }).sort({ title: 1 }).lean()
    res.json({ success: true, medicines })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router