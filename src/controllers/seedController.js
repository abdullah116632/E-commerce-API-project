const User = require("../models/userModel");
const data = require("../data")


const seedUser = async (req, res, next) => {
    try{
        await User.deleteMany({})

        const users = await User.insertMany(data.users);

        return res.status(201).json(users)
    }catch(error){
        next(error);
    }
}

module.exports = {seedUser};