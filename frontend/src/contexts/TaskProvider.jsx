import { createContext, useState } from "react";

const TASKS = [
  {
    id: 1,
    name: "Learn React",
  },
  {
    id: 2,
    name: "Learn Nodejs",
  },
];

export const TaskContext = createContext();

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState(TASKS);

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const addTask = (taskName) => {
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
    };
    setTasks([...tasks, newTask]);
  };

  const editTaskName = (id, taskName) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, name: taskName };
        }
        return task;
      })
    );
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
