const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const signUp = require("./index")
const helper = require("../../helper/helper")
const conf = require("../../conf/conf.json")
const emailHelper = require("../../communication/emailHelper/emailHelper")
const otp = require("../otp/index")
const welcomeEmailHelper = require("../../communication/userCommunication")
const groqAiPackage = require("../../ai/packages/groq.package")

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
                message: "User already signed up!"
            });
        };
        const message = `Please give me meaning of this name: ${req.body.name}`;
        const nameResponse = groqAiPackage.groqChat(req.body.email, req.body.name);
        const response = await signUp.sendOtpEmail(params)
        return res.status(200).send({
            success: true,
            data: response,
            message: "Otp has been send successfully!"
        });
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message || "Please try again"
        });
    }
});

router.get("/emailVerify", async(req, res) => {
    try {
        const params = Object.assign({}, req.query);
        console.log(`params are ${JSON.stringify(params)}`)
        const response = await signUp.verifyEmail(params)
        if(response?.code === "1") {
            const sendWelcomeEmail = await welcomeEmailHelper.sendWelcomeEmail(params)
        }
        return res.status(200).send({
            success: true,
            response
        });
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message || "Please try again"
        });
    }
})

module.exports = router