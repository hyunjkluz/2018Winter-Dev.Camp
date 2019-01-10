const express = require('express');
const router = express.Router();
const moment = require('moment');

const db = require('../../../module/pool');
const util = require('../../../module/util');
const client = require('../../../module/redis');
const jwt = require('../../../module/jwt');

router.post('/', util.isLoggedin, async (req, res, next) => {
    let idx = req.decoded.idx;

    let checkQuery = "SELECT * FROM user WHERE idx = ?";
    let checkResult = await db.queryParam_Arr(checkQuery, [idx]);

    if (!checkResult) {
        res.status(200).send(util.successFalse(null, 'Internal Server Error : DB Select', 500));
    } else {
        let timeStamp = moment().format('YYYY-MM-DD hh:mm:ss').toString();
        let token = jwt.sign(checkResult[0])

        client.del(token);             
        client.hmset(token, 'timeStamp', timeStamp);
        client.hgetall(token, (err, obj) => {
            console.log(obj.timeStamp);
        });

        if (!token) {
            res.status(200).send(util.successFalse(err, 'token fail', 500));
        } else {
            res.status(200).send(util.successTrue(token));
        }
    }
});

module.exports = router;