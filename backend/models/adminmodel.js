const db = require("../db")


async function createUser(name, email, password, user_role) {
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password, user_role]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser };


