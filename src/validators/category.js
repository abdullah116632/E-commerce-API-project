const { body } = require("express-validator");
// registration validation
const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("category Name is required")
    .isLength({ min: 3})
    .withMessage("category Name should be at least 3 characters long"),
];

module.exports = {
    validateCategory,
}