const express = require("express");
const {handleCreateCategory} = require("../controllers/categoryController")
const runValidation = require("../validators");
const { validateCategory } = require("../validators/category");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");


const categoryRouter = express.Router()

categoryRouter.post("/", validateCategory, runValidation, isLoggedIn, isAdmin, handleCreateCategory)

module.exports = categoryRouter;