"use strict";
const { Router } = require("express");
const controllers = require("../controllers/adminControllers");
const validators = require("../middleware/validators");

const adminRouter = Router();

adminRouter.get("/getAllCategories", controllers.getAllCategories);

adminRouter.post(
  "/addCategory",
  validators.validateCreateCategory,
  controllers.addCategory
);

adminRouter.post(
  "/addSubcategory",
  validators.validateCreateSubcategory,
  controllers.addSubcategory
);

adminRouter.patch(
  "/updateCategory",
  validators.validateUpdateCategory,
  controllers.updateCategory
);

adminRouter.patch(
  "/updateSubcategory",
  validators.validateUpdateSubcategory,
  controllers.updateSubcategory
);

module.exports = adminRouter;
