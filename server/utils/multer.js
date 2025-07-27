const multer = require("multer");

const upload = multer({ destination: "uploads/" });

module.exports = upload;
