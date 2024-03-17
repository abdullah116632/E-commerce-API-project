const {body} = require("express-validator")
// registration validation
const validateUserRegistration = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({min: 3, max: 31})
    .withMessage("Name should be at least 3-31 characters long"),
    body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({min: 6})
    .withMessage("Password should be at least 6 characters long"),
    body("address")
    .trim()
    .notEmpty()
    .withMessage("address is required")
    .isLength({min: 3})
    .withMessage("address should be at least 6 characters long"),
    body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone is required"),
    body("image")
    .optional()
    .isString()
    .withMessage("image should be a string"),
    // body("image")
    // .custom((value, {req}) => {
    //     if(!req.file || !req.file.buffer){
    //         throw new Error("User image is required");
    //     }
    //     return true;
    // })
    // .withMessage("User image is required"),
]

module.exports = {validateUserRegistration};
