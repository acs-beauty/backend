"use strict";
const { Sequelize, User, Role } = require("../db_schema/models");
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
