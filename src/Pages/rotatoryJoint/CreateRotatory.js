import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel, Autocomplete} from '@mui/material';
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
    <Container className="container">
   {/* <form > */}
        <div className='card'>
   {!rjId ? <h1>New Rotary Joint :</h1> : <h1>Update Rotary Joint :</h1>}
          <h3>Rotary Joint New Mode:-</h3>
          <Grid container spacing={2}>
            {rjId && <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Rotatory Joint Drf Number</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="rotaryDrfNumber"
                InputLabelProps={{
                  shrink: Boolean(formData.rotaryDrfNumber),
                }}
                autoFocus={!formData.rotaryDrfNumber}
                value={formData.rotaryDrfNumber}
                label="Rotatory Joint Drf Number"
                onChange={handleChange} />
            </Grid>
            } 

<Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >branch</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                label="branch"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Enquiry Number</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="enquiryNumber"
                value={formData.enquiryNumber}
                onChange={handleChange} 
                label="Enquiry Number"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Customer</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange} 
                label="Customer"
                />
            </Grid>



            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Customer Address</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange} 
                label="Customer Address"
                />
            </Grid>


               

            <Grid item xs={4}>
  <Autocomplete
    size="small"
    value={formData.costingRequirement || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        costingRequirement: newValue || ''
      });
    }}

    inputValue={formData.costingRequirement || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        costingRequirement: newInputValue || ''
      });
    }}

    options={["true","false"].map((src) => src)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        variant="outlined"
        placeholder='select Costing Requirement'
        fullWidth
        className='custom-text-field'
        label="Costing Requirement"
      />
    )}
  />
  </Grid>

            </Grid>
            </div>



            <div className="card">
            <h3>Application Details :-</h3>
          <Grid container spacing={2}>
            <Grid item xs={4}>     

                {/* <InputLabel className="ip-label" >Equipment</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="equipment"
                value={formData.equipment}
                onChange={handleChange}
                label="Equipment"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Make</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="make"
                value={formData.make}
                onChange={handleChange} 
                label="Make"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Model</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="model"
                value={formData.model}
                onChange={handleChange} 
                label="Model"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Fluid</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="fluid"
                value={formData.fluid}
                onChange={handleChange} 
                label="Fluid"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Operating Temprature</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="operatingTemperature"
                value={formData.operatingTemperature}
                onChange={handleChange}
                label="Operating Temprature"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Operating Temprature Unit</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="operatingTemperatureUnit"
                value={formData.operatingTemperatureUnit}
                onChange={handleChange} 
                label="Operating Temprature Unit"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Flow Rate</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="flowRate"
                value={formData.flowRate}
                onChange={handleChange} 
                label="Flow Rate"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Speed</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="speed"
                value={formData.speed}
                onChange={handleChange} 
                label="Speed"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Operating Pressure</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="operatingPressure"
                value={formData.operatingPressure}
                onChange={handleChange} 
                label="Operating Pressure"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Operating Pressure Unit</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="operatingPressureUnit"
                value={formData.operatingPressureUnit}
                onChange={handleChange} 
                label="Operating Pressure Unit"
                />
            </Grid>

            </Grid>
                </div>    


           <div className='card'>    
           <h3>Existing Rotary Joint Details</h3>

                      <Grid container spacing={2}>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Existing Make</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="existingMake"
                value={formData.existingMake}
                onChange={handleChange} 
                label="Existing Make"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Existing Model</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="existingModel"
                value={formData.existingModel}
                onChange={handleChange} 
                label="Existing Model"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Connection Type</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="connectionType"
                value={formData.connectionType}
                onChange={handleChange} 
                label="Connection Type"
                />
            </Grid>
            

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Connection Size</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="connectionSize"
                value={formData.connectionSize}
                onChange={handleChange} 
                label="Connection Size"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label" >Flange Type</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="flangeType"
                value={formData.flangeType}
                onChange={handleChange} 
                label="Flange Type"
                />
            </Grid>
            </Grid>
</div>

            <div className="card">
                <h3>Inlet Connection</h3>
            <Grid container spacing={2}>
            <Grid item xs={4}>  

                {/* <InputLabel className="ip-label">Center Type</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="centerType"
                value={formData.centerType}
                onChange={handleChange} 
                label="Center Type"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Rotary Joint Type</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="rotaryJointType"
                value={formData.rotaryJointType}
                onChange={handleChange} 
                label="Rotary Joint Type"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Syphon Pipe Type</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="syphonPipeType"
                value={formData.syphonPipeType}
                onChange={handleChange} 
                label="Syphon Pipe Type"
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Syphon Pipe Diameter</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="syphonPipeDiameter"
                value={formData.syphonPipeDiameter}
                onChange={handleChange} 
                label="Syphon Pipe Diameter"
                />
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
      {/* </form> */}
    </Container>
  );

}



