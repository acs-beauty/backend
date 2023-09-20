"use strict";
const findByPkCategory = require("../queries/findByPkCategory");
const { UNKNOWN } = require("../constants");

module.exports.availabilityCheckCategories = async (req, res, next) => {
  try {
    const category = await findByPkCategory(req.params.categoryId);

    if (category.code === 400) {
      res.status(400).send({ ...category });
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
