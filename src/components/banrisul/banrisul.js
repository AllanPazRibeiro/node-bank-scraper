const requests = require('./requests.js');
const logger = require('../../infra/logger')

const login = async (branch, account, password) => {
	logger.info(`Trying to log with the following account: ${account}`);
	try {
		await requests.login(branch, account, password);
	} catch (err) {
		throw new Error;
	}
};


const getBalance = async () => {
	logger.info(`Trying to retrieve balance`);
	try {
		let data = await requests.getBalance();
		this.data.balance = data.balance;
	} catch (error) {
		throw new Error;
	}
};



let banrisul = {
	data: {},
	login: login,
	getBalance: getBalance
};

module.exports = banrisul;
