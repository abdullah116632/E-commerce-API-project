const slugify = require("slugify");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Category = require("../models/categoryModel");

const handleCreateCategory = async (req, res, next) => {
    try{
        const {name} = req.body;
        const newCategory = await Category.create({
            name: name,
            slug: slugify(name)
        })


         return successResponse(res, {
            statusCode: 201,
            message: `Category was created successfully`,
            payload: newCategory
        })
    }catch(error){
        next(error)
    }
}

const handleGetCategories =  async (req, res, next) => {
    try{
        const categories = await Category.find({}).select("name slug").lean()

        if(!categories){
            throw createError(404, "Catagory is not found")
        }

        return successResponse(res, {
            statusCode: 200,
            message: "categories was created successfully",
            payload: categories
        })
    }catch(error){
        next(error)
    }
}

const handleGetCategory = async (req, res, next) => {
    try{
        const category = await Category.find({slug: req.params.slug}).select("name slug").lean()

        if(!category){
            throw createError(404, "Catagory is not found")
        }

        return successResponse(res, {
            statusCode: 200,
            message: "category fetched successfully",
            payload: category
        })
    }catch(error){
        next(error)
    }
}

const handleUpdateCategory = async (req, res, next) => {
    try{
        const {name} = req.body;
        const updateCategory = await Category.findOneAndUpdate({slug: req.params.slug}, {$set: {name: name, slug: slugify(name)}}, {new: true})

        if(!updateCategory){
            throw createError(404, "Catagory is not found")
        }

        return successResponse(res, {
            statusCode: 200,
            message: "category was updated successfully",
            payload: updateCategory
        })
    }catch(error){
        next(error)
    }
}

const handleDeleteCategoy = async (req, res, next) => {
    try{
        const result = await Category.findOneAndDelete({slug: req.params.slug})

        if(!result){
            throw createError(404, "No category found with this slug")
        }

        return successResponse(res, {
            statusCode: 200,
            message: "category deleted successfully"
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    handleCreateCategory,
    handleGetCategories,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategoy
}