// import axiosInstance from "../axios/axiosInstance";
import axios from "axios";


const baseUrl = process.env.REACT_APP_BASE_URL


export const handleSubmit = async (e,formData,navigate)=>{
    e.preventDefault();
    try{
      const res = await axios.post(`${baseUrl}/auth/resetPassword`,formData);
      const {data} = res;
      navigate('/login')
      console.log("response is ",data)
    }
    catch(err){
    }
  }
