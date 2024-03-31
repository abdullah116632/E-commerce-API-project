const express = require("express");
const upload = require("../middlewares/uploadFile")
const { seedUser, seedProducts } = require("../controllers/seedController");
const seedRouter = express.Router();

seedRouter.get("/users", seedUser);
seedRouter.get("/products", upload.single("image"), seedProducts)

module.exports = seedRouter