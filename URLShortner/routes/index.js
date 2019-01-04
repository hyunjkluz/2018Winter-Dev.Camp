var express = require('express');
var router = express.Router();

router.use('/', require('./mainView.js'));

router.use('/shortner', require('./shortner.js'));

module.exports = router;
