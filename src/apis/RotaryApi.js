import axios from "axios";


 
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
      }
      catch(err){
        console.log(err)
      }

    
    rjId="";
    navigate(`/rotarySuccess/${formData.rotaryDrfNumber}`);
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

