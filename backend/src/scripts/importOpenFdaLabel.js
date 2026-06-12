import mongoose from "mongoose"
import axios from "axios"
import dotenv from "dotenv"
import Drug from "../models/Drug.js"

dotenv.config()

const OPENFDA_API = "https://api.fda.gov"

const normalizeOpenFda = (openfda = {}) => ({
  productNdc: openfda.product_ndc || [],
  genericName: openfda.generic_name || [],
  brandName: openfda.brand_name || [],
  manufacturerName: openfda.manufacturer_name || [],
  route: openfda.route || [],
  dosageForm: openfda.dosage_form || [],
  rxcui: openfda.rxcui || [],
  splId: openfda.spl_id || [],
  splSetId: openfda.spl_set_id || []
})

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MongoDB")

    const limit = 100
    const skip = 0
    const response = await axios.get(`${OPENFDA_API}/drug/label.json?limit=${limit}&skip=${skip}`)
    const results = response.data?.results || []

    let updatedCount = 0
    let unmatchedCount = 0

    for (const item of results) {
      const openfda = item.openfda || {}
      const setIds = openfda.spl_set_id || []
      if (!setIds.length) {
        unmatchedCount++
        continue
      }

      const setId = setIds[0]
      const updateData = {
        ...normalizeOpenFda(openfda),
        lastUpdated: new Date()
      }

      const updatedDrug = await Drug.findOneAndUpdate(
        { setId },
        updateData,
        { returnDocument: "after" }
      )

      if (updatedDrug) {
        updatedCount++
      } else {
        unmatchedCount++
      }
    }

    console.log(`OpenFDA label merge complete. Updated: ${updatedCount}, Unmatched: ${unmatchedCount}`)
  } catch (error) {
    console.error("OpenFDA label import failed:", error.message || error)
  } finally {
    await mongoose.disconnect()
  }
}

main()
