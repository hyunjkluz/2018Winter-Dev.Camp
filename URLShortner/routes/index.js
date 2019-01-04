var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main.html', {
        title : "URL Shortner" 
  });
});

router.use('/shortner', require('./shortner.js'));

module.exports = router;
