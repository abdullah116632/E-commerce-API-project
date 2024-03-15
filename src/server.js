require("dotenv").config()
const app = require("./app");
const connectDatabase = require("./config/db");


const port = process.env.SERVER_PORT


app.listen(port, async () => {
    console.log(`server is running at http://localhost:${port}`);
    await connectDatabase()
})