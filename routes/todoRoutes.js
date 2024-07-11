const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");
const authenticateUser = require("../middlewares/authenticateUser");

router.use(express.json());

router.get("/:id",authenticateUser,async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/",authenticateUser, async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/",authenticateUser, async (req, res) => {
  try {
    const newTodo = new Todo({
      title: req.body.title,
      completed: req.body.completed,
      content: req.body.content,
    });
    const addedTodo = await newTodo.save();
    res.status(201).json(addedTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id",authenticateUser, async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await Todo.findByIdAndDelete(todoId);
    if (!deletedTodo) {
        return res.status(404).send(`Todo not found with id : ${todoId}`);
    }
    res.status(200).send(`Todo with id ${todoId}} deleted succesfully`);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put("/:id",authenticateUser, async (req, res) => {
    try {
        const todoId = req.params.id;
        const oldTodo = await Todo.findById(todoId);
        if (!oldTodo) {
            return res.status(404).send(`Todo not found with id ${todoId}`);
        }
        oldTodo.completed = !oldTodo.completed;
        const updatedTodo = await Todo.findByIdAndUpdate(todoId,oldTodo);
        res.status(200).json(updatedTodo);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

module.exports = router;
