import axios from "axios";
import moment from "moment";


//handle Submit
export const handleSubmit = async(e,formData,navigate) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');  

    if (formData.salesItems && formData.salesItems.length > "") {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.salesItems[formData.salesItems.length -1].lastUpdatedOn = dateTime;
      formData.salesItems[formData.salesItems.length -1].insertedOn = dateTime;
    } 


    
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;
      formData.inquiryDate = dateTime;
       
      
      console.log("formData sales is ",formData);
      const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/salesInquiry/save", formData);
    console.log("response is ",res.data);
    navigate(`/salesSuccess/${res.data}`);

    // Add form submission logic here

  };



  //Update
  export const handleUpdate = async (e,formData,sId,navigate)=>{
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (formData.salesItems && formData.salesItems.length > "") {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.salesItems[formData.salesItems.length -1].lastUpdatedOn = dateTime;
      // formData.salesItems[formData.salesItems.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      formData.lastUpdatedOn = dateTime;
     
      console.log("formData inside update ",formData);
      
      
    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/salesInquiry/Update", formData);
    console.log("response from update is ",res.data);

    
    sId="";
    navigate(`/salesSuccess/${formData.inquiryNumber}`);
  }



  //get Sales

export const getSales=(sId,setFormData) =>{

    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/salesInquiry/get/${sId}`)
    .then(res=>{
      const {data} = res;
        setFormData(data);
        console.log("the sId fetched data is ",data)

    }) 
    .catch(err=>{
      console.log(err)
    })

}


//get All sales
export const getAllSales = (currentPage,itemsPerPage,setData,setIsDeleted)=>{
    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/salesInquiry/getAll?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
      .then(res => {
        setData(res.data);
        console.log("the fetched data is ",res.data);
        setIsDeleted(false)
      })
      .catch((err)=>{
        console.log(err)
      })
}


//gee delete detail
export const deleteDetail = (sId,data,setData, setIsDeleted) => {
    console.log("sId is ", sId)
    
    axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/salesInquiry/delete/:InquiryNumber?InquiryNumber=${sId}`)
    .then(res=>{
      console.log(res)
      const newData = data.filter(item => item.inquiryNumber !== sId);
      setIsDeleted(true)
      setData(newData);

    }).catch(err=>{
      console.log(err)
    })
    
    console.log("Sales Inquiry Number of deletion elem is ", sId);
  };
