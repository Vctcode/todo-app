const Todo = require("../model/Todo");

// get all Todo Tasks
exports.getAllTodos = async (req, res) => {
  try {
    let todos = await Todo.find();
    if (todos.length === 0)
      return res.status(404).json({
        success: false,
        message: "No task was found",
      });
    res.status(200).json({
      success: true,
      message: "List of all Todo Tasks",
      todos,
      count: todos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// get single Todo
exports.getTodo = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let todo = await Todo.findOne(id);
    if (!todo)
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    res.status(200).json({
      success: true,
      message: "Task found",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Create a Todo
exports.createTodo = async (req, res) => {
  try {
    let todo = await req.body;
    let created = await Todo.create(todo);
    if (!created)
      return res.status(400).json({
        success: false,
        message: "Task creation failed",
      });
    return res.status(201).json({
      success: true,
      message: "Task created succefully",
      todo: created,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update Todo
exports.updateTask = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let todo = await req.body;
    let updated = await Todo.findOneAndUpdate(id, todo, { new: true });

    if (!updated)
      return res.status(400).json({
        success: false,
        message: "Task not updated",
      });

    return res.status(200).json({
      success: true,
      message: "Task update",
      todo: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete Todo
exports.deleteTask = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let deleted = await Todo.findOneAndRemove(id);

    if (!deleted)
      return res.status(400).json({
        success: false,
        message: "Task not found or not able to delete",
      });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
