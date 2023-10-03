"use strict";
const RightsError = require("../errors/RightsError");
const CONSTANTS = require("../constants");

module.exports.onlyForAdmin = (req, res, next) => {
  if (req.tokenData.roles.includes(CONSTANTS.ADMIN)) {
    next();
  } else {
    return next(new RightsError("only for admin"));
  }
};
