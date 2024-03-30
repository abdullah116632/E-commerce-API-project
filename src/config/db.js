const mongoose = require("mongoose");
const logger = require("../controllers/loggerController")
// const { mongodbURL } = require("../secret");

const connectDatabase = async (options = {}) => {
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS_URL)
        logger.log("info", "connnection to db is successfull")

        mongoose.connection.on("error", (error) => {
            logger.log("error", "DB connection error", error)
        })
    }catch(err){
       logger.log("error", "Could not connect to DB : ", err.toString())
    }
}

module.exports = connectDatabase;