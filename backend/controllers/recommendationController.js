const Scheme = require('../models/Scheme')
const Recommendation = require('../models/Recommendation')
const asyncHandler = require('../utils/asyncHandler')
const { rankSchemes } = require('../services/recommendationService')

exports.match = asyncHandler(async (req, res) => {
  const answers = req.body.answers || req.body.questionnaire || req.body
  const profile = req.body.profile || (req.user ? req.user.toProfileJSON() : {})
  const schemes = await Scheme.find({ isActive: true })
  const ranked = rankSchemes(schemes, answers, profile)

  if (req.user) {
    await Recommendation.create({
      user: req.user._id,
      answers,
      results: ranked.map((item) => ({
        schemeSlug: item.scheme.id,
        matchScore: item.matchScore,
        eligibilityStatus: item.eligibilityStatus,
        matchReasons: item.matchReasons,
      })),
    })
    req.user.lastQuestionnaire = answers
    await req.user.save()
  }

  res.json({
    success: true,
    data: ranked,
    recommendations: ranked,
  })
})

exports.myRecommendations = asyncHandler(async (req, res) => {
  const latest = await Recommendation.findOne({ user: req.user._id }).sort({ createdAt: -1 })
  if (!latest) {
    return res.json({ success: true, data: [], recommendations: [] })
  }

  const slugs = latest.results.map((item) => item.schemeSlug)
  const schemes = await Scheme.find({ slug: { $in: slugs }, isActive: true })
  const map = new Map(schemes.map((s) => [s.slug, s]))
  const ranked = rankSchemes(
    slugs.map((slug) => map.get(slug)).filter(Boolean),
    latest.answers || {},
    req.user.toProfileJSON(),
  )

  res.json({
    success: true,
    data: ranked,
    recommendations: ranked,
    answers: latest.answers,
  })
})
