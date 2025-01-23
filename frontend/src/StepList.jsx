import React from "react";
import dragIcon from "./assets/drag.svg";
import trashIcon from "./assets/trash.svg";
import pencilIcon from "./assets/pencil.svg";
import upIcon from "./assets/up.svg";
import downIcon from "./assets/down.svg";
import plusIcon from "./assets/plus.svg";

const fakeSteps = [
  { id: 1, title: "Step 1", completed: false },
  { id: 2, title: "Step 2", completed: false },
  { id: 3, title: "Step 3", completed: false },
];

// Step component for individual steps
const Step = ({ step, onEdit, onDelete, onMoveUp, onMoveDown }) => {
  return (
    <li draggable="true" className="step">
      <span className="icon-button step-button step-handle">
        <img draggable="false" src={dragIcon} alt="Move" />
      </span>

      <label className="step-label">
        <input type="checkbox" checked={step.completed} />
        {step.completed ? <s>{step.title}</s> : step.title}
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

// AddStep component for the form to add new steps
const AddStep = ({ onAdd }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <li className="step add-step">
      <form className="step-form" onSubmit={handleSubmit}>
        <input className="step-input" placeholder="Add new step" name="step" />
        <button className="icon-button step-button">
          <img draggable="false" src={plusIcon} alt="Add new step" />
        </button>
      </form>
    </li>
  );
};

// Main StepList component
const StepList = () => {
  return (
    <section className="progress">
      <ol className="progress-steps">
        {fakeSteps.map((step) => (
          <Step
            key={step.id}
            step={step}
            onEdit={() => {}}
            onDelete={() => {}}
            onMoveUp={() => {}}
            onMoveDown={() => {}}
          />
        ))}
        <AddStep />
      </ol>
    </section>
  );
};

export default StepList;
