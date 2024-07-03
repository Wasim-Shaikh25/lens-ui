import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getRotary, handleSubmit, handleUpdate } from '../../apis/RotaryApi';



export default function CreateRotatory() {

  const navigate = useNavigate();
  let {rjId} = useParams();


  const [formData, setFormData] = useState({
    branch: "",
    enquiryNumber: "",
    customerName: "",
    customerAddress: "",
    costingRequirement: true,
    equipment: "",
    make: "",
    model: "",
    fluid: "",
    operatingTemperature: "",
    operatingTemperatureUnit: "",
    flowRate: "",
    speed: "",
    operatingPressure: "",
    operatingPressureUnit: "",
    existingMake: "",
    existingModel: "",
    connectionType: "",
    connectionSize: "",
    flangeType: "",
    centerType: "",
    rotaryJointType: "",
    syphonPipeType: "",
    syphonPipeDiameter: ""
  });
  
  

   useEffect(()=>{
    if(rjId!==undefined){
     getRotary(rjId,setFormData);

    }else{
      setFormData(
        {
            branch: "",
            enquiryNumber: "",
            customerName: "",
            customerAddress: "",
            costingRequirement: true,
            equipment: "",
            make: "",
            model: "",
            fluid: "",
            operatingTemperature: "",
            operatingTemperatureUnit: "",
            flowRate: "",
            speed: "",
            operatingPressure: "",
            operatingPressureUnit: "",
            existingMake: "",
            existingModel: "",
            connectionType: "",
            connectionSize: "",
            flangeType: "",
            centerType: "",
            rotaryJointType: "",
            syphonPipeType: "",
            syphonPipeDiameter: ""
          })

    }
    
    
  },[rjId])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }



 
  return (
    <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
   {!rjId ? <h1 style={{ marginLeft: '20px' }}>New Rotary Joint :</h1> : <h1 style={{ marginLeft: '20px' }}>Update Rotary Joint :</h1>}


   <form >
     
        <div className='card'>
          <h3>Rotary Joint New Mode:-</h3>
          <Grid container spacing={2}>
            {rjId && <Grid item xs={4}>
              <InputLabel className="ip-label" >Rotatory Joint Drf Number</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="rotaryDrfNumber"
                value={formData.rotaryDrfNumber}
                onChange={handleChange} />
            </Grid>
            } 


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >branch</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="branch"
                value={formData.branch}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Enquiry Number</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="enquiryNumber"
                value={formData.enquiryNumber}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Customer</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange} />
            </Grid>



            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Customer Address</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange} />
            </Grid>


               

            <Grid item xs={4}>
              <InputLabel className="ip-label">Costing Requirement</InputLabel>
              <select
                className="text-field" style={{ width: "55%", padding: "10px" }}
                name="costingRequirement"
                value={formData.costingRequirement}
                onChange={handleChange}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </Grid> 

            </Grid>
            </div>



            <div className="card">
            <h3>Application Details :-</h3>
          <Grid container spacing={2}>
            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Equipment</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Make</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="make"
                value={formData.make}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Model</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="model"
                value={formData.model}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Fluid</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="fluid"
                value={formData.fluid}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Operating Temprature</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="operatingTemperature"
                value={formData.operatingTemperature}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Operating Temprature Unit</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="operatingTemperatureUnit"
                value={formData.operatingTemperatureUnit}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Flow Rate</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="flowRate"
                value={formData.flowRate}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Speed</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="speed"
                value={formData.speed}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Operating Pressure</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="operatingPressure"
                value={formData.operatingPressure}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Operating Pressure Unit</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="operatingPressureUnit"
                value={formData.operatingPressureUnit}
                onChange={handleChange} />
            </Grid>

            </Grid>
                </div>    


           <div className='card'>    
           <h3>Existing Rotary Joint Details</h3>

                      <Grid container spacing={2}>

            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Existing Make</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="existingMake"
                value={formData.existingMake}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Existing Model</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="existingModel"
                value={formData.existingModel}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Connection Type</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="connectionType"
                value={formData.connectionType}
                onChange={handleChange} />
            </Grid>
            

            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Connection Size</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="connectionSize"
                value={formData.connectionSize}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Flange Type</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="flangeType"
                value={formData.flangeType}
                onChange={handleChange} />
            </Grid>
            </Grid>
</div>

            <div className="card">
                <h3>Inlet Connection</h3>
            <Grid container spacing={2}>
            <Grid item xs={4}>      
                <InputLabel className="ip-label">Center Type</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="centerType"
                value={formData.centerType}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label">Rotary Joint Type</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="rotaryJointType"
                value={formData.rotaryJointType}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label">Syphon Pipe Type</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="syphonPipeType"
                value={formData.syphonPipeType}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label">Syphon Pipe Diameter</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="syphonPipeDiameter"
                value={formData.syphonPipeDiameter}
                onChange={handleChange} />
            </Grid>


            </Grid>
            </div>

          <Grid item xs={4}>
          <Grid item xs={4}>
        
        {!rjId ?( <Button className="submit-btn" type="submit" style={{margin:"20px"}} onClick ={(e)=>handleSubmit(e,formData,navigate)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" variant="contained" onClick={(e)=>handleUpdate(e,formData,rjId,navigate)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}



