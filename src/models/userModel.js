const {Schema, model} = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultEmagePath } = require("../secret");


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minlength: [3, "the length of user should be minimum 3 charecter"],
        maxlength: [31, "User name can be maximum 31 characters"]
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v){
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
            },
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "User name is required"],
        minlength: [6, "the length of user should be minimum 3 charecter"],
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    image: {
        type: Buffer,
        contentType: String,
        // required: [true, "user image is required"]
    },
    address: {
        type: String,
        required: [true, "User address is required"],
        minlength: [3, "the length of address should be minimum 3 charecter"],
    },
    phone: {
        type: String,
        required: [true, "User phone is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

const User = model("user", userSchema);

module.exports = User;