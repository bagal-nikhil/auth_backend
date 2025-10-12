const express = require("express");
const router = express.Router()

router.post('/checkExisting', (req, res) => {
    try {
        res.send({
            message: "user is present"
        });
    } catch (error) {
        throw error;
    }
});

router.post('/createUser', (req, res) => {
    try {
        
    } catch (error) {
        throw error;
    }
});

module.exports = router