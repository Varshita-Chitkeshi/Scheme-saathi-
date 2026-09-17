const User = require('../models/User')
const Scheme = require('../models/Scheme')
const SavedScheme = require('../models/SavedScheme')
const asyncHandler = require('../utils/asyncHandler')
const { toSchemeDto } = require('../utils/schemeMapper')

const PROFILE_FIELDS = [
  'fullName',
  'age',
  'gender',
  'state',
  'district',
  'occupation',
  'employmentType',
  'annualIncome',
  'annualIncomeRange',
  'socialCategory',
  'areaType',
  'disabilityStatus',
  'isStudent',
  'isFarmer',
  'isEntrepreneur',
]

async function recentlyViewedDtos(user) {
  const slugs = (user.recentlyViewedSchemes || []).map((item) => item.slug)
  if (!slugs.length) return []
  const schemes = await Scheme.find({ slug: { $in: slugs }, isActive: true })
  const map = new Map(schemes.map((s) => [s.slug, toSchemeDto(s)]))
  return slugs.map((slug) => map.get(slug)).filter(Boolean)
}

exports.getProfile = asyncHandler(async (req, res) => {
  const saved = await SavedScheme.find({ user: req.user._id }).select('schemeSlug')
  const recentlyViewed = await recentlyViewedDtos(req.user)
  const profile = req.user.toProfileJSON()

  res.json({
    success: true,
    data: profile,
    profile,
    savedSchemeIds: saved.map((item) => item.schemeSlug),
    recentlyViewed,
  })
})

exports.updateProfile = asyncHandler(async (req, res) => {
  const updates = {}
  for (const field of PROFILE_FIELDS) {
    if (req.body[field] !== undefined) updates[field] = req.body[field]
  }
  if (updates.fullName) updates.fullName = String(updates.fullName).trim()
  if (updates.annualIncome && !updates.annualIncomeRange) {
    updates.annualIncomeRange = updates.annualIncome
  }
  if (updates.annualIncomeRange && !updates.annualIncome) {
    updates.annualIncome = updates.annualIncomeRange
  }
  if (updates.occupation && !updates.employmentType) {
    updates.employmentType = updates.occupation
  }

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  })

  const profile = user.toProfileJSON()
  res.json({
    success: true,
    data: profile,
    profile,
    user: user.toSafeJSON(),
  })
})
