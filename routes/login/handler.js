const express =  require("express")
const router = express.Router()
const login = require("./index")
const becrypt = require("bcryptjs")

router.post("/", async(req, res) => {
    try {
        const params = Object.assign({}, req.body)
        const user = await login.checkUserPresent(params.email)
        console.log(`user is ${JSON.stringify(user)}`)
        const becryptedPassword = await becrypt.compare(params.password, user.password)
        if(becryptedPassword) {
            return res.status(200).send({
                success: true,
                message: "Authorized you can login successfully"
            })
        }
        else{
            return res.status(401).send({
                success: false,
                message: "Please enter a correct password"
            })
        }
    } catch (error) {
        throw error;
    }
})

module.exports = router;