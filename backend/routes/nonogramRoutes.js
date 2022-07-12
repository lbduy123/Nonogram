const express = require('express')
const router = express.Router()
const { 
    getNonograms, 
    setNonogram, 
    updateNonogram, 
    deleteNonogram 
} = require('../controller/nonogramController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNonograms).post(protect, setNonogram)
router.route('/:id').put(protect, updateNonogram).delete(protect, deleteNonogram)

module.exports = router
