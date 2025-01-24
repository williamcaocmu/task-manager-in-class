import axios from "axios";

const BASE_STEPS_URL = "http://localhost:3000/api/steps";

export const getStepsByTaskIdAPI = async (taskId) => {
  const response = await axios.get(`${BASE_STEPS_URL}?taskId=${taskId}`);
  return response.data;
};

export const addStepAPI = ({ name, order, taskId }) => {
  return axios.post(BASE_STEPS_URL, { name, order, taskId });
};

export const updateStepStatusAPI = async (id, status) => {
  await axios.patch(`${BASE_STEPS_URL}/${id}`, { finished: "123" });
};
