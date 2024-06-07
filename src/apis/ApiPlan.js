import axios from 'axios';


//Submit form
export const handleSubmit = async (e, formData,navigate) => {

    e.preventDefault();
  
    console.log("formData sales is ", formData);

    try {
      const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/apiPlan/save", formData);
      console.log("response is ", res.data);
      navigate(`/apiSuccess/${res.data}`);
    } catch (err) {
      console.log(err);
    }
  };



//getApi
export const getApi = async(apId,setFormData)=>{

  try{
    const res = await axios.get(`https://lens-svc.azurewebsites.net/lens-svc/apiPlan/get?apiPlanDrfNumber=${apId}`)
    const {data} = res;
    setFormData(data);
    console.log("the apId fetched data is ",data)
    }
    catch(err){
      console.log(err);
    }
    
}


//Update API
export const handleUpdate = async (e, formData, apId, navigate)=>{
  e.preventDefault();

    try{
        const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/apiPlan/update", formData);
        console.log("response from update is ",res.data);
        apId="";
        navigate(`/apiSuccess/${formData.apiPlanDrfNumber}`);
    }
    catch(err){
      console.log(err)
    }

  
}

//get All 
export const getAllApi = async(currentPage, itemsPerPage, setData, setIsDeleted)=>{

  try{
    const res = await axios.get(`https://lens-svc.azurewebsites.net/lens-svc/apiPlan/getAll`)
    setData(res.data);
    console.log("the fetched data is ",res.data);
    setIsDeleted(false)
  
  }catch(err){
    console.log(err)
  }

} 


// delete One
export const deleteDetail = async (crId,data, setData) => {
  try {
    await axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/apiPlan/delete?apiPlanId=${crId}`);
    const newData = data.filter(item => item.apiPlanDrfNumber !== crId);
    console.log("data is ",data)
    console.log("New data is ",newData)
    setData(newData);
  } catch (err) {
    console.log(err);
  }

}