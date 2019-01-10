var express = require('express');
var router = express.Router();

router.use('/login', require('./login'));
router.use('/check', require('./check'));
router.use('/refresh', require('./refresh'));
router.use('/signup', require('./signup'));

module.exports = router;
