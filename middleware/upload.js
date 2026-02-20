// const multer = require("multer");
// const path = require("path");

// // Photos
// const storagePhoto = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/photos"),
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });
// const uploadPhoto = multer({ storage: storagePhoto, limits: { fileSize: 10 * 1024 * 1024 } });

// // Horoscope
// const storageHoroscope = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/horoscope"),
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });
// const uploadHoroscope = multer({ storage: storageHoroscope, limits: { fileSize: 10 * 1024 * 1024 } });

// module.exports = { uploadPhoto, uploadHoroscope };


//new changes

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Absolute path to uploads/photos
const uploadPath = path.join(process.cwd(), "uploads", "photos");

// Ensure directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload;
