"use strict";
const { ParameterName } = require("../db_schema/models");

const findAllParameterNames = async () => {
  try {
    const allParameterName = await ParameterName.findAll({
      attributes: ["nameKey", "value"],
      raw: true,
    });
    return allParameterName;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = findAllParameterNames;