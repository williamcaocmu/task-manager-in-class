import { useState } from "react";
import dragIcon from "../../assets/drag.svg";
import trashIcon from "../../assets/trash.svg";
import pencilIcon from "../../assets/pencil.svg";
import upIcon from "../../assets/up.svg";
import downIcon from "../../assets/down.svg";
import { useContext } from "react";
import { StepContext } from "../../contexts/StepProvider";

const Step = ({ step, onEdit, onDelete, onMoveUp, onMoveDown }) => {
  const [checked, setChecked] = useState(step.finished);
  const { updateStepStatus } = useContext(StepContext);

  return (
    <li draggable="true" className="step">
      <span className="icon-button step-button step-handle">
        <img draggable="false" src={dragIcon} alt="Move" />
      </span>

      <label className="step-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={async () => {
            setChecked(!checked); // true
            try {
              await updateStepStatus(step.id, !step.finished);
            } catch (error) {
              console.error(error);
              setChecked((prevChecked) => !prevChecked);
            }
          }}
        />
        {checked ? <s>{step.name}</s> : step.name}
      </label>

      <button className="icon-button step-button" onClick={onEdit}>
        <img draggable="false" src={pencilIcon} alt="Edit" />
      </button>

      <button className="icon-button step-button" onClick={onDelete}>
        <img draggable="false" src={trashIcon} alt="Delete" />
      </button>

      <button className="icon-button step-button" onClick={onMoveUp}>
        <img draggable="false" src={upIcon} alt="Move up" />
      </button>

      <button className="icon-button step-button" onClick={onMoveDown}>
        <img draggable="false" src={downIcon} alt="Move down" />
      </button>
    </li>
  );
};
export default Step;
