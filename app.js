require("dotenv").config();
require("express-async-errors");
const express = require("express");
// const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const apiResponse = require("./utils/api.response");
const errorHandler = require("./middleware/error.handler");
const messages = require("./json/message.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use("/api/v1", require("./routes/index"));

app.use((req, res) => apiResponse.NOT_FOUND({ res, message: messages.INVALID_ROUTE }));

app.use(errorHandler);
module.exports = app;
