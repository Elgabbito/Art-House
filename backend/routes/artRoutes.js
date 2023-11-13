const express = require("express");
const router = express.Router();
const { uploadArt, uploadImage } = require("../controller/art");

router.post("/upload/:id", uploadArt, uploadImage);

module.exports = router;
