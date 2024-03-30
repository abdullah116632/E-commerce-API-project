const {Schema, model} = require("mongoose");


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, "category name is required"],
        trim: true,
        unique: true,
        minlength: [3, "the length of category should be minimum 3 charecter"],
    },
    slug: {
        type: String,
        required: [true, "category slug is required"],
        lowercase: true,
        unique: true,
    },

}, {timestamps: true});

const Category = model("Category", categorySchema);

module.exports = Category;