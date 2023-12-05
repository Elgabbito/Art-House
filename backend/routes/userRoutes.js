const express = require("express");
const router = express.Router();
const { updateProfile, getUsers, getArtists } = require("../controller/user");

router.patch("/edit/:id", updateProfile);
router.get("/", getUsers);
router.get("/artists", getArtists);

module.exports = router;
