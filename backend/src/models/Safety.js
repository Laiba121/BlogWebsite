import mongoose from "mongoose"

const safetySchema = new mongoose.Schema({
  setId: {
    type: String,
    unique: true,
    required: true
  },
  recalls: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  adverseEvents: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  safetyAlerts: {
    type: [mongoose.Schema.Types.Mixed],
    default: []
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export default mongoose.model("Safety", safetySchema)
