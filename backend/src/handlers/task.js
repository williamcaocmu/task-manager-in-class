import db from "../libs/db.js";

export const findTasks = async (req, res) => {
  const tasks = await db.task.findMany({
    include: {
      steps: true,
    },
  });
  res.json({
    success: true,
    tasks,
  });
};

export const addTask = async (req, res) => {
  const { name } = req.body;
  const task = await db.task.create({ data: { name } });
  res.json({ success: true, task });
};
