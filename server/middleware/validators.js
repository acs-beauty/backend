"use strict";
const schemes = require("../validationSchemes/schemes");
const BadRequestError = require("../errors/BadRequestError");

module.exports.validatePreviewProducts = async (req, res, next) => {
  const validationResult = await schemes.queryStringSchema.isValid(req.query);
  if (!validationResult) {
    return next(new BadRequestError("Invalid query"));
  } else {
    next();
  }
};

module.exports.validateProductId = async (req, res, next) => {
  const validationResult = await schemes.productIdSchema.isValid(req.params);
  if (!validationResult) {
    return next(new BadRequestError("Invalid query"));
  } else {
    next();
  }
};

module.exports.validateSearchProducts = async (req, res, next) => {
  const validationResult = await schemes.searchProductsSchema.isValid(
    req.query
  );
  if (!validationResult) {
    return next(new BadRequestError("Invalid query"));
  } else {
    next();
  }
};

module.exports.validateLinkKey = async (req, res, next) => {
  const validationResult = await schemes.linkKeySchema.isValid(req.params);
  if (!validationResult) {
    return next(new BadRequestError("Invalid query"));
  } else {
    next();
  }
};
