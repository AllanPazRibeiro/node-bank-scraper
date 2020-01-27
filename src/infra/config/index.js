require('dotenv').config();
const logger = require('infra/logger');
const { version, name } = require('../../../package.json');
process.env.APP_VERSION = version;
process.env.APP_NAME = name;
const config = require('./config.json');
const envConfig = config[process.env.NODE_ENV] || {};

Object.keys(envConfig).forEach((key) => {
	if (!process.env[key]) {
		process.env[key] = envConfig[key];
	} else {
		logger.warn(`process.env[${key}] is set globally`);
	}
});

const environmentVariables = [
	{ name: 'PORT', required: true, printOnStart: true },
	{ name: 'TZ', required: false, printOnStart: true }
];


for (let envVar of environmentVariables) {
	if (envVar.printOnStart) {
		if (process.env[envVar.name]) {
			logger.info(`process.env[${envVar.name}]=[${process.env[envVar.name]}]`);
		}
		else (logger.warn(`process.env[${envVar.name}] not found`));
	}
}
