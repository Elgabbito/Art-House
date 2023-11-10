const db = require("../db/index");

async function createUser(name, email, hashedPassword, user_role) {
  const query =
    "INSERT INTO users (name, email, password, user_role) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [name, email, hashedPassword, user_role];
  return await db.query(query, values);
}

async function getUserByEmail(email) {
  const query = "SELECT * FROM users WHERE email = $1";
  const values = [email];
  return await db.query(query, values);
}
module.exports = { createUser, getUserByEmail };
