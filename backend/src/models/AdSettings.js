import mongoose from 'mongoose'

const adSettingsSchema = new mongoose.Schema({
  publisherId: { type: String, default: '' },
  slotId: { type: String, default: '' },
  enabled: { type: Boolean, default: false },
  placement: { type: String, default: 'sidebar' },
  scriptLoaded: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('AdSettings', adSettingsSchema)
