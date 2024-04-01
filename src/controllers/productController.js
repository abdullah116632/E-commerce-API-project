const createError = require("http-errors");
const mongoose = require("mongoose")
const Product = require("../models/productModel");
const slugify = require("slugify");
const {deleteImage} = require("../helper/deleteImage")
const cloudinary = require("../config/cloudinary");

const { successResponse } = require("./responseController");
const publicIdWithoutExtensionFrmUrl = require("../helper/cloudinaryHelper");


const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity, shipping, category } = req.body;

    const image = req.file;
    

    if (!image) {
      throw createError(400, "Image file is required");
    }
    if (image.size > 1024 * 1024 * 2) {
      throw createError(
        400,
        "Image size is too learge it must be less then 2mb"
      );
    }


    const productExist = await Product.exists({name: name})
    if (productExist) {
      throw createError(
        409,
        "products with this name already exist"
      );
    }

    const productData = {
        name,
        slug: slugify(name),
        description,
        price,
        quantity,
        shipping,
        category
    }

    if(image){
      const response = await cloudinary.uploader.upload(image.path, {folder: "ecommerceProduct"})
      await deleteImage(image.path);
        productData.image = response.secure_url;
    }

    const product = await Product.create(productData)


    return successResponse(res, {
      statusCode: 200,
      message: "product was created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllProducts = async (req, res, next) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;

        const products = await Product.find({}).populate("category").skip((page - 1) * limit).limit(limit).sort({createdAt : -1});

        if(!products){
            throw createError(404, "no products found")
        }

        const count = await Product.find({}).countDocuments()
     
      return successResponse(res, {
        statusCode: 200,
        message: "product fetched successfully",
        payload: { products,
            pagination: {
                totalPage : Math.ceil(count/limit),
                currentPage: page,
                previousPage: page - 1,
                nextPage: page + 1,
                totoalNumberOfProducts: count
            }
         },
      });
    } catch (error) {
      next(error);
    }
};

const handleGetProduct = async (req, res, next) => {
    try {
        const {slug} = req.params;

        const product = await Product.findOne({slug}).populate("category")
     
      return successResponse(res, {
        statusCode: 200,
        message: "product fetched successfully",
        payload: {product},
      });
    } catch (error) {
      next(error);
    }
};

const handleDeleteProduct = async (req, res, next) => {
    try{
      const {slug} = req.params;
    const product = await Product.findOne({slug})
    if(!product){
      throw createError(404, "No product found with this id");
    }

    if(product.image){
      const productId = await publicIdWithoutExtensionFrmUrl(product.image)

      const {result} = await cloudinary.uploader.destroy(`ecommerceProduct/${productId}`)
      if(result !== "ok"){
        throw new Error("product image was not deleted successfully from cloudnary. Please try again")
      }
    }
    const deleteProduct = await Product.findOneAndDelete({slug})

    if(deleteProduct && deleteProduct.image){
      await deleteImage(deleteProduct.image)
    }

    return successResponse(res, {
        statusCode: 200,
        message: "product deleted successfully",
        payload: {}
    })
    }catch(error){
      next(error);
    }
}

const handleupdateProduct = async (req, res, next) => {
  try {
    const {slug} = req.params;
    const {name, description, price, sold, quantity, shipping} = req.body;

    const image = req.file;

    if (image) {
      if (image.size > 1024 * 1024 * 2) {
        throw createError(
          400,
          "Image size is too learge it must be less then 2mb"
        );
      }
    }

    const product = await Product.findOne({slug});

    if (!product) {
      throw createError(404, "user with this id does not exist");
    }
    await deleteImage(product.image)

    product.name = name;
    product.slug = slugify(name);
    product.description = description;
    product.price = price;
    product.sold = sold;
    product.quantity = quantity;
    product.shipping = shipping;
    product.image = image.path;

    await product.save({validateBeforeSave: false});

    return successResponse(res, {
      statusCode: 200,
      message: "user was updated successfully",
      payload: product,
    });
  } catch (error) {
    if(error instanceof mongoose.Error.CastError){
      throw createError(400, "Invalid Id")
    }
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetAllProducts,
  handleGetProduct,
  handleDeleteProduct,
  handleupdateProduct
};