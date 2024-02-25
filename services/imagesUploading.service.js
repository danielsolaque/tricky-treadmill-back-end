const { rm: deleteFile } = require("fs/promises");
const { v2: clodinary } = require("cloudinary");

clodinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isValidImgExtension(extension) {
  const VALID_EXTENSIONS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  return VALID_EXTENSIONS.includes(extension);
}

function uploadImage(path, options) {
  return clodinary.uploader
    .upload(path, options)
    .then((result) => {
      return deleteFile(path)
        .then(() => result)
        .catch((err) => err);
    })
    .catch((err) => err);
}

module.exports = { uploadImage, isValidImgExtension };
