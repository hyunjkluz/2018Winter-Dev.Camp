const express = require('express');
const router = express.Router();
const db = require('../../../module/pool');

router.get('/', util.isLoggedin, async (req, res, next) => {
    let idx = req.decoded.idx;

    let checkQuery = "SELECT * FROM user WHERE idx = ?";
    let checkResult = await db.queryParam_Arr(checkQuery, [idx]);

    if (!checkResult) {
        res.status(200).send(util.successFalse(null, 'Internal Server Error : DB Select', 500));
    } else {
        var secretOrPrivateKey = "tmakdlfrpdlxm19!";
        var options = {
            algorithm : "HMAC256",
            expiresIn: "5h",
            issure: "smilegate"
        };
        var payload = {
            idx: checkResult[0].idx,
            id: checkResult[0].id,
            name: checkResult[0].name
        }
        jwt.sign(payload, secretOrPrivateKey, options, (err, token) => {
            if (err) {
                res.status(200).send(util.successFalse(err, 'token fail', 500));
            } else {
                res.status(200).send(util.successTrue(token));
            }
        })
    }
});

module.exports = router;