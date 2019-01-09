var express = require('express');
var router = express.Router();

router.use('/auth', require('./api/auth'));

module.exports = router;
