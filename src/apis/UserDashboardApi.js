import axiosInstance from "../axios/axiosInstance";

 
 
export const  deleteDetail = async(empId,data,setData, setIsDeleted)=>{
    try{
         await axiosInstance.delete(`/user/deleteUser?empId=${empId}`)
        const newData = data.filter(item => item.empId !== empId);
        setData(newData);
        setIsDeleted(true);
    }
    catch(err){
    console.log(err);
    }
}



export const getAllUser = async(setData,currentPage,itemsPerPage,setIsDeleted)=>{
    
    try{
        const {data} = await axiosInstance.get(`/user/getAllUser`)
    
        setData(data) 
        setIsDeleted(false)
        console.log("response  is ",data);

    }
    catch(err){
        console.log(err)
}


}


export const searchFilter = async(empId,branch,firstName,lastName,designation,department,role,currentPage,itemsPerPage,setData)=>{

    try {
        let url = `user/getAllUsersByFilter?`;
        if (empId) url += `empId=${empId}&`;
        if (firstName) url += `firstName=${firstName}&`;
        if (branch) url += `branch=${branch}&`;
        if (lastName) url += `lastName=${lastName}&`;
        if (designation) url += `designation=${designation}&`;
        if (department) url += `department=${department}&`;
        if (role) url += `department=${role}&`;
        url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;
    
        console.log("URL is :", url); // Log the constructed URL
    
        const res = await axiosInstance.get(url);
    
        const { data } = res;
        setData(data);
        console.log("response is", res);
      } catch (err) {
        console.log(err);
      }

}