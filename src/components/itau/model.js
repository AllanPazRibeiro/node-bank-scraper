const { mongoose } = require('../../interfaces/db');
const { Schema } = mongoose;
const Bcrypt = require('bcryptjs');

const ScrappedInfoItau = new Schema({
	name: {
		type: String,
		required: [true, 'The Name field is required.']
	},
	account: {
		type: String,
		required: [true, 'The Account field is required.'],
		minlength: 6,
		unique: false
	},
	branch: {
		type: String,
		required: [true, 'The Branch field is required.'],
		minlength: 4,
		unique: false
	},
	password: {
		type: String,
		required: [true, 'The Branch field is required.'],
		minlength: 6,
		unique: false
	},
	info: {
		balance: {
			type: String
		},
		overdraft: {
			total: {
				type: Number
			},
			available: {
				type: Number
			},
			used: {
				type: Number
			},
		},
		cardInfo: {
			name: {
				type: String
			},
			dueDate: {
				type: Date
			}
		}
	},
	loginDate: {
		type: Date,
		required: true
	}
});

ScrappedInfoItau.set('toJSON', {
	transform: function (doc, ret) {
		delete ret.__v;
		delete ret._id;
	}
});

const ScrappedInfoItauModel = mongoose.model('ScrappedInfoItau', ScrappedInfoItau);

module.exports = {
	ScrappedInfoItauModel
};