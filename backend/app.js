const express = require("express");
const app = express();
const morgan = require("morgan");
const userAuthRoutes = require("./routes/userAuth");
const cors = require("cors")
const corsOption = {
  origin : "http://127.0.0.1:5500",
  method : "[POST, PUT, PATCH, DELETE]"
}

// Add routes and middleware to server
app.use(cors(corsOption));
app.use(morgan("tiny"));
app.use(express.json());
app.use("/auth", userAuthRoutes);

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

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
