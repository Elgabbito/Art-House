const express = require("express");
const router = express.Router();
const { sendChat, getChat, createRoom } = require("../controller/chat");

router.post("/createRoom", createRoom);
router.post("/sendChat", sendChat);
router.get("/getChat", getChat);

module.exports = router;
