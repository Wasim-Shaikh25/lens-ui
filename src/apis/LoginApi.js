import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const handleSubmit = async (e, setToken, formData, navigate) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${baseUrl}/auth/authenticate`, formData);
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
