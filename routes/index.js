const app = require("express")();
const validator = require("../middleware/validator");

app.get("/", (req, res) => res.json({ success: true, message: "Welcome to drawing-backend API." }));

app.use("/book", require("./book.router"));
module.exports = app;
