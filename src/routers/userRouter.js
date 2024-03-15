const express = require("express");
const {getUsers, getUserById, deleteUserById, processRegister, activateAccount} = require("../controllers/userContoller");
const upload = require("../middlewares/uploadFile");
const userRouter = express.Router();



userRouter.post("/register", upload.single("image"), processRegister)
userRouter.post("/userVerify", activateAccount)


userRouter.get("/", getUsers)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUserById)

module.exports = userRouter;