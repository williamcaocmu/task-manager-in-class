import { useContext, useState } from "react";
import plusIcon from "../../assets/plus.svg";
import { StepContext } from "../../contexts/StepProvider";

const AddStep = () => {
  const [name, setName] = useState("");
  const { addStep } = useContext(StepContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    addStep({ name });
    setName("");
  };

  return (
    <li className="step add-step">
      <form className="step-form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="step-input"
          placeholder="Add new step"
          name="step"
        />
        <button className="icon-button step-button">
          <img draggable="false" src={plusIcon} alt="Add new step" />
        </button>
      </form>
    </li>
  );
};
export default AddStep;
