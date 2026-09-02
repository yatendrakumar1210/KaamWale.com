import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://kaamwale-com.onrender.com/api'
});

// Attach Authorization header if token exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('lc_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;
