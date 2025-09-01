import axios from 'axios';
import Cookies from "js-cookie";



const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_URL || 'https://dev-cmr-api.lpe.app/lens-svc',
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});



export const setupInterceptors = (showLoader, hideLoader, showError) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("access_token");
      if (token !== "null" && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      showLoader(); // Show the global loader
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );



  axiosInstance.interceptors.response.use(
    (response) => {
      hideLoader(); // Hide the loader on success
      return response;
    },
    (error) => {
      hideLoader(); // Hide the loader on error

      // Extract error message and status code
      const statusCode = error.response?.status || "Network Error";
      const message =
        error.response?.data?.message || "Something went wrong!";

      // Pass error details to global error handler
      showError({ message, statusCode });

      return Promise.reject(error);
    }
  );
};


export default axiosInstance;


