const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext && ext !== ".jpeg") {
      cb(HttpError(400, "Wrong extension type! Extensions should be *.png, *.jpg, *.jpeg"), false);
    } else {
      cb(null, true);
    }
  },
});

module.exports = upload;
