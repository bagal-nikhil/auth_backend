const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const signUp = require("./index")
const helper = require("../../helper/helper")
const conf = require("../../conf/conf.json")
const emailHelper = require("../../communication/emailHelper/emailHelper")
const otp = require("../otp/index")

router.post('/checkExisting', (req, res) => {
    try {
        res.send({
            message: "user is present"
        });
    } catch (error) {
        throw error;
    }
});

router.post('/createUser', async (req, res) => {
    try {
        if (!req.body?.email || !req.body?.name || !req.body?.password) {
            throw new Error("Mandotory fields are missing")
        }
        const params = Object.assign({}, req.body)
        const isPresent = await signUp.checkExistingUser(params.email)
        if (isPresent) {
            return res.status(200).send({
                success: false,
                message: "User present"
            });
        }
        const response = await signUp.sendOtpEmail(params)
        return res.status(200).send({
            success: true,
            data: user,
            token
        });
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message || "Please try again"
        });
    }
});

module.exports = router