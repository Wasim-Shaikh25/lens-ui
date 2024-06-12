import axios from "axios";
import moment from "moment";

 
//submit 
export const handleSubmit = async(e, formData, navigate) => {
    e.preventDefault();

      console.log("formData sales is ",formData);
      
      try{
          const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/save", formData);
        console.log("response is ",res.data);
        navigate(`/rotarySuccess/${res.data}`);
      }  
      catch(err){
        console.log(err)
      }

    // Add form submission logic here

  };



  //handle update
export const handleUpdate = async (e,formData,rjId,navigate)=>{
    e.preventDefault();
  
      
      try{
          const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/update", formData);
          console.log("response from update is ",res.data);
          
          rjId="";
          navigate(`/rotarySuccess/${formData.rotaryDrfNumber}`);
      }
      catch(err){
        console.log(err)
      }

  }




    //getRotary
    export const getRotary = (rjId,setFormData)=>{
        axios.get(`https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/get?rotaryJointDrfNo=${rjId}`)
        .then(res=>{
          const {data} = res;
            setFormData(data);
            console.log("the rjId fetched data is ",data)
  
        }) 
        .catch(err=>{
          console.log(err)
        })


    }



  //get All Rotary

export const getAllRotary = (setData, setIsDeleted) =>{

    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/getAll`)
    .then(res => {
      setData(res.data);
      console.log("the fetched data is ",res.data);
      setIsDeleted(false)
    })
    .catch((err)=>{
      console.log(err)
    })

}


// delete
export const deleteDetail = async (crId,data,setData) => {
    try {
      await axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/delete?rotaryJointDrfNo=${crId}`);
      const newData = data.filter(item => item.rotaryDrfNumber !== crId);
      console.log("data is ",data)
      console.log("New data is ",newData)
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };



//Customer filter Search
export const searchFilter = async (startDate,endDate,branch,customerName,rotaryDrfNumber,currentPage,itemsPerPage,setData) => {
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
    let url = `https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/getAllRotaryJointByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (rotaryDrfNumber) url += `rotaryDrfNumber=${rotaryDrfNumber}&`;
    url += `pageNo=${currentPage}&pageSize=${itemsPerPage}`;

    console.log("URL:", url); // Log the constructed URL

    const res = await axios.get(url);
    const { data } = res;
    setData(data);
    console.log("response is", res);
  } catch (err) {
    console.log(err);
  }
}


