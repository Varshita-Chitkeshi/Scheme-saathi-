const asyncHandler = require('../utils/asyncHandler')
const { chatAboutSchemes } = require('../services/aiService')

exports.chat = asyncHandler(async (req, res) => {
  const message = (req.body.message || req.body.question || '').trim()
  if (!message) {
    res.status(400)
    throw new Error('Please enter a question.')
  }

  const language = req.body.language || 'en'
  const schemeId = req.body.schemeId || req.body.scheme?.id || req.body.scheme?.slug || null
  const profile = req.user ? req.user.toProfileJSON() : req.body.profile || null

  try {
    const result = await chatAboutSchemes({ message, language, schemeId, profile })
    res.json({
      success: true,
      data: { reply: result.reply, source: result.source },
      reply: result.reply,
    })
  } catch (error) {
    if (error.fallbackReply) {
      return res.json({
        success: true,
        data: { reply: error.fallbackReply, source: 'database' },
        reply: error.fallbackReply,
        warning: error.message,
      })
    }
    res.status(error.status || 502)
    throw new Error(error.message || 'AI assistant is unavailable.')
  }
})
