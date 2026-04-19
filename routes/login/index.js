const dbHelper = require("../../database/index")

const checkUserPresent = async (email) => {
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

exports.checkUserPresent = checkUserPresent