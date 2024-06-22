import axios from "axios";







export const  deleteDetail = async(empId,data,setData, setIsDeleted)=>{
    try{
         await axios.delete(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/user/deleteUser?empId=${empId}`)
        const newData = data.filter(item => item.empId !== empId);
        setData(newData);
        setIsDeleted(true);
    }
    catch(err){
    console.log(err);
    }
}



export const getAllUser = (setData,currentPage,itemsPerPage,setIsDeleted)=>{
    
    axios.get(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/user/getAllUser?pageNo=${currentPage}&pageSize=${itemsPerPage}`).then(res=>{

    const {data} = res;
    setData(data.content) 
    setIsDeleted(false)
    console.log("response Data is ",data);
})


}