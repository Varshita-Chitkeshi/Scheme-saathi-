const express = require('express')
const { match, myRecommendations } = require('../controllers/recommendationController')
const { protect, optionalAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/match', optionalAuth, match)
router.get('/my', protect, myRecommendations)

module.exports = router
