const mongoose = require('mongoose')
const Scheme = require('../models/Scheme')
const asyncHandler = require('../utils/asyncHandler')
const { toSchemeDto } = require('../utils/schemeMapper')

async function findScheme(id) {
  if (!id) return null
  let scheme = await Scheme.findOne({ slug: id, isActive: true })
  if (!scheme && mongoose.Types.ObjectId.isValid(id)) {
    scheme = await Scheme.findOne({ _id: id, isActive: true })
  }
  return scheme
}

function buildFilter(query) {
  const filter = { isActive: true }
  const search = query.search || query.q
  const { category, state, occupation, income } = query

  if (category) filter.category = category
  if (occupation) filter.occupations = occupation
  if (state && state !== 'All India') {
    filter.$or = [{ state: 'All India' }, { state }, { eligibleStates: state }]
  }
  if (income) {
    filter.$and = filter.$and || []
    filter.$and.push({
      $or: [{ incomeLimit: { $in: ['', null, income] } }, { incomeHint: { $regex: income, $options: 'i' } }],
    })
  }
  if (search) {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
    filter.$and = filter.$and || []
    filter.$and.push({
      $or: [{ name: regex }, { shortDescription: regex }, { category: regex }, { description: regex }],
    })
  }
  return filter
}

exports.listSchemes = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1)
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100)
  const filter = buildFilter(req.query)

  const total = await Scheme.countDocuments(filter)
  const docs = await Scheme.find(filter)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(limit)

  const schemes = docs.map(toSchemeDto)
  res.json({
    success: true,
    data: schemes,
    schemes,
    total,
    page,
    pages: Math.ceil(total / limit) || 1,
  })
})

exports.searchSchemes = asyncHandler(async (req, res) => {
  req.query.search = req.query.search || req.query.q || ''
  return exports.listSchemes(req, res)
})

exports.getScheme = asyncHandler(async (req, res) => {
  const scheme = await findScheme(req.params.id)
  if (!scheme) {
    res.status(404)
    throw new Error('Scheme not found')
  }
  res.json({
    success: true,
    data: toSchemeDto(scheme),
  })
})

exports.viewScheme = asyncHandler(async (req, res) => {
  const scheme = await findScheme(req.params.id)
  if (!scheme) {
    res.status(404)
    throw new Error('Scheme not found')
  }

  const slug = scheme.slug
  const existing = (req.user.recentlyViewedSchemes || []).filter((item) => item.slug !== slug)
  req.user.recentlyViewedSchemes = [{ slug, viewedAt: new Date() }, ...existing].slice(0, 10)
  await req.user.save()

  res.json({
    success: true,
    data: {
      scheme: toSchemeDto(scheme),
      recentlyViewed: req.user.recentlyViewedSchemes,
    },
  })
})

exports.findScheme = findScheme
