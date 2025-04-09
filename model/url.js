const { mongoose, Schema } = require('mongoose');

const urlSchema = new mongoose.Schema(
	{
		shortId: {
			type: String,
			required: true,
			unique: true,
		},
		redirectURL: {
			type: String,
			required: true,
		},
		visitHistory: [{ timestamp: { type: Date,
            default:Date.now
         } }],
	},
	{ timestamps: true }
);

const Url = mongoose.model('url', urlSchema);

module.exports = { Url };
