"use_strict";
const pick = require("lodash/pick");

const columnForCategory = ["name", "linkKey", "disabled"];
const columnForSubcategory = [...columnForCategory, "categoryId"];

module.exports.bodyHelper = (body) => {
  const bodyCategory = pick(body, columnForCategory);
  const bodySubCategory = pick(body, columnForSubcategory);

  return { bodyCategory, bodySubCategory };
};
