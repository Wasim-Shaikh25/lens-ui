import axios from 'axios';
import moment from 'moment';



//submit data
export const handleSubmit = async(e, formData, navigate )=>{
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');    

    if (formData.customerDetail && formData.customerDetail.length > 0) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.customerDetail[formData.customerDetail.length -1].lastUpdatedOn = dateTime;
      formData.customerDetail[formData.customerDetail.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;
    
  
    
    const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/customer/save", formData);
    console.log("response is ",res.data);
    navigate(`/registerSuccess/${res.data}`);

    console.log(formData);
    // Add form submission logic here
  };



//getApi
export const handleUpdate = async (e,formData,rId,navigate)=>{
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (formData.customerDetail && formData.customerDetail.length > 0) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.customerDetail[formData.customerDetail.length -1].lastUpdatedOn = dateTime;
      // formData.customerDetail[formData.customerDetail.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      // formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/customer/Update", formData);
    console.log("response from update is ",res.data);

    
    console.log(formData);
    rId=null;
    navigate(`/updateSuccess/${formData.customerReferenceNumber}`);
  }




//get single data
export const getCustomer = async(rId,setFormData)=>{
    try{
    const res = await axios.get(`https://lens-svc.azurewebsites.net/lens-svc/customer/get?customerRefrenceNumber=${rId}`)
    const {data} = res;
        setFormData(data);
    }
    catch(err){
      console.log(err)
    }
}



//getAll Customers
export const getAllCustomer = (currentPage, itemsPerPage, setData, setIsDeleted)=>{

    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/customer/getAll?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
    .then(res => {
      setData(res.data);
      console.log("the fetched data is ",res.data);
      setIsDeleted(false)
    })
    .catch((err)=>{
      console.log(err)
    })
}


//delete data
export const deleteDetail = (crId,data,setIsDeleted,setData)=>{
    axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/customer/delete?customerRefrenceNumber=${crId}`)
    .then(res=>{
      console.log(res)
      const newData = data.filter(item => item.customerReferenceNumber !== crId);
      setIsDeleted(true)
      setData(newData);

    }).catch(err=>{
      console.log(err)
    })
    
    console.log("customer reference id of deletion elem is ", crId);
}