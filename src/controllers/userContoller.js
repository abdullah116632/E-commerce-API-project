const createError = require("http-errors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { deleteImage } = require("../helper/deleteImage");
const { createJSONWebToken } = require("../helper/jsonwebtoken");
const emailWithNodeMailer = require("../helper/email");

const getUsers = async (req, res, next) => {
  try {
    const serach = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const serchRegExp = new RegExp(".*" + serach + ".*", "i");
    console.log(serchRegExp);
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: serchRegExp } },
        { email: { $regex: serchRegExp } },
        { phone: { $regex: serchRegExp } },
      ],
    };

    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();

    if (!users) {
      throw createError(404, "no users found");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "users was returned",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, id, options);

    return successResponse(res, {
      statusCode: 200,
      message: "user were returned",
      payload: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };

    const user = await findWithId(User, id, options);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    return successResponse(res, {
      statusCode: 200,
      message: "user was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const userExist = await User.exists({ email });
    if (userExist) {
      throw createError(
        409,
        "user with this email already exist please sign in"
      );
    }

    const token = createJSONWebToken(
      { name, email, password, phone, address },
      process.env.JWT_ACTIVATION_KEY,
      "10m"
    );
    //prepaire email
    const emailData = {
      email,
      subject: "Account activation mail",
      html: `
               <h2>Hello ${name} !</h2>
               <p>Please click hare to <a href="${process.env.CLIENT_URL}/api/users/activate/${token}" target="_blank"> activate your account</a></p>
            `,
    };

    // send email
    try {
      await emailWithNodeMailer(emailData);
    } catch (error) {
      next(createError(500, "Failed to dend Varification email"));
      return;
    }

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your email for completing your ${email} registration process`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

const activateAccount = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) throw createError(404, "token not found");

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACTIVATION_KEY);
      if (!decoded) throw createError(401, "user is not verified");

      const userExist = await User.exists({ email: decoded.email });
      if (userExist) {
        throw createError(
          409,
          "user with this email already exist please sign in"
        );
      }

      await User.create(decoded);

      return successResponse(res, {
        statusCode: 201,
        message: `User was registered successfully`,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  activateAccount,
};
