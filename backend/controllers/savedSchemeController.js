const SavedScheme = require('../models/SavedScheme')
const asyncHandler = require('../utils/asyncHandler')
const { toSchemeDto } = require('../utils/schemeMapper')
const { findScheme } = require('./schemeController')

exports.listSaved = asyncHandler(async (req, res) => {
  const rows = await SavedScheme.find({ user: req.user._id }).populate('scheme').sort({ createdAt: -1 })
  const schemes = rows.filter((row) => row.scheme).map((row) => toSchemeDto(row.scheme))
  res.json({
    success: true,
    data: schemes,
    savedIds: schemes.map((s) => s.id),
  })
})

exports.saveScheme = asyncHandler(async (req, res) => {
  const scheme = await findScheme(req.params.schemeId)
  if (!scheme) {
    res.status(404)
    throw new Error('Scheme not found')
  }

  await SavedScheme.updateOne(
    { user: req.user._id, schemeSlug: scheme.slug },
    { user: req.user._id, scheme: scheme._id, schemeSlug: scheme.slug },
    { upsert: true },
  )

  if (!req.user.savedSchemes.includes(scheme.slug)) {
    req.user.savedSchemes.push(scheme.slug)
    await req.user.save()
  }

  res.status(201).json({
    success: true,
    message: 'Scheme saved',
    data: { schemeId: scheme.slug },
  })
})

exports.removeSaved = asyncHandler(async (req, res) => {
  const schemeId = req.params.schemeId
  await SavedScheme.deleteOne({ user: req.user._id, schemeSlug: schemeId })
  req.user.savedSchemes = (req.user.savedSchemes || []).filter((slug) => slug !== schemeId)
  await req.user.save()
  res.json({ success: true, message: 'Scheme removed', data: { schemeId } })
})
