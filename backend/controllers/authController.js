const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncHandler = require('../utils/asyncHandler')

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

function authPayload(user, token) {
  return {
    success: true,
    token,
    user: user.toSafeJSON(),
    data: { token, user: user.toSafeJSON() },
  }
}

exports.register = asyncHandler(async (req, res) => {
  const fullName = (req.body.fullName || req.body.name || '').trim()
  const email = (req.body.email || '').trim().toLowerCase()
  const { password, confirmPassword, state } = req.body

  if (!fullName) {
    res.status(400)
    throw new Error('Please enter your full name.')
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400)
    throw new Error('Enter a valid email address.')
  }
  if (!password || password.length < 6) {
    res.status(400)
    throw new Error('Password must be at least 6 characters.')
  }
  if (confirmPassword && password !== confirmPassword) {
    res.status(400)
    throw new Error('Passwords do not match.')
  }

  const exists = await User.findOne({ email })
  if (exists) {
    res.status(409)
    throw new Error('An account with this email already exists.')
  }

  const user = await User.create({
    fullName,
    email,
    password,
    state: state || '',
  })

  res.status(201).json(authPayload(user, signToken(user._id)))
})

exports.login = asyncHandler(async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase()
  const { password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Enter email and password.')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await user.matchPassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password.')
  }

  res.json(authPayload(user, signToken(user._id)))
})

exports.me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: req.user.toSafeJSON(),
    data: req.user.toSafeJSON(),
  })
})
