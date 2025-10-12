const becrypt = require("bcryptjs")

const hashPassword = async(password, saltingLevel) => {
    try {
        return await becrypt.hash(password, saltingLevel)
    } catch (error) {
        throw error
    }
}

exports.hashPassword = hashPassword

const generateOTP = async() => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.generateOTP = generateOTP 