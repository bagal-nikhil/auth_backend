const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const signUp = require("./index")
const helper = require("../../helper/helper")
const conf = require("../../conf/conf.json")
const emailHelper = require("../../communication/emailHelper/emailHelper")

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
        const hashedPassword = await helper.hashPassword(params?.password, 10);
        params.password = hashedPassword;
        console.log(`params ${JSON.stringify(params)}`)
        const user = await signUp.createUser(params);
        const token = jwt.sign({ id: user._id }, conf.jwt_secret, { expiresIn: "1d" });
        const otp = await helper.generateOTP()
        const htmlContent = `
  <div style="font-family: Arial, sans-serif; text-align: center;">
    <h2>Welcome to MyApp!</h2>
    <p>Use the OTP below to verify your email address:</p>
    <h1 style="color: #4CAF50;">${otp}</h1>
    <p>This OTP is valid for 10 minutes.</p>
    <p>Or copy the OTP into your app.</p>
  </div>
`;
        const sendEmailOtp = await emailHelper(
            user,
            "Otp - AmarNikhil Project Test Email",
             htmlContent
        );
        console.log(`response of sendEmailOtp ${JSON.stringify(sendEmailOtp)}`)
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