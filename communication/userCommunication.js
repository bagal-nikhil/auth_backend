const sendEmail = require("../communication/emailHelper/emailHelper")
const conf = require("../conf/conf.json")

const sendWelcomeEmail = async(params) => {
try {
    const sendEmailOtp = await sendEmail(
        "nikhilbagal330@gmail.com",
        `Heyy Buddy!!! Welcome to -${conf?.companyName}`,
        "welcome",
        { 
            name: params.name,
            companyName: conf?.companyName
        } 
    );
    console.log(`WelcomeEmail ${JSON.stringify(sendEmailOtp)}`)
} catch (error) {
    throw error
}
}

exports.sendWelcomeEmail = sendWelcomeEmail