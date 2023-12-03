"use strict";
const Sequelize = require('sequelize')
const { User, Role } = require("../models");
const NotFound = require("../errors/UserNotFoundError");
const { Op, literal, col } = Sequelize;

const findUser = async (where) => {
  try {
    const user = await User.findOne({
      where: { ...where },
      attributes: [
        "userId",
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
        "refreshToken",
      ],
      include: {
        model: Role,
        as: "roles",
        attributes: ["role"],
      },
    });

    return user.get({ plain: true });
  } catch (error) {
    throw new NotFound("user with this data didn`t exist");
  }
};

module.exports = findUser;
