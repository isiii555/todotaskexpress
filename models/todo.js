const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  completed: { type : Boolean, default : false},
});

const Todo = mongoose.model("Todo",todoSchema);

module.exports = Todo;