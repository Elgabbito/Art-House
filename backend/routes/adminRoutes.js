const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController")


router.post("/create-User", adminController.createNewUser)

module.exports= router;