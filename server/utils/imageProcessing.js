"use strict";
const sharp = require("sharp");

module.exports.imageConversionToWebp = (inputFilePath, outputFilePath) => {
  return new Promise((resolve, reject) => {
    sharp(inputFilePath)
      .webp({ quality: 50 })
      .toFile(outputFilePath, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
  });
};
