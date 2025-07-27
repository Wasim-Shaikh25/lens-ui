 import axiosInstance from "../axios/axiosInstance";
 import moment from 'moment';

 
 
 



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
      // navigate('/user');
    } catch (err) {
      console.log(err);
    }
  };
  
    

    export const getuser = async(uId, setFormData)=>{

      try{
        const res = await axiosInstance.get(`user/getUser?empId=${uId}`);
        const{data} = res;
        setFormData(data);
        console.log("single user data is ",data)
      }
      catch(err){
        console.log(err)
      }
    } 
  


    export const handleUpdate = async(e,formData,navigate)=>{
      e.preventDefault();
      formData.departments[0].region = formData.departments[0].departmentName;
      formData.lastUpdatedByUserId = formData.empId;
            console.log(formData.middleName)

  
      try{
        const res = await axiosInstance.put(`/user/updateUser`,formData);
        const{data} = res;
        console.log("response Data ",data);
        navigate('/user')
      }
      
      catch(err){
        console.log(err);
  
      }
   
   }
  