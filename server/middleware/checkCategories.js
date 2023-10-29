"use strict";
const findByPkCategory = require("../queries/findByPkCategory");
const findByLinkKeyCategory = require("../queries/findByLinkKeyCategory");
const findByLinkKeySubcategory = require("../queries/findByLinkKeySubcategory");
const { UNKNOWN } = require("../constants");

module.exports.availabilityCategoriesWhenDelete = async (req, res, next) => {
  try {
    const category = await findByPkCategory(req.params.categoryId);

    if (category.code === 400) {
      res.status(400).send(category);
      return;
    }
    if (category.linkKey === UNKNOWN) {
      res.status(400).send({ message: "не можна цього робити" });
      return;
    }

    const subcategoryIds = category?.subcategories.length
      ? category.subcategories.map(({ subcategoryId }) => subcategoryId)
      : null;

    req.subcategoryIds = subcategoryIds;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.availabilityCategories = async (req, res, next) => {
  try {
    if (req.body.categoryId) {
      const category = await findByPkCategory(req.body.categoryId);

      if (category.code === 400) {
        res.status(400).send(category);
        return;
      }
      if (category.linkKey === UNKNOWN) {
        res.status(400).send({ message: "не можна цього робити" });
        return;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports.availabilityLinkKey = async (req, res, next) => {
  try {
    if (req.body.linkKey) {
      if (req.body.linkKey === UNKNOWN) {
        res.status(400).send({ message: "не можна цього робити" });
        return;
      }
      const category = await findByLinkKeyCategory(req.body.linkKey, true);
      const subcategory = await findByLinkKeySubcategory(req.body.linkKey);

      if (category || subcategory) {
        res.status(400).send({ message: "такий linkKey вже існує" });
        return;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
