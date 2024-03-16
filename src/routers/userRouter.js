const express = require("express");
const {getUsers, getUserById, deleteUserById, processRegister, activateAccount} = require("../controllers/userContoller");
const upload = require("../middlewares/uploadFile");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const userRouter = express.Router();



userRouter.post("/register", upload.single("image"), validateUserRegistration, runValidation, processRegister)
userRouter.post("/userVerify", activateAccount)


userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUserById)

module.exports = userRouter;