const mongoose = require("mongoose");
// const { mongodbURL } = require("../secret");

const connectDatabase = async (options = {}) => {
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS_URL)
        console.log("connnection to db is successfull")

        mongoose.connection.on("error", (error) => {
            console.error("DB connection error", error)
        })
    }catch(err){
        console.error("Could not connect to DB : ", err.toString())
    }
}

module.exports = connectDatabase;