"use strict";
const schemes = require("../validationSchemes/schemes");
const BadRequestError = require("../errors/BadRequestError");

module.exports.validatePreviewProducts = async (req, res, next) => {
  try {
    await schemes.queryStringSchema.validate(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateProductId = async (req, res, next) => {
  try {
    await schemes.productIdSchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateSearchProducts = async (req, res, next) => {
  try {
    await schemes.searchProductsSchema.validate(req.query, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateLinkKey = async (req, res, next) => {
  try {
    await schemes.linkKeySchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateCreateCategory = async (req, res, next) => {
  try {
    await schemes.bodyNewCategorySchema.validate(req.body, {
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
    await schemes.categoryIdSchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateSubcategoryId = async (req, res, next) => {
  try {
    await schemes.subcategoryIdSchema.validate(req.params, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};

module.exports.validateAuthorization = async (req, res, next) => {
  try {
    await schemes.authSchema.validate(req.body, {
      abortEarly: false,
    });
    next();
  } catch (error) {
    return next(new BadRequestError(error.errors));
  }
};
