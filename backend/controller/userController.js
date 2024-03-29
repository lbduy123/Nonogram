const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const async = require('express-async-handler')
const User = require('../model/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = async(async (req, res) => {
    const { name, email, username, password } = req.body

    if (!name || !email || !username || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if the user is already registered
    const emailExists = await User.findOne({ email })
    const usernameExists = await User.findOne({ username })

    if (emailExists || usernameExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        username,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async(async (req, res) => {
    const { username, password } = req.body

    // Check for user username
    const user = await User.findOne({ username })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            roleLevel: user.roleLevel,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async(async (req, res) => {
    res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}