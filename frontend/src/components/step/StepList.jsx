import Step from "./Step";
import AddStep from "./AddStep";
import { StepContext } from "../../contexts/StepProvider";
import { useContext } from "react";

const StepList = () => {
  const { steps, open } = useContext(StepContext);

  if (!open) return null;

  return (
    <section className="progress">
      <ol className="progress-steps">
        {steps.map((step) => (
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
