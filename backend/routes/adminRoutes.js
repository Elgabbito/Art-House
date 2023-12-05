const express = require("express");
const router = express.Router();
const { createNewAdmin } = require("../controller/adminController");

router.post("/create-admin", createNewAdmin);

module.exports = router;
