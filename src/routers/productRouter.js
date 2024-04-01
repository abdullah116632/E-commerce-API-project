const express = require("express");



const runValidation = require("../validators");
const {isLoggedIn, isLoggedOut, isAdmin} = require("../middlewares/auth");
const { handleCreateProduct, handleGetAllProducts, handleGetProduct, handleDeleteProduct, handleupdateProduct } = require("../controllers/productController");
const { validateProduct } = require("../validators/products");
const { uploadProductImage, uploadUserImage } = require("../middlewares/uploadFile");
const productRouter = express.Router();



productRouter.post("/", uploadProductImage.single("image"), validateProduct, runValidation, isLoggedIn, isAdmin, handleCreateProduct)

productRouter.get("/", handleGetAllProducts)
productRouter.get("/:slug", handleGetProduct)
productRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteProduct)
productRouter.put("/:slug", isLoggedIn, isAdmin, uploadProductImage.single("image"), handleupdateProduct)


module.exports = productRouter;