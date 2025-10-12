const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const signUp = require("./index")
const helper = require("../../helper/helper")
const conf = require("../../conf/conf.json")

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
        if(!req.body?.email || !req.body?.name || !req.body?.password) {
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