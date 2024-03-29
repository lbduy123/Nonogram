const mongoose = require('mongoose')
const { Schema } = mongoose;
Mixed = Schema.Types.Mixed

const playedBySchema = mongoose.Schema(
	{
		id: {
			type: mongoose.Schema.Types.ObjectId,
		},
		bestTime: {
			type: Number,
		}
	}, { _id: false }
)

const nonogramSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		type: {
			type: String,
			required: true,
			default: 'workshop'
		},
		name: {
			type: String,
			required: true,
			unique: true
		},
		rows: {
			type: Number,
			required: [true, 'Please add row quantity'],
		},
		cols: {
			type: Number,
			required: [true, 'Please add column quantity'],
		},
		gridData: {
			type: [Mixed],
			default: [],
			required: [true, 'Please add your grid'],
		},
		meta: {
			votes: {
				type: [],
				default: [],
			},
			played: {
				quantity: {
					type: Number,
					default: 0,
				},
				by: [playedBySchema]
			},
			bestPlayTime: {
				id: {
					type: mongoose.Schema.Types.ObjectId,
				},
				value: {
					type: Number,
				}
			}
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Nonogram', nonogramSchema)
