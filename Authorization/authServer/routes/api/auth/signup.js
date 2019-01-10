const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');
const moment = require('moment');

const client = require('../../../module/redis');
const db = require('../../../module/pool');
const util = require('../../../module/util');
const jwt = require('../../../module/jwt');

router.post('/', async (req, res, next) => {
    let isValid = true;
    let id = req.body.id;
    let pw = req.body.pw;
    let name = req.body.name;
    let email = req.body.email;
    let gender = req.body.gender;

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
            
            const salt = await crypto.randomBytes(32);
            let hashedPw = await crypto.pbkdf2(pw, salt.toString('base64'), 100000, 32, 'sha512');

            let insertQuery = 'INSERT INTO user (id, password, salt, name, email, gender, grade) VALUES (?, ?, ?, ?, ?, ?, normal)';
            //userDB 는 삭제하지 않음 : grade, status(탈퇴disable, 유효 등등)를 넣어라
            //(status +) id에 indexing
            let insertResult = await db.queryParam_Arr(insertQuery, [id, hashedPw.toString('base64'), salt.toString('base64'), name, email, gender]);

            res.status(200).send(util.successTrue(null));
        }
    }
});

module.exports = router;