const db = require("../db/index.example")

async function createUser(name, email, hashedPassword) {
    const query = "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, email, hashedPassword];
    return await db.query(query, values);
}

async function getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [email];
    return await db.query(query, values);
    
}
module.exports = { createUser, getUserByEmail};