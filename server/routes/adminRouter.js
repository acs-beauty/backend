"use strict";
const { Router } = require("express");
const controllers = require("../controllers/adminControllers");
const validators = require("../middleware/validators");
const fileUpload = require("../utils/fileUpload");

const adminRouter = Router();

adminRouter.get("/categories", controllers.getAllCategories);

adminRouter.post(
  "/category",
  fileUpload.uploadImage,
  validators.validateCreateCategory,
  controllers.addCategory
);

adminRouter.post(
  "/subcategory",
  fileUpload.uploadImage,
  validators.validateCreateSubcategory,
  controllers.addSubcategory
);

adminRouter.patch(
  "/category",
  fileUpload.uploadImage,
  validators.validateUpdateCategory,
  controllers.updateCategory
);

adminRouter.patch(
  "/subcategory",
  fileUpload.uploadImage,
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
