import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  medicineId: {
    type: String,
    required: true,
    index: true,
  },
  medicineName: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema)
