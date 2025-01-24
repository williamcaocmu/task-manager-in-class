import { createContext, useEffect, useState } from "react";
import {
  addStepAPI,
  getStepsByTaskIdAPI,
  updateStepStatusAPI,
} from "../services/steps";
export const StepContext = createContext();

export const StepContextProvider = ({ children, taskId, open }) => {
  const [steps, setSteps] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const fetchSteps = async (taskId) => {
    const data = await getStepsByTaskIdAPI(taskId);

    if (data.success) {
      setSteps(data.data);
    }
  };

  const addStep = async ({ name }) => {
    await addStepAPI({ order: steps.length + 1, name, taskId });
    fetchSteps(taskId);
  };

  const updateStepStatus = async (id, status) => {
    await updateStepStatusAPI(id, status);
    fetchSteps(taskId);
  };

  useEffect(() => {
    if (open && !isFetched) {
      fetchSteps(taskId);
      setIsFetched(true);
    }
  }, [taskId, open]);

  return (
    <StepContext.Provider
      value={{ steps, setSteps, addStep, updateStepStatus, open }}
    >
      {children}
    </StepContext.Provider>
  );
};
