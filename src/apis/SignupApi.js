 import axiosInstance from "../axios/axiosInstance";
 import moment from 'moment';
import { WindowSharp } from "@mui/icons-material";

 

 //get All Designation
 export const getDesignation = async(setDesignation)=>{
    try{
      const res = await axiosInstance.get(`user/allDesignations`)
      const{data} = res;
      setDesignation(data);
    }
    catch(err){
      console.log(err);
    }
  }
  
  
   //get All Departments
  export  const getDepartments = async(setDepartments)=>{
    try{
      const res = await axiosInstance.get(`user/getAllDepartments`)
      const{data} = res;
      setDepartments(data);
      console.log(data)
    }
    catch(err){
      console.log(err);
    }
   }
  
  
   //get All Branches
   export const getBranches = async(setBranches)=>{
    try{
      const res = await axiosInstance.get(`user/getAllBranches`)
      const{data} = res;
      setBranches(data);
      console.log(data)
    }
    catch(err){
      console.log(err);
    }
   }
  
  
  
  
  //  export const handleSubmit = async(e,formData,navigate) => {
      
  //     e.preventDefault();
  //     formData.branches[0].region = formData.branches[0].departmentName;
  //     formData.lastUpdatedByUserId = formData.empId;
  //     console.log(formData.middleName)
  

  //     try{
  //       const res = await axiosInstance.post(`user/createAccount`,formData);
  //       const{data} = res;
  //       console.log("response Data ",data);
  //       navigate('/user')
  //     }
  //     catch(err){
  //       console.log(err);
  
  //     }
  
  //   };


  export const handleSubmit = async (e, formData, navigate) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    formData.lastUpdatedByUserId = formData.empId;
    formData.updatedOn =  dateTime;

    formData.branches = formData.branches.map(branch => ({
      branchName: branch.branchName,
      region: branch.branchName
    }));

    console.log("User FormData before submission ",formData);
    

    try {
      const res = await axiosInstance.post(`user/createUser`, formData);
      const { data } = res;
      console.log("response Data ", data);
      navigate(`/CreateUser/${formData.empId}`);
    } catch (err) {
      console.log(err);
    }
  };
  
    

    export const getuser = async(uId, setFormData)=>{

      try{
        const res = await axiosInstance.get(`user/getUser?empId=${uId}`);
        const{data} = res;
        if(!data.departments.length){
          data.departments[0]={departmentName:""};
        }
        setFormData(data);
        console.log("single user data is ",data)
      }
      catch(err){
        console.log(err)
      }
    } 
  


    export const handleUpdate = async(e,formData,navigate,authState,setAuthState, logout)=>{
      e.preventDefault();


      formData.departments[0].region = formData.departments[0].departmentName;
      formData.lastUpdatedByUserId = formData.empId;
            console.log(formData.middleName)

      try{
     
         if(formData.empId==authState?.sub && (formData.designation.designationName !== 'Admin' &&  formData.designation. designationName !== 'Director' )){
          const confirmLogout = window.confirm("You Authority will be changed, need to login again!!");
  
          if (confirmLogout) {
            const res = await axiosInstance.put(`/user/updateUser`,formData);
            const{data} = res;
            console.log("response Data ",data);
            logout(); 
          }

         }
         else{
          const res = await axiosInstance.put(`/user/updateUser`,formData);
          const{data} = res;
          console.log("response Data ",data);

          setAuthState((prev) => ({
            ...prev,
            designation:{designationName: formData.designation.designationName}
          }));
          console.log("Non admin block hit")
          navigate('/user')
          //navigate('/')
           
           console.log("became a normal user block hit")

         }

         console.log("authstate ka data ",authState)
      }
      
      catch(err){
        console.log(err);
  
      }
   
   }
  


