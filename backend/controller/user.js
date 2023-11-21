const {
	updateUserProfile,
	getAllUsers,
	getArtistsModel,
} = require("../models/usermodel");

async function updateProfile(req, res) {
	const updatedFields = req.body;
	console.log(updatedFields);
	try {
		const result = await updateUserProfile(updatedFields, req.params.id);
		res.send({ status: 200, result });
	} catch (error) {
		console.error("Error Updating profile", error);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
}
async function getUsers(req, res) {
	try {
		const result = await getAllUsers();
		res.send({ success: true, status: 200, data: result.rows });
	} catch (error) {
		res.send({
			success: false,
			message: "Internal server error",
			error: error,
		});
	}
}
async function getArtists(req, res) {
	try {
		const result = await getArtistsModel();
		res.send({ success: true, status: 200, data: result.rows });
	} catch (error) {
		res.send({
			success: false,
			message: "Internal server error",
			error: error,
		});
	}
}
module.exports = { updateProfile, getUsers, getArtists };
