"use strict";
const jwt = require("jsonwebtoken");

const getJwtToken = (userData, secret, expiresIn) => {
  const token = jwt.sign(
    {
      userId: userData.userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      roles: userData.roles.map(({ role }) => role),
      email: userData.email,
    },
    secret,
    { expiresIn }
  );
  return token;
};

module.exports = getJwtToken;
