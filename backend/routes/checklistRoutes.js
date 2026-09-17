const express = require('express')
const { getChecklist, updateChecklist, listAll } = require('../controllers/checklistController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, listAll)
router.get('/:schemeId', protect, getChecklist)
router.put('/:schemeId', protect, updateChecklist)

module.exports = router
