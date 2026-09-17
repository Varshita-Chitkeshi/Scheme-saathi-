const mongoose = require('mongoose')

const savedSchemeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme', required: true },
    schemeSlug: { type: String, required: true },
  },
  { timestamps: true },
)

savedSchemeSchema.index({ user: 1, schemeSlug: 1 }, { unique: true })

module.exports = mongoose.model('SavedScheme', savedSchemeSchema)
