const fs = require("fs");
const path = require("path");
const multer = require("multer");

function createStorage(destinationPath) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(destinationPath, { recursive: true });
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      const schemaName = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + schemaName + path.extname(file.originalname));
    },
  });
}

function createUploadMiddleware(destinationPath, fileSizeLimit) {
  const storage = createStorage(destinationPath);
  return multer({
    storage: storage,
    limits: {
      fileSize: fileSizeLimit,
    },
  });
}

const uploadArticle = createUploadMiddleware("public/images/article", 10000000);
const uploadProfile = createUploadMiddleware("public/images/profile", 10000000);
const uploadPosts = createUploadMiddleware("public/images/posts", 10000000);
module.exports = { uploadArticle, uploadProfile, uploadPosts };
