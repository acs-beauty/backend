"use strict";
const { Router } = require("express");
const checkToken = require("../middleware/checkToken");
const controllers = require("../controllers/userControllers");

const userRouter = Router();

userRouter.get("/profile", checkToken.checkToken, controllers.getProfile);

module.exports = userRouter;
