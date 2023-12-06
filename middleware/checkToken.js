"use strict";
const jwt = require("jsonwebtoken");
const CONSTANTS = require("../constants");
const TokenError = require("../errors/TokenError");

const { JWT_SECRET_ACCESS, JWT_SECRET_REFRESH } = process.env;

module.exports.checkToken = async (req, res, next) => {
  try {
    // console.log("token =========================")
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) {
      return next(new TokenError("need token"));
    }
    req.tokenData = jwt.verify(accessToken, JWT_SECRET_ACCESS);
    next();
  } catch (error) {
    // console.log('token 111111111111111111111')

    next(new TokenError());
  }
};

module.exports.checkRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return next(new TokenError("need refresh token"));
    }
    req.refreshTokenData = jwt.verify(refreshToken, JWT_SECRET_REFRESH);
    next();
  } catch (error) {
    next(new TokenError());
  }
};
