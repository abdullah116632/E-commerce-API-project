require("dotenv").config()

const serverPort = process.env.SERVER_PORT || 3002
const mongodbURL = process.env.MONGODB_ATLAS_URL
const defaultEmagePath = process.env.DEFAULT_USER_IMAGE_PATH || "public/images/users/default.png"

module.exports = {serverPort, mongodbURL, defaultEmagePath};