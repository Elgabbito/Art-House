const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../db");
const saltRounds = Number(process.env.saltRounds);

<<<<<<< HEAD


// Hash the users password and send the hashed password to the database
 router.post("/", async (req, res, next) => {
=======
// Hash the users password and send the hashed password to the database
router.post("/", async (req, res, next) => {
>>>>>>> 350a8e09a0fd77cfae82001d182b0f31652e574a
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(req.body.password, saltRounds);
  const result = db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );
<<<<<<< HEAD
console.log(hashPassword);
=======

>>>>>>> 350a8e09a0fd77cfae82001d182b0f31652e574a
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
