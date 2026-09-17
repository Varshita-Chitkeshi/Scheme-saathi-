const express = require('express')
const { listSaved, saveScheme, removeSaved } = require('../controllers/savedSchemeController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, listSaved)
router.post('/:schemeId', protect, saveScheme)
router.delete('/:schemeId', protect, removeSaved)

module.exports = router
