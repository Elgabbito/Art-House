const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadArt, fetchArt, fetchSingleArt } = require("../controller/art");
const upload = multer({ dest: "./uploads" });

router.post("/upload", upload.single("art"), uploadArt);
router.get("/", fetchArt);
// router.get("/:id", fetchSingleArt);

module.exports = router;
