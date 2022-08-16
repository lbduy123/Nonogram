const mongoose = require('mongoose')
const { Schema } = mongoose;
Mixed = Schema.Types.Mixed

const nonogramSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
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
				by: {
					type: [],
					default: [],
				}
			}
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Nonogram', nonogramSchema)
