import Task from "./Task";
import NewTaskForm from "./NewTaskForm";
import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/TaskProvider";

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

// 1. delete task
// 2. add task
// 3. update task
// 4. props drilling => useContext

function TaskList() {
  const { tasks } = useContext(TaskContext);

  return (
    <ol className="lane">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <NewTaskForm />
    </ol>
  );
}

export default TaskList;
