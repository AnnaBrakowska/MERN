const mongoose = require("mongoose");
//const Schema = mongoose.Schema or use destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema);
