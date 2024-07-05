import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const handleSubmit = async (e, setToken, formData, navigate) => {
  e.preventDefault();
  
  try {
    const res = await axios.post(`${baseUrl}/auth/authenticate`, formData);
    const { data } = res;

    // Check if the response data is a string (likely HTML)
    if (typeof data === 'string') {
      console.error("Unexpected HTML response:", data);
      throw new Error("Received an unexpected HTML response instead of JSON.");
    }

    if (data.access_token) {
      const accessToken = String(data.access_token); // Ensure the token is a string
      const expiryTime = new Date(new Date().getTime() + 30 * 60 * 1000); // 30 minutes from now

      // Setting the token as a cookie
      Cookies.set('access_token', accessToken, { expires: expiryTime });
      setToken(accessToken); // Store the token in global state

      console.log("Token is ", accessToken);
      navigate('/');
    } else {
      throw new Error("Invalid token format received");
    }
  } catch (err) {
    console.log("Error: ", err);
  }
};
