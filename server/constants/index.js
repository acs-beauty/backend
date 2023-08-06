"use strict";
const ORDER_STATUS = require("./order");
const PRODUCT_QUANTITY_STATUS = require("./product");

const CONSTANTS = Object.freeze({
  ...ORDER_STATUS,
  ...PRODUCT_QUANTITY_STATUS,
});

module.exports = CONSTANTS;
