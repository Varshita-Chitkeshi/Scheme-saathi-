const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')

function readToken(req) {
  const header = req.headers.authorization || ''
  if (header.startsWith('Bearer ')) return header.slice(7).trim()
  return null
}

const protect = asyncHandler(async (req, res, next) => {
  const token = readToken(req)
  if (!token) {
    res.status(401)
    throw new Error('Not authorized. Please log in.')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (!user) {
      res.status(401)
      throw new Error('User not found.')
    }
    req.user = user
    next()
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      res.status(401)
      throw new Error('Invalid or expired token.')
    }
    throw error
  }
})

const optionalAuth = asyncHandler(async (req, res, next) => {
  const token = readToken(req)
  if (!token) return next()
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')
    if (user) req.user = user
  } catch {
    // Guest or expired token: continue without a user.
  }
  next()
})

module.exports = { protect, optionalAuth }
