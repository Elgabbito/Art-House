const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  uploadArt,
  fetchArt,
  fetchTopArtByCategory,
  fetchSingleArt,
} = require("../controller/art");
const upload = multer({ dest: "./uploads" });

router.post("/upload", upload.single("art"), uploadArt);
router.get("/", fetchArt);
router.get("/categories", fetchTopArtByCategory);

module.exports = router;
