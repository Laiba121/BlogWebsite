import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  category: String,
  description: String,
  content: String,
  image: String,
  author: String,
  featured: Boolean,
  trending: Boolean,
  readTime: String,
}, { timestamps: true })

export default mongoose.model("Article", articleSchema)