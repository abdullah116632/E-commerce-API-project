const createError = require("http-errors");
const Product = require("../models/productModel");
const slugify = require("slugify");

const { successResponse } = require("./responseController");


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

    const imageBufferString = image.buffer.toString("base64");

    const productExist = await Product.exists({name: name})
    if (productExist) {
      throw createError(
        409,
        "products with this name already exist"
      );
    }

    const product = await Product.create({
        name,
        slug: slugify(name),
        description,
        price,
        quantity,
        shipping,
        image: imageBufferString,
        category
    })


    return successResponse(res, {
      statusCode: 200,
      message: "product was created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
};