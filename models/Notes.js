const mongoose = require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  author_id: String,
  title: String,
  text: String
});
mongoose.model("notes", noteSchema);
