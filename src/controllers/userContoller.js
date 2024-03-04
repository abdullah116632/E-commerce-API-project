const createError = require("http-errors");

const getUsers = (req, res) => {
    res.status(200).send({
        message: "api testing is working fine"
    })
}

module.exports = getUsers;