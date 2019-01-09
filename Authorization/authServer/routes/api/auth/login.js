const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');

const db = require('../../../module/pool');
const util = require('../../../module/util');

router.post('/', async (req, res, next) => {
    let isValid = true;
    let id = req.body.id;
    let pw = req.body.pw;
    var validationError = {
        name: 'ValidationError',
        errors: {}
    };

    if (!id) {
        isValid = false;
        validationError.errors.id = {
            message: "User Id id required"
        };
    } else if (!pw) {
        isValid = false;
        validationError.errors.pw = {
            message: "Password is required"
        };
    }

    if (!isValid) {
        res.status(200).send(util.successFalse(validationError, 400));
    } else {
        let checkQuery = "SELECT * FROM user WHERE id = ?";
        let checkResult = await db.queryParam_Arr(checkQuery, [id]);

        if (!checkResult) {
            res.status(200).send(util.successFalse(null, 'Internal Server Error', 500));
        } else if (checkResult === 1) {
            let hashedPw = await crypto.pbkdf2(pw, checkResult[0].salt, 100000, 32, 'sha512');

            if (hashedPw.toString('base64') === checkResult[0].pw) {
                var secretOrPrivateKey = "tmakdlfrpdlxm19!";
                var options = {
                    algorithm: "HMAC256",
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
                });
            } else {
                res.status(200).send(util.successFalse(null, 'Password Error', 400));
            }
        } else {
            res.status(200).send(util.successFalse(null, 'ID Error', 400));
        }
    }
});

module.exports = router;