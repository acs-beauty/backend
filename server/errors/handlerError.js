"use strict";

const handlerError = (err, req, res, next) => {
  res.status(err.code).send(err);
};

module.exports = handlerError;
