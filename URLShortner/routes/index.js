var express = require('express');
var router = express.Router();

router.use('/shortner', require('./shortner.js'));
router.use('/', require('./mainView.js'));


module.exports = router;
