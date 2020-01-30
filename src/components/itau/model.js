const { mongoose } = require('../../interfaces/db');
const { Schema } = mongoose;

const ScrappedInfoItau = new Schema({
	name: {
		type: String,
		required: [true, 'The Name field is required.']
	},
	account: {
		type: String,
		required: [true, 'The Account field is required.'],
		trim: true,
		minlength: 3,
		unique: true
	},
	branch: {
		type: String,
		required: [true, 'The Branch field is required.'],
		trim: true,
		minlength: 6,
		unique: true
	},
	info: {
		balance: {

		},
		overdraft: {

		},
		cardInfo: {

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
	}
});

const ScrappedInfoItauModel = mongoose.model('ScrappedInfoItau', ScrappedInfoItau);

module.exports = {
	ScrappedInfoItauModel
};