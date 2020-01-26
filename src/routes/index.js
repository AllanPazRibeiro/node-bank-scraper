const routes = require('express').Router();
const bodyParser = require("body-parser");
const banrisul = require('./banrisul');

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: false}));

routes.use('/', banrisul);

module.exports = routes;
