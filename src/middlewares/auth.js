const createError = require("http-errors");
const jwt = require("jsonwebtoken");


const isLoggedIn = async (req, res, next) => {
    try{
        const token = req.cookies.accessToken;
        if(!token){
            throw createError(401, "user not logged in");
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)
        if(!decoded){
            throw createError(401, "Invalid access token please login again")
        }

        req.body.userId = decoded._id;

        next()
    }catch(error){
        return next(error);
    }
}

const isLoggedOut = async (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;
        if(accessToken){
            const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
            try{
                if(decoded){
                    throw createError(401, "user is already logged in");
                }
            }catch(error){
                throw error;
            }
        }

        next()
    }catch(error){
        return next(error);
    }
}

module.exports = {isLoggedIn, isLoggedOut}