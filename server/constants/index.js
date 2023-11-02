"use strict";
const ORDER_STATUS = require("./order");
const PRODUCT_QUANTITY_STATUS = require("./product");
const OTHER = require("./other");
const CATEGORY = require("./category");

const CONSTANTS = Object.freeze({
  ...ORDER_STATUS,
  ...PRODUCT_QUANTITY_STATUS,
  ...CATEGORY,
  ...OTHER,
});

module.exports = CONSTANTS;
