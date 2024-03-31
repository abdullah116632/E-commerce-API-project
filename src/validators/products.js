const { body } = require("express-validator");
// registration validation
const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("product Name is required")
    .isLength({ min: 3, max: 150})
    .withMessage("product Name should be at least 3-150 characters long"),
    body("description")
    .trim()
    .notEmpty()
    .withMessage("description is required")
    .isLength({ min: 3})
    .withMessage("description should be at least 3 characters long"),
    body("price")
    .trim()
    .notEmpty()
    .withMessage("price is required")
    .isFloat({ min: 0})
    .withMessage("price must be positive number"),
    body("category")
    .trim()
    .notEmpty()
    .withMessage("category Name is required"),
    body("quantity")
    .trim()
    .notEmpty()
    .withMessage()
    .isInt({min: 1})
    .withMessage("Quantity must be a positive integer")
];

module.exports = {
    validateProduct,
}