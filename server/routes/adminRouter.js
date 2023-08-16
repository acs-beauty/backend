"use strict";
const { Router } = require("express");
const controllers = require("../controllers/adminControllers");

const adminRouter = Router();

adminRouter.get("/getAllCategories", controllers.getAllCategories);

module.exports = adminRouter;