const mongoose = require('mongoose')

const schemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    benefits: { type: [String], default: [] },
    whoCanApply: { type: [String], default: [] },
    eligibilityCriteria: { type: [String], default: [] },
    requiredDocuments: { type: [String], default: [] },
    applicationSteps: { type: [String], default: [] },
    officialUrl: { type: String, default: '' },
    officialWebsite: { type: String, default: '' },
    officialUrlVerified: { type: Boolean, default: false },
    lastVerifiedDate: { type: String, default: '' },
    state: { type: String, default: 'All India' },
    eligibleStates: { type: [String], default: ['All India'] },
    targetGroups: { type: [String], default: [] },
    occupations: { type: [String], default: [] },
    eligibleOccupations: { type: [String], default: [] },
    incomeHint: { type: String, default: '' },
    incomeLimit: { type: String, default: '' },
    minimumAge: { type: Number, default: null },
    maximumAge: { type: Number, default: null },
    importantInformation: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

schemeSchema.index({ name: 'text', shortDescription: 'text', category: 'text' })

module.exports = mongoose.model('Scheme', schemeSchema)
