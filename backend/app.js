const express = require("express");
const app = express();
const morgan = require("morgan");
const userAuthRoutes = require("./routes/userAuth");
const artistRoutes = require("./routes/artistRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const artRoutes = require("./routes/artRoutes");
const cors = require("cors");
const corsOptions = {
	origin: [
		"http://localhost:5500",
		"http://127.0.0.1:5500",
		"https://savanna-showcase.netlify.app",
	],
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

// Add routes and middleware to server
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", userAuthRoutes);
app.use("/artist", artistRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
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

app.listen(4000, () => {
	console.log("Server started on port 4000!");
});
