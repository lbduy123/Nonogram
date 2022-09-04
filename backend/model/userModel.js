const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email address'],
            unique: true
        },
        username: {
            type: String,
            required: [true, 'Please add an username'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        roleLevel: {
            type: Number,
            default: 1,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)