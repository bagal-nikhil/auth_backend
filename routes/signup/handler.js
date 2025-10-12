const express = require("express");
const router = express.Router()
const signUp = require("./index")
const helper = require("../../helper/helper")

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
        const newUser = await signUp.createUser(params);
        return res.status(200).send({
            success: true,
            data: newUser
        });
    } catch (error) {
        return res.status(401).send({
            success: false,
            message: error.message || "Please try again"
        });
    }
});

module.exports = router