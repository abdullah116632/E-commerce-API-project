const { body } = require("express-validator");
// registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
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
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("address is required")
    .isLength({ min: 3 })
    .withMessage("address should be at least 6 characters long"),
  body("phone").trim().notEmpty().withMessage("phone is required"),
  body("image").optional().isString().withMessage("image should be a string"),
  // body("image")
  // .custom((value, {req}) => {
  //     if(!req.file || !req.file.buffer){
  //         throw new Error("User image is required");
  //     }
  //     return true;
  // })
  // .withMessage("User image is required"),
];

const validateUserLogin = [
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
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
];

const validateUserPasswordUpdate = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("oldPassword")
    .trim()
    .notEmpty()
    .withMessage("old password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("newPassword")
    .trim()
    .notEmpty()
    .withMessage("new password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password did not match");
    }
    return true;
  }),
];

const validateUserForgetPassword = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email address")
    .isEmail()
    .withMessage("Invalid email address"),
];

const validateResetPassword = [
  body("token").trim().notEmpty().withMessage("Token is required."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters long"),
];


module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateUserPasswordUpdate,
  validateUserForgetPassword,
  validateResetPassword,
};
