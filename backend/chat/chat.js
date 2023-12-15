const io = require("socket.io")(http);

io.on("connection", (socket) => {
	console.log("A user connected");

	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});

	socket.on("message", (message) => {
		console.log("Received message:", message);
		io.emit("message", message);
	});
});
