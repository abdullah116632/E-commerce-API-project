const express = require("express");
const {handleCreateCategory, handleGetCategories, handleGetCategory, handleUpdateCategory, handleDeleteCategoy} = require("../controllers/categoryController")
const runValidation = require("../validators");
const { validateCategory } = require("../validators/category");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");


const categoryRouter = express.Router()

categoryRouter.post("/", validateCategory, runValidation, isLoggedIn, isAdmin, handleCreateCategory)
categoryRouter.get("/", handleGetCategories);
categoryRouter.get("/:slug", handleGetCategory);
categoryRouter.put("/:slug", validateCategory, runValidation, isLoggedIn, isAdmin, handleUpdateCategory);
categoryRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteCategoy)

module.exports = categoryRouter;