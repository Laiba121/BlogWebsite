import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import articleRoutes  from "./src/routes/articles.js"
import adminRoutes    from "./src/routes/admin.js"
import categoryRoutes from "./src/routes/categories.js"  // ← ADD THIS

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/articles",   articleRoutes)
app.use("/api/admin",      adminRoutes)
app.use("/api/categories", categoryRoutes)  // ← ADD THIS

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)