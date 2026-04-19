const mongoose = require("mongoose")
const conf = require("../conf/conf.json")
//connecting to database 


const userName = conf.db_username;
const password = conf.db_password;
const url = conf.db_url;
let dbURL

if (conf.testMode) {
    dbURL = `mongodb+srv://${userName}:${password}${url}`
}
else {
    dbURL = "mongodb://localhost:27017"
}

mongoose.connect(dbURL)
    .then(() => {
        console.log("connected successfully")
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));


const genericSchema = new mongoose.Schema({}, { strict: false });
const getCollection = async (collectionName) => {
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName];
    }
    return mongoose.model(collectionName, genericSchema, collectionName);
};

exports.getCollection = getCollection