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
    let url = req.params.url;

    let selectUrlQuery = 'SELECT original FROM urlDict WHERE url = ?';
    let selectUrl = await db.queryParam_Arr(selectUrlQuery, [url]);

    if (!selectUrl) {
        res.status(500).send({
            "message" : "Internal Server Error : Database Error"
        });
    } else {
        res.status(200).send({
            "message" : "Successfully Get Data",
            "originalUrl" : selectUrl[0].original
        });
    }
});

module.exports = router;