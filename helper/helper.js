const becrypt = require("bcryptjs")

const hashPassword = async(password, saltingLevel) => {
    try {
        return await becrypt.hash(password, saltingLevel)
    } catch (error) {
        throw error
    }
}

exports.hashPassword = hashPassword