const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const db = require("../db");
require("dotenv").config();
const saltRounds = Number(process.env.saltRounds);

// Signup Route
router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password, saltRounds);

  const result = db.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashedPassword]
  );
  console.log(hashPassword);
  return res.send(result);
});

// Login route
router.post("/login", async (req, res, next) => {
  const { email, Password } = req.body;

  try {
    const result = await db.query(
      "SELECT password FROM users WHERE email = $1",
      [email]
    );
    if (result.rows.length === 0) {
      res.status(401).json({ message: "Invalid Email or Password" });
    }
    const hashedPassword = result.rows[0].password;

    //comparing the password
    const PasswordMatch = await bcrypt.compare(Password, hashedPassword);

    if (PasswordMatch) {
      return res.json({ message: "Login Successful" });
    } else {
      //password doesnt match
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server Error" });
  }
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

// Test data
// {
//     "email":"something@gmail.com",
//     "password":"123456"
// }
