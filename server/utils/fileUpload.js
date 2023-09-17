const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ServerError = require("../errors/ServerError");
const env = process.env.NODE_ENV || "development";
const devFilePath = path.resolve(__dirname, "../../public/images");
const { v4: uuidv4 } = require("uuid");

const filePath = env === "production" ? "/var/www/html/images/" : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageImageFiles = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, filePath);
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split(".").pop()}`);
  },
});

const uploadImageMulter = multer({ storage: storageImageFiles }).single("file");

module.exports.uploadImage = (req, res, next) => {
  uploadImageMulter(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(new ServerError());
    } else if (err) {
      next(new ServerError());
    }
    return next();
  });
};
