const { Schema, model } = require("mongoose");
const bookSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    authorName: { type: String, required: true },
    price: { type: Number, required: true },
    isbn: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    language: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

let bookModel = model("book", bookSchema, "book");
module.exports = bookModel;
