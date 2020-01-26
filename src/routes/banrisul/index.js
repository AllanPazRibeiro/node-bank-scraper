const router = require('express').Router();

const base = require('../base');

router.use(function(req, res, next) {
  req.bank = {
    name: 'Banrisul',
    bankType: 'banrisul'
  };
  next();
})

router.use('/', base);

module.exports = router;
