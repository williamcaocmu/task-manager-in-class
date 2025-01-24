import { createContext, useEffect, useState } from "react";
import {
  addTaskAPI,
  deleteTaskAPI,
  getTasksAPI,
  updateTaskAPI,
} from "../services/tasks";

// CRUD = Create, Read, Update, Delete

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await getTasksAPI();
    if (data.success) {
      setTasks(data.tasks);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (taskId) => {
    await deleteTaskAPI(taskId);
    fetchTasks();
  };

  const addTask = async (taskName) => {
    await addTaskAPI(taskName);
    fetchTasks();
  };

  const editTaskName = async (id, taskName) => {
    await updateTaskAPI(id, taskName);
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        deleteTask,
        addTask,
        editTaskName,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
