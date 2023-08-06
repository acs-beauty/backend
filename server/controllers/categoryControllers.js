"use strict";
const findByLinkKeyCategory = require("../queries/findByLinkKeyCategory");
const findByLinkKeySubcategory = require("../queries/findByLinkKeySubcategory");
const findAllCategoryAndSub = require("../queries/findAllCategoryAndSub");

module.exports.getNavigation = async (req, res, next) => {
  try {
    const categoryAndSub = await findAllCategoryAndSub();

    res.status(200).send(categoryAndSub);
  } catch (error) {
    next(error);
  }
};

module.exports.getCategoryByLinkKey = async (req, res, next) => {
  try {
    const category = await findByLinkKeyCategory(req.params.linkKey);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const rebuild = ({ subcategory, ...other }) => ({
      ...other,
      subcategory: subcategory.map((sub) => ({
        ...sub,
        categoryLinkKey: other.linkKey,
      })),
    });

    res.status(200).send(rebuild(category));
  } catch (error) {
    next(error);
  }
};

module.exports.getSubcategoryByLinkKey = async (req, res, next) => {
  try {
    const subcategory = await findByLinkKeySubcategory(req.params.linkKey);

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found" });
    }

    res.status(200).send(subcategory);
  } catch (error) {
    next(error);
  }
};
