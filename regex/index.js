"use strict";

// validates strings that start lowercase letters (a-z)
// and consist of lowercase letters (a-z) with optional hyphens ("-")
// in between the letters.
module.exports.validateLinkString = /^[a-z]+(-[a-z]+)*$/;

// validates string is array numbers, example: '1,23,31,4'
module.exports.arrayNumbersString = /^\d+(,\d+)*$/;

const engUkrNum = "[a-zA-Zа-щьюяА-ЩЬЮЯґҐіІїЇєЄ0-9]+";
module.exports.arraySearchProductString = new RegExp(
  `^${engUkrNum}(,${engUkrNum})*$`
);

module.exports.camelCaseString = /^[a-z]+(?:[A-Z][a-z]*)*$/;

const ukrLetters = "[а-щьюяА-ЩЬЮЯґҐіІїЇєЄ]+";
module.exports.ukraineWordsString = new RegExp(
  `^${ukrLetters}(?:'?${ukrLetters})?(?:\\s{1}${ukrLetters}(?:'?${ukrLetters})?)*$`
);

module.exports.emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

module.exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
