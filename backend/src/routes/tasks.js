import express from "express";
import db from "../libs/db.js";
import {
  addTask,
  findTasks,
  getById,
  updateTask,
  deleteTask,
} from "../handlers/task.js";
const router = express.Router();

// Get all tasks
router.get("/", findTasks);

// Add a new task
router.post("/", addTask);

// Update a task
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const task = await getById(id);
  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  const updatedTask = await updateTask(id, name);
  res.json({ success: true, task: updatedTask });
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await getById(id);
  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  await deleteTask(id);
  res.json({ message: "Delete task" });
});

export default router;
