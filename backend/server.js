import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import articleRoutes  from "./src/routes/articles.js"
import adminRoutes    from "./src/routes/admin.js"
import authRoutes     from "./src/routes/auth.js"
import categoryRoutes from "./src/routes/categories.js"
import drugRoutes     from "./src/routes/drugs.js"
import settingsRoutes from "./src/routes/settings.js"
import adsRoutes from "./src/routes/ads.js"
import commentsRoutes from "./src/routes/comments.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/articles",   articleRoutes)
app.use("/api/admin",      adminRoutes)
app.use("/api/auth",       authRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/drugs",      drugRoutes)
app.use("/api/settings",   settingsRoutes)
app.use("/api/ads",        adsRoutes)
app.use("/api/comments",   commentsRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)