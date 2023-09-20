"use strict";
const ORDER_STATUS = require("./order");
const PRODUCT_QUANTITY_STATUS = require("./product");
const OTHER = require("./other");

const CONSTANTS = Object.freeze({
  ...ORDER_STATUS,
  ...PRODUCT_QUANTITY_STATUS,
  ...OTHER,
});

module.exports = CONSTANTS;
