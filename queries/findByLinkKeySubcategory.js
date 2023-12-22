'use strict'
const { sequelize } = require('../models')

// const query = `
//   SELECT
//     "Subcategory"."subcategoryId",
//     "Subcategory"."name",
//     "Subcategory"."linkKey",
//     "Subcategory"."imageBannerName",
//     "Category"."categoryId",
//     "Category"."name" AS "categoryName",
//     "Category"."linkKey" AS "categoryLinkKey",
//     MIN(LEAST("products"."price", "products"."discountPrice")) AS "minPrice",
//     MAX(GREATEST("products"."price", "products"."discountPrice")) AS "maxPrice"
//   FROM
//     "Subcategories" AS "Subcategory"
//   LEFT JOIN
//     "Products" AS "products"
//   ON
//     "products"."subcategoryId" = "Subcategory"."subcategoryId"
//   LEFT JOIN
//     "Categories" AS "Category"
//   ON
//     "Category"."categoryId" = "Subcategory"."categoryId"
//   WHERE
//     "Subcategory"."linkKey" = :linkKey
//   GROUP BY
//     "Subcategory"."subcategoryId", "Category"."categoryId"
// `

// const findByLinkKeySubcategory = async linkKey => {
//   try {
//     const [subcategory] = await sequelize.query(query, {
//       type: sequelize.QueryTypes.SELECT,
//       replacements: {
//         linkKey,
//       },
//     })

//     return subcategory
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// module.exports = findByLinkKeySubcategory
