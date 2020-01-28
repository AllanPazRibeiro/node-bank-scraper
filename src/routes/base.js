const routes = require('express').Router();
const logger = require('./../infra/logger');
const banrisul = require('../components/banrisul');

routes.post('/login', async function (req, res) {
	let branch = req.body.branch;
	let account = req.body.account;
	let password = req.body.password;
	const response = login(req, res, branch, account, password);
	logger.info(' balance ' + JSON.stringify(response));
	res.send(201, response);
});



function login(req, res, branch, account, password) {
	banrisul.login(branch, account, password);
}

module.exports = routes;