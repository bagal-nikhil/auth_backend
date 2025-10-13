const sendEmail = require("../../communication/emailHelper/emailHelper")
const dbHelper = require("../../database/index")
const conf = require("../../conf/conf.json")

const sendSignupOtp = async (params) => {
 try {
    const randomOtp =  Math.floor(100000 + Math.random() * 900000).toString();
    const storeOtp = await dbHelper.getCollection("otps")
    params.otp = randomOtp
    params.retry_count = 0;
    const result = await storeOtp.findOneAndUpdate(
            params,
            { $set: params }, 
            {
            new: true,
            upsert: true,
        }
    );
    const sendEmailOtp = await sendEmail(
        "nikhilbagalofficial@gmail.com",
        `${conf?.companyName} - Your email verification otp`,
        "otp",
        { 
            otp: randomOtp,
            name: params.name
        } 
    );
    console.log(`otp response of email is ${sendEmailOtp}`)
 } catch (error) {
    throw error
 }
}
exports.sendSignupOtp = sendSignupOtp