"use_strict";
const pick = require("lodash/pick");

const columnForProducts = ["novelty", "hit"];
const columnForBrand = ["brandId"];
const columnForCategory = ["categoryId"];
const columnForSubcategory = ["subcategoryId"];

module.exports.validSortFields = ["titleName", "price", "createdAt"];

const checkBoolean = (bool) => bool === "true" || bool === "false";

module.exports.whereHelper = (query) => {
  const whereProducts = pick(query, columnForProducts);
  const whereBrand = pick(query, columnForBrand);
  const whereCategory = pick(query, columnForCategory);
  const whereSubcategory = pick(query, columnForSubcategory);

  if (whereProducts.novelty && checkBoolean(whereProducts.novelty)) {
    whereProducts.novelty = JSON.parse(whereProducts.novelty);
  }
  if (whereProducts.hit && checkBoolean(whereProducts.hit)) {
    whereProducts.hit = JSON.parse(whereProducts.hit);
  }

  return { whereProducts, whereBrand, whereCategory, whereSubcategory };
};
