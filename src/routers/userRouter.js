const express = require("express");
const {getUsers, getUserById, deleteUserById, processRegister, activateAccount, updateUserById, handleBanUserById, handleUnbanUserById, handleUpdatePassword, handleForgetPassword, handleResetPassword} = require("../controllers/userContoller");

const { validateUserRegistration, validateUserPasswordUpdate, validateUserForgetPassword, validateResetPassword } = require("../validators/auth");
const runValidation = require("../validators");
const {isLoggedIn, isLoggedOut, isAdmin} = require("../middlewares/auth");
const { uploadUserImage } = require("../middlewares/uploadFile");
const userRouter = express.Router();



userRouter.post("/register", uploadUserImage.single("image"), isLoggedOut, validateUserRegistration, runValidation, processRegister)
userRouter.post("/userVerify", isLoggedOut, activateAccount)


userRouter.get("/", isLoggedIn, isAdmin, getUsers)
userRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, getUserById)
userRouter.delete("/:id([0-9a-fA-F]{24})", isLoggedIn, deleteUserById)
userRouter.put("/reset-password", validateResetPassword, runValidation, handleResetPassword)
userRouter.put("/:id([0-9a-fA-F]{24})", isLoggedIn, uploadUserImage.single("image"), updateUserById)
userRouter.put("/ban-user/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, handleBanUserById)
userRouter.put("/unban-user/:id([0-9a-fA-F]{24})", isLoggedIn, isAdmin, handleUnbanUserById)
userRouter.put("/update-password/:id([0-9a-fA-F]{24})", isLoggedIn, validateUserPasswordUpdate, runValidation, handleUpdatePassword)
userRouter.post("/forget-password", validateUserForgetPassword, runValidation, handleForgetPassword)



module.exports = userRouter;