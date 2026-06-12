import mongoose from "mongoose"

const drugSchema = new mongoose.Schema({
  setId: {
    type: String,
    unique: true,
    required: true
  },
  title: String,
  splVersion: Number,
  publishedDate: Date,

  // Full label details (populated later)
  ingredients: [String],
  dosage: String,
  warnings: String,
  purpose: String,
  manufacturer: String,
  category: String,
  shortDescription: String,
  packageInfo: String,

  // OpenFDA metadata
  productNdc: [String],
  genericName: [String],
  brandName: [String],
  manufacturerName: [String],
  route: [String],
  dosageForm: [String],
  rxcui: [String],
  splId: [String],
  splSetId: [String],

  // Status tracking
  hasFullDetails: {
    type: Boolean,
    default: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export default mongoose.model("Drug", drugSchema)
