const express = require("express");
const router = express.Router()
const {updateProfile} = require("../controller/user")

router.patch('/edit/:id', updateProfile)

module.exports = router;
