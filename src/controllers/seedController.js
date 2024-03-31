const User = require("../models/userModel");
const data = require("../data");
const Product = require("../models/productModel");


const seedUser = async (req, res, next) => {
    try{
        await User.deleteMany({})

        const users = await User.insertMany(data.users);

        return res.status(201).json(users)
    }catch(error){
        next(error);
    }
}

const seedProducts = async (req, res, next) => {
    try{
        await  Product.deleteMany({})

        const products = await Product.insertMany(data.products);

        return res.status(201).json(products)
    }catch(error){
        next(error);
    }
}

module.exports = {seedUser, seedProducts};