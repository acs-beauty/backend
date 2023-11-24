"use strict";
const CONSTANTS = require("../constants");
const findUser = require("../queries/findUser");

module.exports.getProfile = async (req, res, next) => {
  try {
    const user = await findUser({ userId: req.tokenData.userId });

    const userData = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      roles: user.roles.map(({ role }) => role),
    };

    res.status(200).send(userData);
  } catch (err) {
    next(err);
  }
};
