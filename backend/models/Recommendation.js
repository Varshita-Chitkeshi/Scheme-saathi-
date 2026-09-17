const mongoose = require('mongoose')

const matchItemSchema = new mongoose.Schema(
  {
    schemeSlug: { type: String, required: true },
    matchScore: { type: Number, required: true },
    eligibilityStatus: { type: String, required: true },
    matchReasons: { type: [String], default: [] },
  },
  { _id: false },
)

const recommendationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answers: { type: mongoose.Schema.Types.Mixed, default: {} },
    results: { type: [matchItemSchema], default: [] },
  },
  { timestamps: true },
)

recommendationSchema.index({ user: 1, createdAt: -1 })

module.exports = mongoose.model('Recommendation', recommendationSchema)
