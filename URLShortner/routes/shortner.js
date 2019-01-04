const express = require('express');
const router = express.Router();
const db = require('../module/pool');

router.get('/', async (req, res) => {
    let inputUrl = req.query.inputUrl;
    let shortenUrl = "";

    let selectUrlQuery = "SELECT * FROM urlDict WHERE original = ?";
    let selectUrl = await db.queryParam_Arr(selectUrlQuery, [inputUrl]);
    let lastId = 0;

    if (selectUrl.length != 0) {
        shortenUrl = await encode(selectUrl[0].id);
    } else {
        lastId = await db.queryParam_None('SELECT MAX(id) AS lastId FROM urlDict');
        lastId = lastId[0].lastId;
        shortenUrl = await encode(lastId + 1);

        let insertUrlQuery = 'INSERT INTO urlDict(id, url, original) VALUES ( ?, ?, ?)';
        let insertUrl = await db.queryParam_Arr(insertUrlQuery, [lastId + 1,shortenUrl, inputUrl]);
    }

    res.status(200).send({
        "encodedUrl": "localhost:3000/" + shortenUrl
    });
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