import { useContext, useState } from "react";
import IconButton from "./IconButton";
import { TaskContext } from "../../contexts/TaskProvider";

const NewTaskForm = () => {
  const [text, setText] = useState("");
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(text);
    setText("");
  };

  return (
    <li className="card">
      <header className="card-header card-header-new">
        <form className="card-title-form" onSubmit={handleSubmit}>
          <input
            className="card-title card-title-input"
            placeholder="Add new task"
            name="title"
            value={text} // binding data
            onChange={(e) => setText(e.target.value)} // change data
          />
          <IconButton />
        </form>
      </header>
    </li>
  );
};

export default NewTaskForm;
