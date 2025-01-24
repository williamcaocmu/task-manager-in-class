import db from "../libs/db.js";

export const findTasks = async (req, res) => {
  const tasks = await db.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
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

export const getById = async (id) => {
  const task = await db.task.findUnique({ where: { id: Number(id) } });
  return task;
};

export const updateTask = async (id, name) => {
  const task = await db.task.update({
    where: { id: Number(id) },
    data: { name },
  });
  return task;
};

export const deleteTask = async (id) => {
  const task = await db.task.delete({ where: { id: Number(id) } });
  return task;
};
