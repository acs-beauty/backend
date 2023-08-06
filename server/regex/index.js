"use strict";

// validates strings that start lowercase letters (a-z)
// and consist of lowercase letters (a-z) with optional hyphens ("-")
// in between the letters.
module.exports.validateLinkString = /^[a-z]+(-[a-z]+)*$/;

// validates string is array numbers, example: '1,23,31,4'
module.exports.arrayNumbersString = /^\d+(,\d+)*$/;

module.exports.arraySearchProductString =
  /^[a-zA-Zа-яА-ЯёЁ0-9]+(,[a-zA-Zа-яА-ЯёЁ0-9]+)*$/;

module.exports.camelCaseString = /^[a-z]+(?:[A-Z][a-z]*)*$/;
