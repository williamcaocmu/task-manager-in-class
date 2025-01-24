import { useContext, useState } from "react";
import { TaskContext } from "../../contexts/TaskProvider";
import StepList from "../step/StepList";
import { StepContextProvider } from "../../contexts/StepProvider";
import caretIcon from "../../assets/caret.svg";

const Task = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [taskName, setTaskName] = useState("");
  const { deleteTask, editTaskName } = useContext(TaskContext);

  const handleChangeEdit = () => {
    setEditing(true);
    setTaskName(task.name);
  };

  const handleEditTaskName = (e) => {
    e.preventDefault();
    editTaskName(task.id, taskName);
    setEditing(false);
  };

  return (
    <li className="card">
      <header className="card-header">
        <span
          className={`icon-button card-expand ${open ? "card-expanded" : ""} `}
          onClick={() => setOpen(!open)}
        >
          <img src={caretIcon} alt="Edit" />
        </span>
        {isEditing ? (
          <form onSubmit={handleEditTaskName}>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </form>
        ) : (
          <p className="card-title">{task.name}</p>
        )}
      </header>

      <ul className="card-controls">
        {!isEditing && (
          <li onClick={() => handleChangeEdit()}>
            <button className="card-control">Edit</button>
          </li>
        )}
        <li onClick={() => deleteTask(task.id)}>
          <button className="card-control">Delete</button>
        </li>
      </ul>

      <StepContextProvider taskId={task.id} open={open}>
        <StepList />
      </StepContextProvider>
    </li>
  );
};
export default Task;
