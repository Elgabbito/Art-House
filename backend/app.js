const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const userAuthRoutes = require("./routes/userAuth");

const corsOptions = {
  origin: "http://localhost:5500",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
};

// Add routes and middleware to server
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", cors(), userAuthRoutes);


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
