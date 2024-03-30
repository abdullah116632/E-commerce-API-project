require("dotenv").config()
const app = require("./app");
const connectDatabase = require("./config/db");
const logger = require("./controllers/loggerController");


const port = process.env.SERVER_PORT


app.listen(port, async () => {
    logger.log("info", `server is running at http://localhost:${port}`);
    await connectDatabase()
})