const db = require("../db/index");

async function sendChat(req, res) {
	const { roomId, senderId, message, timeStamp } = req.body;
	const query =
		"INSERT INTO messages (sender_id, timestamp, room_id, message) VALUES ($1, $2, $3, $4) RETURNING *";
	const values = [senderId, timeStamp, roomId, message];

	try {
		const response = await db.query(query, values);

		console.log(response);
		res.send({ success: true, status: 200, data: response.json() });
	} catch (error) {
		res.send({
			success: false,
			message: "Internal server error",
			error: error,
		});
	}
}
async function getChat(req, res) {
	const { room_id, sender_id } = req.body;
	const query = "SELECT * FROM messages WHERE room_id=$1 and sender_id=$2";
	const values = [room_id, sender_id];

	try {
		const response = await db.query(query, values);

		res.send({ success: true, status: 200, data: response.json() });
	} catch (error) {
		res.send({
			success: false,
			message: "Internal server error",
			error: error,
		});
	}
}
async function createRoom(req, res) {
	const { roomId, senderId, recipientId } = req.body;
	console.log(req.body);
	const query =
		"INSERT INTO chatrooms (id, sender_id, recipient_id) VALUES ($1, $2, $3) RETURNING *";
	const values = [roomId, senderId, recipientId];

	try {
		const response = await db.query(query, values);

		console.log(roomId, senderId, recipientId);
		res.send({ success: true, status: 200, data: response.rows[0] });
	} catch (error) {
		if (error.constraint === "unique_values") {
			return res.send({
				success: true,
				message: "Room already exists",
				data: error,
			});
		}
		res.send({
			success: false,
			message: "Internal server error",
			error: error,
		});
	}
}
module.exports = { sendChat, getChat, createRoom };
