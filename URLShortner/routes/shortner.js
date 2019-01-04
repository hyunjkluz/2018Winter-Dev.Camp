const express = require('express');
const router = express.Router();
const db = require('../module/pool');

router.get('/', async (req, res) => {
    let inputUrl = req.params.inputUrl;
    let shortenUrl = "";

    let selectUrlQuery = 'SELECT * FROM urlDict WHERE original = ?';
    let selectUrl = await db.queryParam_Arr(selectUrlQuery, [inputUrl]);

    if (selectUrl != null) {
        shortenUrl = await encode(selectUrl[0].id);
    } else {
        let lastId = await db.queryParam_None('SELECT MAX(id) AS lastId FROM urlDict');
        lastId = lastId[0].lastId;

        let insertUrlQuery = 'INSERT INTO '

        res.status(200).send({
            "encodedUrl": "localhost://" + shortenUrl
        });

    }
});

function encode(id) {
    let base62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var base = base62.length;
    let ret = "";
    let val;

    while (id > 0) {
        val = id % base;
        ret = ret + base62.substr(val, 1)
        id = id / base - id % base / base;
    }

    return ret.split('').reverse().join('');
}

module.exports = router;