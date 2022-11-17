const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/users_photos/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
}).single("userPhoto");
module.exports = upload;
