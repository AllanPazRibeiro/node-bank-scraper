const routes = require('express').Router();
const logger = require('./../infra/logger');
const banrisul = require('../components/banrisul');

routes.post('/login', async function (req, res) {
	let branch = req.body.branch;
	let account = req.body.account;
	let password = req.body.password;
	login(req, res, branch, account, password);
});



function login(req, res, branch, account, password) {
	banrisul.login(branch, account, password);
}

module.exports = routes;