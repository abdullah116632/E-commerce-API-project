const express = require("express");

const { seedUser, seedProducts } = require("../controllers/seedController");
const { uploadProductImage } = require("../middlewares/uploadFile");
const seedRouter = express.Router();

seedRouter.get("/users", seedUser);
seedRouter.get("/products", uploadProductImage.single("image"), seedProducts)

module.exports = seedRouter