const createError = require("http-errors");
const User = require("../models/userModel");
const { successResponse } = require("./responseController");


const getUsers = async (req, res, next) => {
    try{
        const serach = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 1;

        const serchRegExp = new RegExp(".*" + serach + ".*", "i")
        console.log(serchRegExp);
        const filter = {
            isAdmin: {$ne: true},
            $or: [
                {name: {$regex: serchRegExp}},
                {email: {$regex: serchRegExp}},
                {phone: {$regex: serchRegExp}}
            ]
        }

        const options = {password: 0}

        const users = await User.find(filter, options).limit(limit).skip((page-1)*limit)

        const count = await User.find(filter).countDocuments()

        if(!users){
            throw createError(404, "no users found")
        }
        
        return successResponse(res, {
            statusCode: 200,
            message: "users were returned",
            payload: {
            users,
            pagination: {
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                previousPage: page - 1 > 0 ? page - 1 : null,
                nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null
            }
            }
        })
    }catch(error){
        next(error);
    }
}

module.exports = getUsers;