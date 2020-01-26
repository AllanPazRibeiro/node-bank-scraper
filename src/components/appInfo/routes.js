const express = require('express');
const router = express.Router();

const services = require('./services');

router.get('/', async (req, res) => {
    res.send(services.appInfo());
});

module.exports = router;
