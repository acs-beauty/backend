"use strict";
const findByPkCategory = require("../queries/findByPkCategory");
const findByPkSubcategory = require("../queries/findByPkSubcategory");

module.exports.getImageBannerName = async (req, res, next) => {
  try {
    if (!req.file && req.route.methods.patch) {
      return next();
    }

    if (req.route.path === "/category") {
      const category = await findByPkCategory(req.body.categoryId);
      req.currentImage = category?.imageBannerName;
      return next();
    }

    if (req.route.path === "/subcategory") {
      const subcategory = await findByPkSubcategory(req.body.subcategoryId);
      req.currentImage = subcategory?.imageBannerName;
      return next();
    }
  } catch (error) {
    next(error);
  }
};
