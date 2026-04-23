import express from "express"
import multer from "multer"
import fs from "fs"
import cloudinary from "../config/cloudinary.js"
import Article from "../models/Articles.js"

const router = express.Router()
const upload = multer({ dest: "uploads/" })

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

export default router