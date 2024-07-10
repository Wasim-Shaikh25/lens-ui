import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = "https://cors-everywhere.herokuapp.com/http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com";

export const handleSubmit = async (e, setToken, formData, navigate) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${baseUrl}/auth/authenticate`, formData , {headers: {
      'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    }});
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
