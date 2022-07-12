const asyncHandler = require('express-async-handler');

const Nonogram = require('../model/nonogramModel')

// @desc    Get nonograms
// @route   GET /api/nonograms
// @access  Private
const getNonograms = asyncHandler(async (req, res) => {
    const nonograms = await Nonogram.find({ author: req.user.id })

    res.status(200).json(nonograms)
})

// @desc    Set Nonogram
// @route   POST /api/nonograms
// @access  Private
const setNonogram = asyncHandler(async (req, res) => {
    if (!req.body.rows || !req.body.cols || !req.body.gridData) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const nonogram = await Nonogram.create({
        rows: req.body.rows,
        cols: req.body.cols,
        gridData: req.body.gridData,
        author: req.user.id,
    })
    
    res.status(200).json(nonogram)
})

// @desc    Update Nonogram
// @route   PUT /api/nonograms
// @access  Private
const updateNonogram = asyncHandler(async (req, res) => {
    const nonogram = await Nonogram.findById(req.params.id)

    if (!nonogram) {
        res.status(400)
        throw new Error('Nonogram not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    } 

    // Make sure the logged in user matches the goal user
    if (nonogram.author.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedNonogram = await Nonogram.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedNonogram)
})

// @desc    Delete nonogram
// @route   DELETE /api/goals
// @access  Private
const deleteNonogram = asyncHandler(async (req, res) => {
    const nonogram = await Nonogram.findById(req.params.id)

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    } 

    // Make sure the logged in user matches the goal user
    if (nonogram.author.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    if (!nonogram) {
        res.status(400)
        throw new Error('Nonogram not found')
    }

    await nonogram.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getNonograms,
    setNonogram,
    updateNonogram,
    deleteNonogram
}