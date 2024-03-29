'use strict'
const findAllCategoryAndSub = require('../queries/findAllCategoryAndSub')
const createCategoryOrSub = require('../queries/createCategoryOrSub')
const updateCategoryOrSub = require('../queries/updateCategoryOrSub')
const deleteCategoryOrSub = require('../queries/deleteCategoryOrSub')
const findByLinkKeyCategory = require('../queries/findByLinkKeyCategory')
const { bodyHelper } = require('../utils/bodyHelperUpdateCategoryOrSub')
const deleteFile = require('../utils/deleteFile')
const BadRequestError = require('../errors/BadRequestError')
const { SUCCESS, FAILURE, UNKNOWN, IMAGE_BANNER_NAME } = require('../constants')
const { sequelize } = require('../models')

// module.exports.getAllCategories = async (req, res, next) => {
//   const isAdmin = true
//   try {
//     const categoryAndSub = await findAllCategoryAndSub(isAdmin)

//     res.status(200).send(categoryAndSub)
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.addCategory = async (req, res, next) => {
//   const image = req.file ? { imageBannerName: req.file.filename } : {}

//   const body = {
//     name: req.body.name,
//     linkKey: req.body.linkKey,
//     disabled: req.body.disabled !== undefined ? req.body.disabled : true,
//     ...image,
//   }

//   try {
//     const newCategory = await createCategoryOrSub(body, true)

//     if (newCategory) {
//       const category = {
//         categoryId: newCategory.categoryId,
//         imageBannerName: newCategory.imageBannerName,
//         subcategories: [],
//       }

//       res.status(200).send({ message: SUCCESS, category })
//     } else {
//       return next(new BadRequestError(FAILURE))
//     }
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.addSubcategory = async (req, res, next) => {
//   const image = req.file ? { imageBannerName: req.file.filename } : {}

//   const body = {
//     categoryId: req.body.categoryId,
//     name: req.body.name,
//     linkKey: req.body.linkKey,
//     disabled: req.body.disabled !== undefined ? req.body.disabled : true,
//     ...image,
//   }

//   try {
//     const newSubcategory = await createCategoryOrSub(body, false)

//     if (newSubcategory) {
//       const subcategory = {
//         subcategoryId: newSubcategory.subcategoryId,
//         imageBannerName: newSubcategory.imageBannerName,
//       }

//       res.status(200).send({ message: SUCCESS, subcategory })
//     } else {
//       return next(new BadRequestError(FAILURE))
//     }
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.updateCategory = async (req, res, next) => {
//   const image = req.file ? { imageBannerName: req.file.filename } : {}

//   const { bodyCategory } = bodyHelper(req.body)

//   try {
//     const updateCategory = await updateCategoryOrSub(req.body.categoryId, { ...bodyCategory, ...image }, true)

//     if (updateCategory) {
//       if (req.currentImage && req.currentImage !== IMAGE_BANNER_NAME) {
//         await deleteFile(req.currentImage)
//       }
//       const response = {
//         message: SUCCESS,
//         category: {
//           ...image,
//         },
//       }
//       res.status(200).send(response)
//     } else {
//       return next(new BadRequestError(FAILURE))
//     }
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.updateSubcategory = async (req, res, next) => {
//   const image = req.file ? { imageBannerName: req.file.filename } : {}

//   const { bodySubCategory } = bodyHelper(req.body)

//   try {
//     const updateSubcategory = await updateCategoryOrSub(req.body.subcategoryId, { ...bodySubCategory, ...image }, false)

//     if (updateSubcategory) {
//       if (req.currentImage && req.currentImage !== IMAGE_BANNER_NAME) {
//         await deleteFile(req.currentImage)
//       }
//       const response = {
//         message: SUCCESS,
//         subcategory: {
//           ...image,
//         },
//       }
//       res.status(200).send(response)
//     } else {
//       return next(new BadRequestError(FAILURE))
//     }
//   } catch (error) {
//     next(error)
//   }
// }

// module.exports.deleteCategory = async (req, res, next) => {
//   const transaction = await sequelize.transaction()

//   try {
//     if (req.subcategoryIds) {
//       const unknownCategory = await findByLinkKeyCategory(UNKNOWN, true)
//       await updateCategoryOrSub(
//         req.subcategoryIds,
//         {
//           categoryId: unknownCategory.categoryId,
//         },
//         false,
//         transaction
//       )
//     }

//     const isDelete = await deleteCategoryOrSub(req.params.categoryId, true, transaction)

//     if (isDelete) {
//       await transaction.commit()
//       if (req.currentImage && req.currentImage !== IMAGE_BANNER_NAME) {
//         await deleteFile(req.currentImage)
//       }
//       res.status(200).send({ message: SUCCESS })
//     } else {
//       await transaction.rollback()
//       return next(new BadRequestError(FAILURE))
//     }
//   } catch (error) {
//     await transaction.rollback()
//     next(error)
//   }
// }

// module.exports.deleteSubcategory = async (req, res, next) => {
//   try {
//     const isDelete = await deleteCategoryOrSub(req.params.subcategoryId, false)
//     if (isDelete) {
//       res.status(200).send({ message: SUCCESS })
//     } else {
//       return next(new BadRequestError(FAILURE))
//     }
//   } catch (error) {
//     next(error)
//   }
// }
