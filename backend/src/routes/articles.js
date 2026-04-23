import express from "express"
import Article from "../models/Articles.js"

const router = express.Router()

// GET ALL ARTICLES
router.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 })
  res.json(articles)
})

// GET SINGLE ARTICLE
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  res.json(article)
})

export default router