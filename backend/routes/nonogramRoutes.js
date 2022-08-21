const express = require('express')
const router = express.Router()
const {
    getAllNonograms,
    getNonograms,
    getNonogram,
    setNonogram,
    updateNonogram,
    updateNonogramVotes,
    updateNonogramPlayed,
    deleteNonogram
} = require('../controller/nonogramController')

const { protect } = require('../middleware/authMiddleware')

router.route('/all').get(protect, getAllNonograms)
router.route('/').get(protect, getNonograms).post(protect, setNonogram)
router.route('/:id').get(protect, getNonogram).put(protect, updateNonogram).delete(protect, deleteNonogram)
router.route('/:id/votes').put(protect, updateNonogramVotes)
router.route('/:id/played').put(protect, updateNonogramPlayed)

module.exports = router
