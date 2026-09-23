// import api from "./axios.js";

// // NOTE: Apke Express backend ke routes ke naam agar different hain
// // (e.g. /api/task instead of /api/tasks) to bas yahan URL badal dein.

// export const getTasks = () => api.get("/tasks").then((res) => res.data);

// export const getTask = (id) => api.get(`/tasks/${id}`).then((res) => res.data);

// export const createTask = (payload) =>
//   api.post("/tasks", payload).then((res) => res.data);

// export const updateTask = (id, payload) =>
//   api.put(`/tasks/${id}`, payload).then((res) => res.data);

// export const deleteTask = (id) =>
//   api.delete(`/tasks/${id}`).then((res) => res.data);


import api from "./axios.js";

// Fetch all boards for the user
export const getBoards = () => api.get("/boards").then((res) => res.data);

// Create a new board
export const createBoard = (boardName) =>
  api.post("/boards", { boardName }).then((res) => res.data);

// Create item inside active board and list
export const createBoardItem = (boardId, listId, payload) =>
  api.post(`/boards/${boardId}/lists/${listId}/items`, payload).then((res) => res.data);