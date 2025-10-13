const dbHelper = require("../../database/index")
const helper =  require("../../helper/helper")
const sendOtp = require("../otp/index")
const signUp = require("./index")
const jwt = require("jsonwebtoken")
const conf = require("../../conf/conf.json")

const createUser = async (params) => {
    try {
        const collname = await dbHelper.getCollection("users")
        const result = await collname.findOneAndUpdate(
            params,
            { $set: params }, 
            {
                new: true,
                upsert: true,
            }
        );
        return result 
        console.log(JSON.stringify(result))
    } catch (error) {
        throw error
    }
}

const checkExistingUser = async (email) => {
    try {
        const collname = await dbHelper.getCollection("users")
        const result = await collname.findOne({
            email
        });
        return result; 
    } catch (error) {
        throw error
    }
}

const sendOtpEmail = async (params) => {
    try {
        const hashedPassword = await helper.hashPassword(params?.password, 10);
        params.password = hashedPassword;
        const user = await signUp.createUser(params);
        const token = jwt.sign({ id: user._id }, conf.jwt_secret, { expiresIn: "1d" });
        console.log(`params ${JSON.stringify(params.name)}`)
        const generatedOtp = await sendOtp.sendSignupOtp({
            email: params?.email,
            name: params?.name
        })
    } catch (error) {
        throw error
    }
}
exports.createUser = createUser
exports.checkExistingUser = checkExistingUser
exports.sendOtpEmail = sendOtpEmail