"use strict";
const findByPkCategory = require("../queries/findByPkCategory");
const findByLinkKeyCategory = require("../queries/findByLinkKeyCategory");
const findByLinkKeySubcategory = require("../queries/findByLinkKeySubcategory");
const BadRequestError = require("../errors/BadRequestError");
const ServerError = require("../errors/ServerError");
const { UNKNOWN } = require("../constants");

// module.exports.availabilityCategoriesWhenDelete = async (req, res, next) => {
//   try {
//     const category = await findByPkCategory(req.params.categoryId);

//     if (category.code === 400) {
//       return next(category);
//     }
//     if (category.linkKey === UNKNOWN) {
//       return next(new ServerError("не можна цього робити"));
//     }

//     const subcategoryIds = category.subcategories.length
//       ? category.subcategories.map(({ subcategoryId }) => subcategoryId)
//       : null;

//     // for move subcategories
//     req.subcategoryIds = subcategoryIds;
//     // for delete image
//     req.currentImage = category.imageBannerName;

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.availabilityCategories = async (req, res, next) => {
//   try {
//     if (req.body.categoryId) {
//       const category = await findByPkCategory(req.body.categoryId);

//       if (category.code === 400) {
//         return next(category);
//       }
//       if (category.linkKey === UNKNOWN) {
//         return next(new ServerError("не можна цього робити"));
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports.availabilityLinkKey = async (req, res, next) => {
//   try {
//     if (req.body.linkKey) {
//       if (req.body.linkKey === UNKNOWN) {
//         return next(new ServerError("не можна цього робити"));
//       }
//       const category = await findByLinkKeyCategory(req.body.linkKey, true);
//       const subcategory = await findByLinkKeySubcategory(req.body.linkKey);

//       if (category || subcategory) {
//         return next(new BadRequestError("такий linkKey вже існує"));
//       }
//     }

//     next();
//   } catch (error) {
//     next(error);
//   }
// };
