const routes = require('express').Router();
const services = require('./services');

routes.post('/', async function (req, res) {
	const branch = req.body.branch;
	const account = req.body.account;
	const password = req.body.password
	const response = await services(branch, account, password);
	res.status(201).send(JSON.stringify(response.data));
});

module.exports = routes;