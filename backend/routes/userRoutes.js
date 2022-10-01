const express = require('express')
const router = express.Router()
const { 
    registerUser,
    loginUser,
    getMe,
    getAllUser
} = require('../controller/userController')
const {
    protect,
} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.get('/all',protect,getAllUser)

module.exports = router