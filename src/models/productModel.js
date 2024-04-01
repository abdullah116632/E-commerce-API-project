const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "product name is required"],
        trim: true,
        minlength: [3, "the length of prodect name should be minimum 3 charecter"],
        maxlength: [150, "the length name of product can be mx 150 carecter"]
    },
    slug: {
        type: String,
        required: [true, "category slug is required"],
        lowercase: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        trim: true,
        minlength: [3, "description should be at least 3 charecter long"]
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        trim: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: (props) => {
                return `${props.value} is not a valid price ! price must be grater than 0`
            }
        }
    },
    quantity: {
        type: Number,
        required: [true, "product quantity is required"],
        trim: true,
        validate: {
            validator: function (v) {
                return v > 0;
            },
            message: (props) => {
                return `${props.value} is not a valid quantity ! quantity must be grater than 0`
            }
        }
    },
    sold: {
        type: Number,
        required: [true, "sold is required"],
        trim: true,
        default: 0
    },
    shipping: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    }

}, {timestamps: true});

const Product = model("Product", productSchema);

module.exports = Product;