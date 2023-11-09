const db = require("../db");

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

async function updateUserProfile(updatedFields) {
  const {name , email, id } = updatedFields;
  // console.log(updatedFields);
  const query = "UPDATE users SET (name, email) = ($1, $2) WHERE id = $3 RETURNING * "
  const values = [name, email, id];
  const result = await db.query(query, values);
  // console.log(result);
  return result.rows[0];
}
module.exports = { createUser, getUserByEmail, updateUserProfile };
