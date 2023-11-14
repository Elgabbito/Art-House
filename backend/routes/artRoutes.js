const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadArt } = require("../controller/art");
const upload = multer({ dest: "./uploads" });

router.post("/upload", upload.single("art"), uploadArt);

module.exports = router;
