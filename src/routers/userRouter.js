const express = require("express");
const getUsers = require("../controllers/userContoller");
const userRouter = express.Router();

userRouter.get("/", getUsers)

module.exports = userRouter;