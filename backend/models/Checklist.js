const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    document: { type: String, required: true },
    available: { type: Boolean, default: false },
  },
  { _id: false },
)

const checklistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schemeSlug: { type: String, required: true },
    items: { type: [itemSchema], default: [] },
  },
  { timestamps: true },
)

checklistSchema.index({ user: 1, schemeSlug: 1 }, { unique: true })

module.exports = mongoose.model('Checklist', checklistSchema)
