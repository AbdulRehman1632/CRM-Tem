import api from "./axios.js";

// NOTE: Apke Express backend ke routes ke naam agar different hain
// (e.g. /api/task instead of /api/tasks) to bas yahan URL badal dein.

export const getTasks = () => api.get("/tasks").then((res) => res.data);

export const getTask = (id) => api.get(`/tasks/${id}`).then((res) => res.data);

export const createTask = (payload) =>
  api.post("/tasks", payload).then((res) => res.data);

export const updateTask = (id, payload) =>
  api.put(`/tasks/${id}`, payload).then((res) => res.data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);
