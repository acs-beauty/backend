"use strict";
const schemes = require("../validationSchemes/schemes");
const BadRequestError = require("../errors/BadRequestError");

module.exports.validatePreviewProducts = async (req, res, next) => {
  try {
    await schemes.queryStringSchema.isValid(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateProductId = async (req, res, next) => {
  try {
    await schemes.productIdSchema.isValid(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateSearchProducts = async (req, res, next) => {
  try {
    await schemes.searchProductsSchema.isValid(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateLinkKey = async (req, res, next) => {
  try {
    await schemes.linkKeySchema.isValid(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateCreateCategory = async (req, res, next) => {
  try {
    await schemes.bodyNewCategorySchema.isValid(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateCreateSubcategory = async (req, res, next) => {
  try {
    await schemes.bodyNewSubcategorySchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateUpdateCategory = async (req, res, next) => {
  try {
    await schemes.bodyUpdateCategorySchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateUpdateSubcategory = async (req, res, next) => {
  try {
    await schemes.bodyUpdateSubcategorySchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateCategoryId = async (req, res, next) => {
  try {
    await schemes.CategoryIdSchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateSubcategoryId = async (req, res, next) => {
  try {
    await schemes.SubcategoryIdSchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};