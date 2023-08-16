"use strict";
const findAllCategoryAndSub = require("../queries/findAllCategoryAndSub");
const createCategoryOrSub = require("../queries/createCategoryOrSub");

module.exports.getAllCategories = async (req, res, next) => {
  const isAdmin = true;
  try {
    const categoryAndSub = await findAllCategoryAndSub(isAdmin);

    res.status(200).send(categoryAndSub);
  } catch (error) {
    next(error);
  }
};

module.exports.addCategory = async (req, res, next) => {
  const image = req.body.imageBannerName // поменять, после Мультэра
    ? { imageBannerName: req.body.imageBannerName } // поменять, после Мультэра
    : {};

  const body = {
    name: req.body.name,
    linkKey: req.body.linkKey,
    disabled: req.body.disabled !== undefined ? req.body.disabled : true,
    ...image,
  };

  try {
    const newCategory = await createCategoryOrSub(body, true);

    res.status(200).send(newCategory);
  } catch (error) {
    next(error);
  }
};

module.exports.addSubcategory = async (req, res, next) => {
  const image = req.body.imageBannerName // поменять, после Мультэра
    ? { imageBannerName: req.body.imageBannerName } // поменять, после Мультэра
    : {};

  const body = {
    categoryId: req.body.categoryId,
    name: req.body.name,
    linkKey: req.body.linkKey,
    disabled: req.body.disabled !== undefined ? req.body.disabled : true,
    ...image,
  };

  try {
    const newCategory = await createCategoryOrSub(body, false);

    res.status(200).send(newCategory);
  } catch (error) {
    next(error);
  }
};
