"use strict";
const yup = require("yup");
const { MAX_PRICE } = require("../constants");
const regex = require("../regex");

module.exports.queryStringSchema = yup.object().shape({
  limit: yup.number().positive(),
  offset: yup.number().min(0),
  brandId: yup.number().positive().integer(),
  subcategoryId: yup.number().positive().integer(),
  categoryId: yup.number().positive().integer(),
  novelty: yup.string().oneOf(["true", "false"]),
  hit: yup.string().oneOf(["true", "false"]),
  minPrice: yup.number().min(0).max(MAX_PRICE - 1),
  maxPrice: yup.number().min(0).max(MAX_PRICE),
  discount: yup.string().oneOf(["true"]),
  sortBy: yup.string().oneOf(["price", "titleName", "createdAt"]),
  direction: yup.string().oneOf(["ASC", "DESC"]),
  productIds: yup
    .string()
    .matches(regex.arrayNumbersString, "Invalid productIds format"),
});

module.exports.productIdSchema = yup.object().shape({
  productId: yup.number().required().positive().integer(),
});

module.exports.searchProductsSchema = yup.object().shape({
  limit: yup.number().positive(),
  offset: yup.number().min(0),
  searchWords: yup
    .string()
    .required()
    .matches(regex.arraySearchProductString, "Invalid searchWords format"),
});

const linkKeyRequired = {
  linkKey: yup
    .string()
    .required()
    .min(3, "Link key must be at least 3 characters")
    .max(64, "Link key can't exceed 64 characters")
    .matches(regex.validateLinkString, "Invalid linkKey format"),
};

module.exports.linkKeySchema = yup.object().shape(linkKeyRequired);

const categoryRequired = {
  name: yup
    .string()
    .required()
    .min(3, "Name must be at least 3 characters")
    .max(64, "Name can't exceed 64 characters")
    .matches(regex.ukraineWordsString, "Invalid ukraine string format"),
  disabled: yup.boolean().required(),
};

module.exports.bodyNewCategorySchema = yup.object().shape({
  ...categoryRequired,
  ...linkKeyRequired,
});

module.exports.bodyNewSubcategorySchema = yup.object().shape({
  categoryId: yup.number().required().positive().integer(),
  ...categoryRequired,
  ...linkKeyRequired,
});

const category = {
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(64, "Name can't exceed 64 characters")
    .matches(regex.ukraineWordsString, "Invalid ukraine string format"),
  disabled: yup.boolean(),
};

const linkKey = {
  linkKey: yup
    .string()
    .min(3, "Link key must be at least 3 characters")
    .max(64, "Link key can't exceed 64 characters")
    .matches(regex.validateLinkString, "Invalid linkKey format"),
};

module.exports.bodyUpdateCategorySchema = yup.object().shape({
  categoryId: yup.number().required().positive().integer(),
  ...category,
  ...linkKey,
});

module.exports.bodyUpdateSubcategorySchema = yup.object().shape({
  subcategoryId: yup.number().required().positive().integer(),
  categoryId: yup.number().positive().integer(),
  ...category,
  ...linkKey,
});
