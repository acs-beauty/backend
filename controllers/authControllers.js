"use strict";
const CONSTANTS = require("../constants");
const findUser = require("../queries/findUser");
const passwordCompare = require("../utils/passwordCompare");
// const NotUniqueEmail = require("../errors/NotUniqueEmail");
const getJwtToken = require("../utils/getJwtToken");
const updateUser = require("../queries/updateUser");
const TokenError = require("../errors/TokenError");

const {
  JWT_SECRET_ACCESS,
  JWT_SECRET_REFRESH,
  ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME,
} = process.env;

module.exports.registration = async (req, res, next) => {
  try {
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      // next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const foundUser = await findUser({ email: req.body.login });
    await passwordCompare(req.body.password, foundUser.password);
    const accessToken = getJwtToken(
      foundUser,
      JWT_SECRET_ACCESS,
      +ACCESS_TOKEN_TIME
    );
    const refreshToken = getJwtToken(
      foundUser,
      JWT_SECRET_REFRESH,
      REFRESH_TOKEN_TIME
    );
    await updateUser({ refreshToken }, foundUser.userId);
    res.send({
      tokensPair: { accessToken, refreshToken },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.refreshToken = async (req, res, next) => {
  try {
    const foundUser = await findUser({ userId: req.refreshTokenData.userId });
    if (foundUser.refreshToken === req.body.refreshToken) {
      const accessToken = getJwtToken(
        foundUser,
        JWT_SECRET_ACCESS,
        +ACCESS_TOKEN_TIME
      );
      const refreshToken = getJwtToken(
        foundUser,
        JWT_SECRET_REFRESH,
        REFRESH_TOKEN_TIME
      );
      await updateUser({ refreshToken }, foundUser.userId);
      res.send({
        tokensPair: { accessToken, refreshToken },
      });
    } else {
      next(new TokenError());
    }
  } catch (error) {
    next(error);
  }
};
