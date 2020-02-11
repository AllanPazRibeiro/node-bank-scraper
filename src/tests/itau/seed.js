module.exports = {
	userInfo: {
		branch: process.argv[2],
		account: process.argv[3],
		password: process.argv[4]
	},
	responseObject: {
		name: '',
		account: '',
		branch: '',
		password: '',
		info: {
			balance: '',
			overdraft: {
				total: '',
				available: '',
				used: ''
			},
			cardInfo: {
				name: '',
				dueDate: ''
			}
		},
		loginDate: ''
	}
}