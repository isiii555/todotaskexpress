const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  username: { type: String, require: true },
  passwordHash: { type: String, require: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
