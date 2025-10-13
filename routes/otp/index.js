const sendEmail = require("../../communication/emailHelper/emailHelper")

const sendSignupOtp = async (params) => {
 try {
    const otp =  Math.floor(100000 + Math.random() * 900000).toString();
        const sendEmailOtp = await sendEmail(
            "nikhilbagalofficial@gmail.com",
            "Your email verification otp - Nikhil Bagal",
            "otp",
            { 
                otp: otp,
                name: params.name
            } 
        );
        console.log(`otp response of email is ${sendEmailOtp}`)
 } catch (error) {
    throw error
 }
}
exports.sendSignupOtp = sendSignupOtp