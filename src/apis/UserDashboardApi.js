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