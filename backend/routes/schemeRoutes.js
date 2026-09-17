const express = require('express')
const { listSchemes, searchSchemes, getScheme, viewScheme } = require('../controllers/schemeController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', listSchemes)
router.get('/search', searchSchemes)
router.get('/:id', getScheme)
router.post('/:id/view', protect, viewScheme)

module.exports = router
