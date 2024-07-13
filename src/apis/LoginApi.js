import axios from "axios";
import Cookies from 'js-cookie';
import axiosInstance from "../axios/axiosInstance";


const baseUrl = "https://testapp-env.eba-6smrf3fp.ap-south-1.elasticbeanstalk.com";


export const handleSubmit = async (e, setToken, formData, navigate) => {
  e.preventDefault();
  try {
    const res = await axiosInstance.post(`/auth/authenticate`, formData);
    const { data } = res;
    const token = String(data.access_token); // Ensure token is a string
    const expiryTime = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes from now

    Cookies.set('access_token', token, { expires: expiryTime });
    setToken(token); // Store the decoded token in global state

    console.log("Token is ", token);
    navigate('/');
  } catch (err) {
    console.log(err);
  }
};
