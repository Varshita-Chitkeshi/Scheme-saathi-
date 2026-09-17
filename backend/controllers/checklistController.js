const Checklist = require('../models/Checklist')
const asyncHandler = require('../utils/asyncHandler')
const { findScheme } = require('./schemeController')

const CORE_DOCUMENTS = [
  { id: 'aadhaar', document: 'Aadhaar / identity document' },
  { id: 'income', document: 'Income certificate' },
  { id: 'address', document: 'Address proof' },
  { id: 'bank', document: 'Bank account details' },
  { id: 'caste', document: 'Caste certificate (where applicable)' },
  { id: 'education', document: 'Educational certificate (where applicable)' },
  { id: 'photo', document: 'Passport-size photograph' },
]

function readyCount(items) {
  const ready = items.filter((item) => item.available).length
  return {
    ready,
    total: items.length,
    summary: `${ready} of ${items.length} documents ready`,
  }
}

function defaultItems(schemeSlug, scheme) {
  if (schemeSlug === 'core') {
    return CORE_DOCUMENTS.map((item) => ({ ...item, available: false }))
  }
  const docs = scheme?.requiredDocuments || []
  return docs.map((document) => ({
    id: `${schemeSlug}:${document}`,
    document,
    available: false,
  }))
}

exports.listAll = asyncHandler(async (req, res) => {
  const rows = await Checklist.find({ user: req.user._id })
  const documents = {}
  rows.forEach((row) => {
    row.items.forEach((item) => {
      documents[item.id] = item.available
    })
  })
  res.json({ success: true, data: rows, documents })
})

exports.getChecklist = asyncHandler(async (req, res) => {
  const schemeSlug = req.params.schemeId
  let scheme = null
  if (schemeSlug !== 'core') {
    scheme = await findScheme(schemeSlug)
    if (!scheme) {
      res.status(404)
      throw new Error('Scheme not found')
    }
  }

  let row = await Checklist.findOne({ user: req.user._id, schemeSlug })
  if (!row) {
    row = await Checklist.create({
      user: req.user._id,
      schemeSlug,
      items: defaultItems(schemeSlug, scheme),
    })
  }

  res.json({
    success: true,
    data: {
      schemeId: schemeSlug,
      items: row.items,
      ...readyCount(row.items),
    },
  })
})

exports.updateChecklist = asyncHandler(async (req, res) => {
  const schemeSlug = req.params.schemeId
  let scheme = null
  if (schemeSlug !== 'core') {
    scheme = await findScheme(schemeSlug)
    if (!scheme) {
      res.status(404)
      throw new Error('Scheme not found')
    }
  }

  let items = req.body.items
  if (!items && req.body.documents) {
    items = Object.entries(req.body.documents).map(([id, available]) => ({
      id,
      document: id.includes(':') ? id.split(':').slice(1).join(':') : id,
      available: Boolean(available),
    }))
  }
  if (!Array.isArray(items)) {
    res.status(400)
    throw new Error('Provide items or documents to update.')
  }

  const normalized = items.map((item) => ({
    id: item.id || `${schemeSlug}:${item.document}`,
    document: item.document || item.label || item.id,
    available: Boolean(item.available ?? item.checked),
  }))

  const row = await Checklist.findOneAndUpdate(
    { user: req.user._id, schemeSlug },
    { user: req.user._id, schemeSlug, items: normalized },
    { new: true, upsert: true, setDefaultsOnInsert: true },
  )

  res.json({
    success: true,
    data: {
      schemeId: schemeSlug,
      items: row.items,
      ...readyCount(row.items),
    },
  })
})
