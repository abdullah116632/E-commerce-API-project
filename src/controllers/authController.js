const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const {successResponse} = require("./responseController");
const {createJSONWebToken} = require("../helper/jsonwebtoken");



const handleLogin = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email})
        console.log(user);
        if(!user){
            throw createError(404, "User does not exist with this email. Please register first")
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if(!isPasswordMatch){
            throw createError(401, "Wrong password")
        }
        if(user.isBanned){
            throw createError(403, "You are banned please contact authority")
        }
        //create token cookie
        const accessToken = createJSONWebToken({user} ,process.env.JWT_ACCESS_KEY, "15m");
    
        res.cookie("accessToken", accessToken, {maxAge: 15 * 60 * 1000, httpOnly: true, secure: false, sameSite: "none"})

        const userWithoutPassword = await User.findOne({email}).select("-password")
        return successResponse(res, {
            statusCode: 200,
            message: "users loggedin successully",
            payload: {userWithoutPassword}
        })
    }catch(error){
        next(error)
    }
}

const handleLogout = async (req, res, next) => {
    try{
        res.clearCookie("accessToken")

        return successResponse(res, {
            statusCode: 200,
            message: "users logged out successully",
            payload: {}
        })
    }catch(error){
        next(error)
    }
}

module.exports = {handleLogin, handleLogout}