import axios from 'axios';
import Cookies from 'js-cookie';

// Ensure baseURL is correctly defined
const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
