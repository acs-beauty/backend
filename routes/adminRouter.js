"use strict";
const { Router } = require("express");
// const controllers = require("../controllers/adminControllers");
// const validators = require("../middleware/validators");
// const fileUpload = require("../utils/fileUpload");
// const checkCategories = require("../middleware/checkCategories");
// const getFileName = require("../middleware/getFileName");

// const adminRouter = Router();

// adminRouter.get("/categories", controllers.getAllCategories);

// adminRouter.post(
//   "/category",
//   fileUpload.uploadImage,
//   validators.validateCreateCategory,
//   checkCategories.availabilityLinkKey,
//   controllers.addCategory
// );

// adminRouter.post(
//   "/subcategory",
//   fileUpload.uploadImage,
//   validators.validateCreateSubcategory,
//   checkCategories.availabilityCategories,
//   checkCategories.availabilityLinkKey,
//   controllers.addSubcategory
// );

// adminRouter.patch(
//   "/category",
//   fileUpload.uploadImage,
//   validators.validateUpdateCategory,
//   checkCategories.availabilityLinkKey,
//   getFileName.getImageBannerName,
//   controllers.updateCategory
// );

// adminRouter.patch(
//   "/subcategory",
//   fileUpload.uploadImage,
//   validators.validateUpdateSubcategory,
//   checkCategories.availabilityCategories,
//   checkCategories.availabilityLinkKey,
//   getFileName.getImageBannerName,
//   controllers.updateSubcategory
// );

// adminRouter.delete(
//   "/category/:categoryId",
//   validators.validateCategoryId,
//   checkCategories.availabilityCategoriesWhenDelete,
//   controllers.deleteCategory
// );

// adminRouter.delete(
//   "/subcategory/:subcategoryId",
//   validators.validateSubcategoryId,
//   controllers.deleteSubcategory
// );

// module.exports = adminRouter;
