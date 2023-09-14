"use strict";
const findAllCategoryAndSub = require("../queries/findAllCategoryAndSub");
const createCategoryOrSub = require("../queries/createCategoryOrSub");
const updateCategoryOrSub = require("../queries/updateCategoryOrSub");
const deleteCategoryOrSub = require("../queries/deleteCategoryOrSub");
const { bodyHelper } = require("../utils/bodyHelperUpdateCategoryOrSub");

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

    const category = {
      categoryId: newCategory.categoryId,
      imageBannerName: newCategory.imageBannerName,
      subcategories: [],
    };

    res.status(200).send(category);
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
    const newSubcategory = await createCategoryOrSub(body, false);

    const subcategory = {
      subcategoryId: newSubcategory.subcategoryId,
      imageBannerName: newSubcategory.imageBannerName,
    };

    res.status(200).send(subcategory);
  } catch (error) {
    next(error);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  const image = req.body.imageBannerName // поменять, после Мультэра
    ? { imageBannerName: req.body.imageBannerName } // поменять, после Мультэра
    : {};

  const { bodyCategory } = bodyHelper(req.body);

  try {
    const updateCategory = await updateCategoryOrSub(
      req.body.categoryId,
      { ...bodyCategory, ...image },
      true
    );

    if (updateCategory) {
      const response = {
        message: "success",
        category: {
          ...image,
        },
      };
      res.status(200).send(response);
    } else {
      res.send({ message: "failure" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateSubcategory = async (req, res, next) => {
  const image = req.body.imageBannerName // поменять, после Мультэра
    ? { imageBannerName: req.body.imageBannerName } // поменять, после Мультэра
    : {};

  const { bodySubCategory } = bodyHelper(req.body);

  try {
    const updateSubcategory = await updateCategoryOrSub(
      req.body.subcategoryId,
      { ...bodySubCategory, ...image },
      false
    );

    if (updateSubcategory) {
      const response = {
        message: "success",
        subcategory: {
          ...image,
        },
      };
      res.status(200).send(response);
    } else {
      res.send({ message: "failure" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    const isDelete = await deleteCategoryOrSub(req.params.categoryId, true);
    console.log(req.params.categoryId)
    if (isDelete) {
      res.status(200).send({ message: "success" });
    } else {
      res.send({ message: "failure" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSubcategory = async (req, res, next) => {
  try {
    const isDelete = await deleteCategoryOrSub(req.params.subcategoryId, false);
    if (isDelete) {
      res.status(200).send({ message: "success" });
    } else {
      res.send({ message: "failure" });
    }
  } catch (error) {
    next(error);
  }
};
