var express = require('express');
var router = express.Router();
const db = require('../module/pool');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main.ejs', {
        title: "URL Shortner"
    });
});

router.get('/:url', async (req, res) => {
    let url = req.params.uwkqrl;

    let selectUrlQuery = 'SELECT original FROM urlDict WHERE url = ?';
    let selectUrl = await db.queryParam_Arr(selectUrlQuery, [url]);

    if (!selectUrl) {
        res.render('error.ejs');
    } else {
        res.render(selectUrl[0].original);
    }
});

module.exports = router;