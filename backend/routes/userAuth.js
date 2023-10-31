const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../db");
const saltRounds = Number(process.env.saltRounds);


// Hash the users password and send the hashed password to the database
router.post("/", async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(req.body.password, saltRounds);
  const result = db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );
  return res.send(result);
});

module.exports = router;

async function hashPassword(password, saltRounds) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw ("Password Hashing Failed", error);
  }
}
