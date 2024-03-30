const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../helper/jsonwebtoken");

const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(
        404,
        "User does not exist with this email. Please register first"
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError(401, "Wrong password");
    }
    if (user.isBanned) {
      throw createError(403, "You are banned please contact authority");
    }
    //create token cookie
    const accessToken = createJSONWebToken(
      { user },
      process.env.JWT_ACCESS_KEY,
      "15m"
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    const refreshToken = createJSONWebToken(
      { user },
      process.env.JWT_ACCESS_KEY,
      "7d"
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      hattpOnly: true,
      secure: false,
      sameSite: "none",
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password
    
    return successResponse(res, {
      statusCode: 200,
      message: "users loggedin successully",
      payload: { userWithoutPassword },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken")

    return successResponse(res, {
      statusCode: 200,
      message: "users logged out successully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const oldRefreshToken = req.cookies.refreshToken;

    const decodedToken = jwt.verify(
      oldRefreshToken,
      process.env.JWT_ACCESS_KEY
    );
    if (!decodedToken) {
      throw createError(401, "invalid refresh token, please log in again");
    }

    const accessToken = createJSONWebToken(
      decodedToken.user,
      process.env.JWT_ACCESS_KEY,
      "15m"
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });
    return successResponse(res, {
      statusCode: 200,
      message: "new access token is generated",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

const handleProtectedRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    const decodedToken = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    if (!decodedToken) {
      throw createError(401, "invalid access token, please log in again");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "protected resources access successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtectedRoute,
};
