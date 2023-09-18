"use strict";
const findAllCategoryAndSub = require("../queries/findAllCategoryAndSub");
const createCategoryOrSub = require("../queries/createCategoryOrSub");
const updateCategoryOrSub = require("../queries/updateCategoryOrSub");
const deleteCategoryOrSub = require("../queries/deleteCategoryOrSub");
const findByLinkKeyCategory = require("../queries/findByLinkKeyCategory");
const { bodyHelper } = require("../utils/bodyHelperUpdateCategoryOrSub");
const { SUCCESS, FAILURE, UNKNOWN } = require("../constants");

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
  const image = req.file ? { imageBannerName: req.file.filename } : {};

  const body = {
    name: req.body.name,
    linkKey: req.body.linkKey,
    disabled: req.body.disabled !== undefined ? req.body.disabled : true,
    ...image,
  };

  try {
    const newCategory = await createCategoryOrSub(body, true);

    if (newCategory) {
      const category = {
        categoryId: newCategory.categoryId,
        imageBannerName: newCategory.imageBannerName,
        subcategories: [],
      };

      res.status(200).send({ message: SUCCESS, category });
    } else {
      res.send({ message: FAILURE });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.addSubcategory = async (req, res, next) => {
  const image = req.file ? { imageBannerName: req.file.filename } : {};

  const body = {
    categoryId: req.body.categoryId,
    name: req.body.name,
    linkKey: req.body.linkKey,
    disabled: req.body.disabled !== undefined ? req.body.disabled : true,
    ...image,
  };

  try {
    const newSubcategory = await createCategoryOrSub(body, false);

    if (newSubcategory) {
      const subcategory = {
        subcategoryId: newSubcategory.subcategoryId,
        imageBannerName: newSubcategory.imageBannerName,
      };

      res.status(200).send({ message: SUCCESS, subcategory });
    } else {
      res.send({ message: FAILURE });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateCategory = async (req, res, next) => {
  const image = req.file ? { imageBannerName: req.file.filename } : {};

  const { bodyCategory } = bodyHelper(req.body);

  try {
    const updateCategory = await updateCategoryOrSub(
      req.body.categoryId,
      { ...bodyCategory, ...image },
      true
    );

    if (updateCategory) {
      const response = {
        message: SUCCESS,
        category: {
          ...image,
        },
      };
      res.status(200).send(response);
    } else {
      res.send({ message: FAILURE });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateSubcategory = async (req, res, next) => {
  const image = req.file ? { imageBannerName: req.file.filename } : {};

  const { bodySubCategory } = bodyHelper(req.body);

  try {
    const updateSubcategory = await updateCategoryOrSub(
      req.body.subcategoryId,
      { ...bodySubCategory, ...image },
      false
    );

    if (updateSubcategory) {
      const response = {
        message: SUCCESS,
        subcategory: {
          ...image,
        },
      };
      res.status(200).send(response);
    } else {
      res.send({ message: FAILURE });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteCategory = async (req, res, next) => {
  try {
    if (req.subcategoryIds) {
      const unknownCategory = await findByLinkKeyCategory(UNKNOWN, true);
      await updateCategoryOrSub(
        req.subcategoryIds,
        {
          categoryId: unknownCategory.categoryId,
        },
        false
      );
    }
    const isDelete = await deleteCategoryOrSub(req.params.categoryId, true);
    if (isDelete) {
      res.status(200).send({ message: SUCCESS });
    } else {
      res.send({ message: FAILURE });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteSubcategory = async (req, res, next) => {
  try {
    const isDelete = await deleteCategoryOrSub(req.params.subcategoryId, false);
    if (isDelete) {
      res.status(200).send({ message: SUCCESS });
    } else {
      res.send({ message: FAILURE });
    }
  } catch (error) {
    next(error);
  }
};
