const fs = require("fs");
const path = require("path");
const multer = require("multer");
const ServerError = require("../errors/ServerError");
const env = process.env.NODE_ENV || "development";
const devFilePath = path.resolve(__dirname, "../../public/images");
const { v4: uuidv4 } = require("uuid");
const { MAX_SIZE_IMAGE_FILE } = require("../constants");

const filePath = env === "production" ? "/var/www/html/images/" : devFilePath; // поменять!!

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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/webp") {
    cb(null, true);
  } else {
    cb(new ServerError("Invalid file format"), false);
  }
};

const limits = {
  fileSize: MAX_SIZE_IMAGE_FILE,
};

const uploadImageMulter = multer({
  storage: storageImageFiles,
  fileFilter: fileFilter,
  limits: limits,
}).single("file");

module.exports.uploadImage = (req, res, next) => {
  uploadImageMulter(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(
        new ServerError(
          `файл перевищує розмір, максимальний розмір файлу ${MAX_SIZE_IMAGE_FILE} байт`
        )
      );
    } else if (err) {
      return next(new ServerError("файл має бути формату webp"));
    }
    return next();
  });
};
