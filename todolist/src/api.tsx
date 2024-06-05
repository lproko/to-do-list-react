import axios from "axios";

const apiUrl = "http://localhost:3000";

const setApi = async () => {
  axios.defaults.baseURL = apiUrl;
  axios.defaults.headers.common.Accept = "*/*";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  api = axios.create();
};

let api = axios.create();
setApi();

export const createTask = async (model: any) => {
  const { data } = await api.post("/tasks", model);
  return data;
};

export const updateTask = async (id: string, model: any) => {
  const { data } = await api.put(`/tasks/${id}`, model);
  return data;
};

export const fetchTasks = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const fetchTasksbyId = async (id: any) => {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
};

export const deleteTasksbyId = async (id: any) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
