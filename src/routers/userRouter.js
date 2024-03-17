const express = require("express");
const {getUsers, getUserById, deleteUserById, processRegister, activateAccount, updateUserById} = require("../controllers/userContoller");
const upload = require("../middlewares/uploadFile");
const { validateUserRegistration } = require("../validators/auth");
const runValidation = require("../validators");
const {isLoggedIn, isLoggedOut} = require("../middlewares/auth")
const userRouter = express.Router();



userRouter.post("/register", upload.single("image"), isLoggedOut, validateUserRegistration, runValidation, processRegister)
userRouter.post("/userVerify", isLoggedOut, activateAccount)


userRouter.get("/", isLoggedIn, getUsers)
userRouter.get("/:id", isLoggedIn, getUserById)
userRouter.delete("/:id", isLoggedIn, deleteUserById)
userRouter.put("/:id", isLoggedIn, upload.single("image"), updateUserById)


module.exports = userRouter;