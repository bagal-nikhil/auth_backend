const express = require("express");
const router = express.Router()
const signUp = require("./index")

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
        console.log(JSON.stringify(params))
        const isPresent = await signUp.checkExistingUser(params.email)
        console.log(isPresent)
        if (isPresent) {
            return res.status(200).send({
                success: false,
                message: "User present"
            });
        }
        const newUser = await signUp.createUser(params);
        console.log(JSON.stringify(newUser));

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