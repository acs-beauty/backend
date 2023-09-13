"use strict";
const { Router } = require("express");
const controllers = require("../controllers/adminControllers");
const validators = require("../middleware/validators");

const adminRouter = Router();

adminRouter.get("/categories", controllers.getAllCategories);

adminRouter.post(
  "/category",
  validators.validateCreateCategory,
  controllers.addCategory
);

adminRouter.post(
  "/subcategory",
  validators.validateCreateSubcategory,
  controllers.addSubcategory
);

adminRouter.patch(
  "/category",
  validators.validateUpdateCategory,
  controllers.updateCategory
);

adminRouter.patch(
  "/subcategory",
  validators.validateUpdateSubcategory,
  controllers.updateSubcategory
);

adminRouter.delete(
  "/category/:categoryId",
  validators.validateCategoryId,
  controllers.deleteCategory
);

adminRouter.delete(
  "/subcategory/:subcategoryId",
  validators.validateSubcategoryId,
  controllers.deleteSubcategory
);

module.exports = adminRouter;
