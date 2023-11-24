const fs = require("fs").promises;
const path = require("path");
const env = process.env.NODE_ENV || "development";
const devFilePath = path.resolve(__dirname, "../../public/images");

const directoryPath = env === "production" ? "/var/www/html/images/" : devFilePath; // поменять!!

const deleteFile = async (fileName) => {
  try {
    const filePath = path.join(directoryPath, fileName);
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Ошибка при удалении файла ${fileName}: ${error.message}`);
  }
};

module.exports = deleteFile;
