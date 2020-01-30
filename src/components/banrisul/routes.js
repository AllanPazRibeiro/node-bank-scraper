const routes = require('express').Router();
const services = require('./services');

routes.post('/', async function (req, res) {
	let branch = req.body.branch;
	let account = req.body.account;
	let password = req.body.password;
	const response = services(branch, account, password);
	res.status(201).send(response)
});

module.exports = routes;