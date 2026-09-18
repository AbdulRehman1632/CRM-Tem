import axios from "axios";

// vite.config.js me "/api" backend (http://localhost:5000) ko proxy ho raha hai
const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Agar aap JWT auth use kar rahe hain to token yahan attach ho jayega
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
