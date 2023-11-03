"use strict";
const findAllPreviewProducts = require("../queries/findAllPreviewProducts");
const findByPkProduct = require("../queries/findByPkProduct");
const findAllSearchProduct = require("../queries/findAllSearchProduct");
const findAllProductIds = require("../queries/findAllProductIds");
const findAllParameterNames = require("../queries/findAllParameterNames");

module.exports.getPreviewProducts = async (req, res, next) => {
  const { whereColumn, minPrice, maxPrice, limit, offset, sorting } =
    req.queryData;

  try {
    const [totalProducts, products] = await findAllPreviewProducts({
      ...whereColumn,
      minPrice,
      maxPrice,
      limit,
      offset,
      sorting,
    });

    res.send({ totalProducts, products });
  } catch (error) {
    next(error);
  }
};

module.exports.getProductId = async (req, res, next) => {
  try {
    const product = await findByPkProduct(req.params.productId);
    product.images = product.images.map((el) => el.imageName);

    const allParameterName = await findAllParameterNames();

    const rebuildParameters = allParameterName
      .map((item) => {
        const value = product.parameter[item.nameKey];
        return value !== null
          ? { title: item.value || "", value: value || "" }
          : null;
      })
      .filter((item) => item !== null);

    res.send({ ...product, parameter: rebuildParameters });
  } catch (error) {
    next(error);
  }
};

module.exports.searchProducts = async (req, res, next) => {
  const limit = req.query.limit || 8;
  const offset = req.query.offset || 0;
  try {
    const searchWords = req.query.searchWords.split(",") || [];

    const [totalProducts, products] = await findAllSearchProduct(
      searchWords,
      limit,
      offset
    );

    res.send({ totalProducts, products });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProductIds = async (req, res, next) => {
  try {
    const allProductIds = await findAllProductIds();

    res.send(allProductIds);
  } catch (error) {
    next(error);
  }
};
