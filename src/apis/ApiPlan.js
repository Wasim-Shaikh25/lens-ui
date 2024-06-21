import axios from 'axios';
import moment from 'moment';


const baseUrl = process.env.REACT_APP_BASE_URL; 


//Submit form
export const handleSubmit = async (e, formData,navigate,token) => {

    e.preventDefault();
  
    console.log("formData sales is ", formData);

    try {
      const res = await axios.post(`${baseUrl}/lens/apiPlan/save`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("response is ", res.data);
      navigate(`/apiSuccess/${res.data}`);
    } catch (err) {
      console.log(err);
    }
  };



//getApi
export const getApi = async(apId,setFormData,token)=>{

  try{
    const res = await axios.get(`${baseUrl}/lens/apiPlan/get?apiPlanDrfNumber=${apId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const {data} = res;
    setFormData(data);
    console.log("the apId fetched data is ",data)
    }
    catch(err){
      console.log(err);
    }
    
}


//Update API
export const handleUpdate = async (e, formData, apId, navigate,token)=>{
  e.preventDefault();

    try{
        const res = await axios.put(`${baseUrl}/lens/apiPlan/update`, formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("response from update is ",res.data);
        apId="";
        navigate(`/apiSuccess/${formData.apiPlanDrfNumber}`);
    }
    catch(err){
      console.log(err)
    }

  
}

//get All 
export const getAllApi = async(currentPage, itemsPerPage, setData, setIsDeleted,token)=>{

  try{
    const res = await axios.get(`${baseUrl}/lens/apiPlan/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setData(res.data);
    console.log("the fetched data is ",res.data);
    setIsDeleted(false)
  
  }catch(err){
    console.log(err)
  }

} 


// delete One
export const deleteDetail = async (crId,data, setData, token) => {
  try {
    await axios.delete(`${baseUrl}/lens/apiPlan/delete?apiPlanId=${crId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const newData = data.filter(item => item.apiPlanDrfNumber !== crId);
    console.log("data is ",data)
    console.log("New data is ",newData)
    setData(newData);
  } catch (err) {
    console.log(err);
  }

}


export const searchFilter = async (startDate,endDate,branch,customerName,apiPlanDrfNumber,currentPage,itemsPerPage,setData, token) => {
  console.log("recieved Page number is",currentPage)
  const formattedStartDate = startDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;
  const formattedEndDate = endDate ? moment(startDate).format('YYYY-MM-DD HH:mm:ss') : null;

  if (formattedStartDate) {
    console.log("start date is", formattedStartDate);
  }
  if (formattedEndDate) {
    console.log("end date is", formattedEndDate);
  }

  try {
    let url = `${baseUrl}/lens/apiPlan/getAllApiPlanByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (apiPlanDrfNumber) url += `apiPlanDrfNumber=${apiPlanDrfNumber}&`;
    url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;

    console.log("URL:", url); // Log the constructed URL

    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = res;
    setData(data);
    console.log("response is", res);
  } catch (err) {
    console.log(err);
  }
}