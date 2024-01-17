require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const userAuthRoutes = require("./routes/userAuth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");
const artRoutes = require("./routes/artRoutes");
const Port = process.env.PORT || 4000;
const cors = require("cors");
const corsOptions = {
	origin: [
		"http://localhost:5500",
		"http://127.0.0.1:5500",
		"http://127.0.0.1:5501",
		"https://savanna-showcase.netlify.app",
	],
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userAuthRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/chat", chatRoutes);
app.use("/art", artRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	return next(err);
});

// development error handler will print stacktrace
if (app.get("env") === "development") {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		return res.json({ message: err.message, error: err });
	});
}

const server = app.listen(Port, () => {
	console.log(`Server started on port ${Port}!`);
});
const io = require("socket.io")(server, { cors: corsOptions });
io.on("connection", (socket) => {
	// console.log(socket.handshake.query.roomId);
	const currentRoom = socket.handshake.query.roomId;
	console.log("A user connected");

	socket.on("enterRoom", ({ name, room }) => {
		console.log("Name ", name, " Room: ", room);
		socket.join(room);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});

	socket.on("message", (message) => {
		console.log("Received message:", message, "Room:", currentRoom);
		socket.to(`${currentRoom}`).emit("message", message);
	});
});
