import { Router } from 'express'
import { CATEGORIES } from '../data/categories.js'

const router = Router()

router.get('/', (req, res) => {
  res.json(CATEGORIES)
})

export default router   // ✅ THIS LINE IS REQUIRED