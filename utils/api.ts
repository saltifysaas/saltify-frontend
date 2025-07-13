import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://app.saltifysaas.com",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor to include JWT if available
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // Adjust cookie name if needed
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
