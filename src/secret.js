require("dotenv").config()

const serverPort = process.env.SERVER_PORT || 3002
const mongodbURL = process.env.MONGODB_ATLAS_URL

module.exports = {serverPort, mongodbURL};