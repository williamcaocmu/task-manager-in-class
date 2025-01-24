import axios from "axios";

const BASE_TASKS_URL = "http://localhost:3000/api/tasks";

// API
export const getTasksAPI = async () => {
  const response = await axios.get(BASE_TASKS_URL);
  return response.data;
};

export const addTaskAPI = async (name) => {
  await axios.post(BASE_TASKS_URL, {
    name,
  });
};

export const deleteTaskAPI = async (id) => {
  await axios.delete(`${BASE_TASKS_URL}/${id}`);
};

export const updateTaskAPI = async (id, name) => {
  await axios.patch(`${BASE_TASKS_URL}/${id}`, {
    name,
  });
};
