import axios from "axios";
import moment from "moment";

 
//submit 
export const handleSubmit = async(e, formData, navigate, token) => {
    e.preventDefault();

      console.log("formData sales is ",formData);
      
      try{
          const res = await axios.post("http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/rotaryJoint/save", formData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        console.log("response is ",res.data);
        navigate(`/rotarySuccess/${res.data}`);
      }  
      catch(err){
        console.log(err)
      }

    // Add form submission logic here

  };



  //handle update
export const handleUpdate = async (e,formData,rjId,navigate, token)=>{
    e.preventDefault();
  
      
      try{
          const res = await axios.put("http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/rotaryJoint/update", formData, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("response from update is ",res.data);
          
          rjId="";
          navigate(`/rotarySuccess/${formData.rotaryDrfNumber}`);
      }
      catch(err){
        console.log(err)
      }

  }




    //getRotary
    export const getRotary = (rjId,setFormData, token)=>{
        axios.get(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/rotaryJoint/get?rotaryJointDrfNo=${rjId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
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

export const getAllRotary = (setData, setIsDeleted, token) =>{

    axios.get(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/rotaryJoint/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
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
export const deleteDetail = async (crId,data,setData, token) => {
    try {
      await axios.delete(`http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/rotaryJoint/delete?rotaryJointDrfNo=${crId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const newData = data.filter(item => item.rotaryDrfNumber !== crId);
      console.log("data is ",data)
      console.log("New data is ",newData)
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };



//Customer filter Search
export const searchFilter = async (startDate,endDate,branch,customerName,rotaryDrfNumber,currentPage,itemsPerPage,setData, token) => {
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
    let url = `http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/lens/rotaryJoint/getAllRotaryJointByFilter?`;
    if (startDate) url += `startDate=${formattedStartDate}&`;
    if (endDate) url += `endDate=${formattedEndDate}&`;
    if (branch) url += `branch=${branch}&`;
    if (customerName) url += `customerName=${customerName}&`;
    if (rotaryDrfNumber) url += `rotaryDrfNumber=${rotaryDrfNumber}&`;
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


