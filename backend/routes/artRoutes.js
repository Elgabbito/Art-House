const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
	fetchPurchasedArt,
	setArtPurchase,
	uploadArt,
	fetchArt,
	fetchTopArtByCategory,
	fetchSingleArt,
	fetchFilteredArt,
	deleteArt,
} = require("../controller/art");
const upload = multer({ dest: "./uploads" });

router.post("/upload", upload.single("art"), uploadArt);
router.post("/buy", setArtPurchase);
router.get("/purchases/:buyerId", fetchPurchasedArt);
router.get("/", fetchArt);
router.get("/categories", fetchTopArtByCategory);
router.get("/filteredArt", fetchFilteredArt);
router.get("/singleArt/:id", fetchSingleArt);
router.delete("/delete", deleteArt);
module.exports = router;
