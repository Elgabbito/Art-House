require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcrypt");
const { hashPassword } = require("../controller/auth");

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
async function getAllUsers() {
	const query = "SELECT name, email, user_role FROM users";
	return await db.query(query);
}
async function getArtistsModel() {
	const query =
		"SELECT name, email, user_role FROM users WHERE user_role = 'artist'";
	return await db.query(query);
}

async function updateUserProfile(updatedFields, id) {
	const { value, fieldToUpdate } = updatedFields;
	console.log(
		await hashPassword(value.newPassword, Number(process.env.saltRounds))
	);
	let data = value;
	if (fieldToUpdate !== "password") {
		const query = `UPDATE users SET ${fieldToUpdate} = $1 WHERE id = $2 RETURNING * `;
		const values = [data, id];
		const result = await db.query(query, values);
		// console.log(result);
		return result.rows[0];
	}
	if (isPassword(value.oldPassword, id)) {
		const query = `UPDATE users SET ${fieldToUpdate} = $1 WHERE id = $2 RETURNING * `;
		const salt = Number(process.env.saltRounds);
		console.log(value.newPassword);
		data = await hashPassword(value.newPassword, salt);
		const values = [data, id];
		const result = await db.query(query, values);
		return result.rows[0];
	}
	return "Unexpected data field";
}
module.exports = {
	createUser,
	getUserByEmail,
	updateUserProfile,
	getAllUsers,
	getArtistsModel,
};

// functions
async function isPassword(oldPassword, id) {
	const hashedPassword = await db.query(
		"SELECT password FROM users WHERE id = $1",
		[id]
	);
	return await bcrypt.compare(oldPassword, hashedPassword);
}
