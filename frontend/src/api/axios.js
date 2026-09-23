// import axios from "axios";

// // vite.config.js me "/api" backend (http://localhost:5000) ko proxy ho raha hai
// const api = axios.create({
//   baseURL: "/api",
//   headers: { "Content-Type": "application/json" },
// });

// // Agar aap JWT auth use kar rahe hain to token yahan attach ho jayega
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;



import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    // 1. Pehle direct 'token' check karein
    let token = localStorage.getItem('token');

    // 2. Agar token nahi mila, toh 'user' object se nikaalein (agar wahan saved hai)
    if (!token) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          token = parsed.token;
        } catch (e) {
          console.error('Failed to parse user from localStorage', e);
        }
      }
    }

    // 3. Agar token mil gaya toh Authorization header mein attach karein
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;