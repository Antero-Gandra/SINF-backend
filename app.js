// config from private .env file
require("dotenv").config();

// express middleware
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const express = require("express");

// router imports
const devRouter = require("./routes/dev");
const productsRouter = require("./routes/product");
const userRouter = require("./routes/user");

// setup endpoints and fetch access_token
require("./utils/token");

const env = process.env.NODE_ENV || "dev";
const app = express();
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

// setup html template engine + console logging for development
app.set("view engine", "pug");
app.use(morgan("dev"));

// builtin middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());

// routers

app.use("/product", productsRouter);
app.use("/dev", devRouter);
app.use("/user", userRouter);

app.use(function(err, req, res, next) {
  res.send(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// TODO: what is appropriate for development?
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = env === "dev" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
