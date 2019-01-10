const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const moment = require('moment');

//naming을 바꾸기(name space 충돌을 막자 + 가독성)
const client = require('../../../module/redis');
const db = require('../../../module/pool');
const util = require('../../../module/util');
const jwt = require('../../../module/jwt');

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
        } else if (checkResult.length === 1) {
            let hashedPw = await crypto.pbkdf2(pw, checkResult[0].salt, 100000, 32, 'sha512');

            if (hashedPw.toString('base64') === checkResult[0].password) {
                let token = jwt.sign(checkResult[0])

                if (!token) {
                    res.status(200).send(util.successFalse(err, 'token fail', 500));
                } else {
                    let timeStamp = moment().format('YYYY-MM-DD hh:mm:ss').toString();

                    //redis에 사용자 등록하기
                    //remote ip 주소 등록 : 그것도 일치하는지 확인하자 
                    client.del(token);             
                    client.hmset(token, 'timeStamp', timeStamp);
                    client.hgetall(token, (err, obj) => {
                        console.log(obj.timeStamp);
                    });
                    
                    res.status(200).send(util.successTrue(token));
                }
            } else {
                res.status(200).send(util.successFalse(null, 'Password Error', 400));
            }
        } else {
            res.status(200).send(util.successFalse(null, 'ID Error', 400));
        }
    }
});

module.exports = router;