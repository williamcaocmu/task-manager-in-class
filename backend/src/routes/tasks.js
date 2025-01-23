import express from "express";
import db from "../libs/db.js";
import { addTask, findTasks } from "../handlers/task.js";
const router = express.Router();

// Get all tasks
router.get("/", findTasks);

// Add a new task
router.post("/", addTask);

// Update a task
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const task = await db.task.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const updatedTask = await db.task.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
    },
  });

  res.json({ success: true, task: updatedTask });
});

// Delete a task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await db.task.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!task) {
    res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }
  await db.task.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: "Delete task" });
});

export default router;
