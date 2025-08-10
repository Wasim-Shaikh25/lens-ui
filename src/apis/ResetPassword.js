// import axiosInstance from "../axios/axiosInstance";
import axiosInstance from "../axios/axiosInstance";

// const baseUrl = process.env.REACT_APP_BASE_URL
// const baseUrl = "https://crm-api.synterratech.in/lens-svc"


export const handleSubmit = async (e,formData,navigate)=>{
    e.preventDefault();
    try{
      const res = await axiosInstance.post(`/auth/resetPassword`,formData);
      const {data} = res;
      navigate('/login')
      console.log("response is ",data)
    }
    catch(err){
    }
  }
