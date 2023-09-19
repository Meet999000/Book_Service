const mongoose = require("mongoose");
const debugDb = require("debug")("db");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    debugDb("🎯 connected");
    console.log("🎯 connected");
  })
  .catch((err) => {
    debugDb(err);
  });
