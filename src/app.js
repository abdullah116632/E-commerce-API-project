const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");   // it helps to sanetize request data
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");



const app = express()

const rateLimiter = rateLimit({   /* this package is use for set limit of request , 
                                    hare using this middleware we can sent only 5 request 
                                    in one minute at particuler api endpoint where we use this middleware */
    windowMs: 1*60*1000, // 1 minute,
    max: 5,
    message: "too many request from this IP, please try later"
})


app.use(rateLimiter)
app.use(xssClean());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded());


app.use("/api/users", userRouter);

//client error handaling 
app.use((req, res, next) => {
      // first argument is status conde , second argument is error message.
    next(createError(404, "route not found"));
})

// server error handaling -- all the error will come hare that not handled previous
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({
        success: false,
        message: err.message
    })
})

module.exports = app;