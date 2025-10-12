const dbHelper = require("../../database/index")
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
        console.log(email)
        const collname = await dbHelper.getCollection("users")
        const result = await collname.findOne({
            email
        });
        console.log(JSON.stringify(result))
        return result; 
    } catch (error) {
        throw error
    }
}

exports.createUser = createUser
exports.checkExistingUser = checkExistingUser