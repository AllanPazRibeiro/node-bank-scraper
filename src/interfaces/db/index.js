const mongoose = require('mongoose');
const logger = require('infra/logger');
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dataBase = process.env.MONGO_DATA_BASE;
const userName = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

const mongodbURL = `mongodb://${userName}:${password}@${host}:${port}/${dataBase}`;

mongoose.Promise = global.Promise;

const connect = async () => {
	try {
		await mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true });
		logger.info('[DB] Mongoose connected');
	} catch (err) {
		logger.error('[DB] Mongoose Error - ', err);
		return process.exit(1);
	}
};

connect();

module.exports = {
	mongoose
};
