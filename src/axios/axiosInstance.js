// src/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "https://cors-everywhere.herokuapp.com/http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com";


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin' : '*',
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
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
