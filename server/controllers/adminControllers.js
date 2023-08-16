"use strict";
const findAllCategoryAndSub = require("../queries/findAllCategoryAndSub");

module.exports.getAllCategories = async (req, res, next) => {
  const isAdmin = true;
  try {
    const categoryAndSub = await findAllCategoryAndSub(isAdmin);

    res.status(200).send(categoryAndSub);
  } catch (error) {
    next(error);
  }
};
