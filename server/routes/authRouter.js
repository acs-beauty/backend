"use strict";
const { Router } = require("express");
const controllers = require("../controllers/authControllers");
const validators = require("../middleware/validators");
const checkToken = require("../middleware/checkToken");

const authRouter = Router();

// authRouter.post(
//   "/registration",
// );

authRouter.post(
  "/login",
  // validators.validateLogin,
  controllers.login
);

authRouter.post(
  "/refresh",
  checkToken.checkRefreshToken,
  controllers.refreshToken
);

module.exports = authRouter;
