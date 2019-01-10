const express = require('express');
const router = express.Router();
const db = require('../../../module/pool');
const util = require('../../../module/util');

router.get('/', util.isLoggedin, async (req, res, next) => {
    let idx = req.decoded.idx;

    let checkQuery = "SELECT * FROM user WHERE idx = ?";
    let checkResult = await db.queryParam_Arr(checkQuery, [idx]);

    if (!checkResult) {
        res.status(200).send(util.successFalse(null, 'Internal Server Error : DB Select', 500));
    } else {
        res.status(200).send(util.successTrue(checkResult[0]));
    }
});

module.exports = router;