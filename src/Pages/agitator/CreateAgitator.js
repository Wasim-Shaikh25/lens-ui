import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton, Autocomplete } from '@mui/material';
import '../../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, handleSubmit, handleUpdate } from '../../apis/AgitatorApi';



export default function AgitatorSeal() {

  const navigate = useNavigate();
  let {aId} = useParams();
  const costReq = ['Yes', 'No'];


  const [formData, setFormData] = useState({
    branch: "",
    customerName: "",
    customerAddress: "",
    costingRequirement: true,
    enquiryNumber: "",
    refDrawingNumber: "",
    make: "",
    model: "",
    tagNo: "",
    type: "",
    entry: "",
    existingMake: "",
    existingSeries: "",
    existingPerformance: "",
    proposedSealSeries: "",
    proposedSealSize: "",
    vesselOperatingPR: "",
    vesselDesignPR: "",
    speed: "",
    temperature: "",
    directionOfRotation: "",
    vesselOperatingTemperature: "",
    padPlate: "",
    vesselDesignTemperature: "",
    fluid: "",
    fluidTemperature: "",
    boilPoint: "",
    grainSize: "",
    nature: "",
    spGravity: "",
    viscosity: "",
    percentageOfSolid: "",
    freezePoint: "",
    description: ""
  });
  
  

   useEffect(()=>{
    if(aId!==undefined){
      getApi(aId,setFormData)

    }else{
      setFormData(
        {
            // Agitator seal
            branch: "",
            customerName: "",
            customerAddress: "",
            costingRequirement: false,
            enquiryNumber: "",

            // General
            refDrawingNumber: "",

        // Agitor data
            make: "",
            model: "",
            tagNo: "",
            type: "",
            entry: "",

            // Not found 
            existingMake: "",
            existingSeries: "",
            existingPerformance: "",
            proposedSealSeries: "",
            proposedSealSize: "",
            vesselOperatingPR: "",
            vesselDesignPR: "",

            
            speed: "",
            temperature: "",
            directionOfRotation: "",
            vesselOperatingTemperature: "",
            padPlate: "",
            vesselDesignTemperature: "",
            fluid: "",
            fluidTemperature: "",
            boilPoint: "",
            grainSize: "",
            nature: "",
            spGravity: "",
            viscosity: "",
            percentageOfSolid: "",
            freezePoint: "",
            description: ""
              
          })
    } 
  },[aId])



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
        <form >
          <div className='card'>
        {!aId ? <h1 >Agitator Seal</h1> : <h1>Update Agitator Seal :</h1>}
            {/* <h3>Agitator Seal:-</h3> */}
            <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Agitator Seal:-</div></div>
            <Grid container spacing={2}>
              {aId &&
                <Grid item xs={4}>
                  {/* <InputLabel className="ip-label">Agitator Drf Number</InputLabel> */}
                  <TextField
                    size="small"
                    className="custom-text-field"
                    name="agitatorSealDrfNumber"
                    value={formData.agitatorSealDrfNumber}
                    onChange={handleChange}
                    label="Agitator Drf Number"
                    />
                </Grid>
              }
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Branch</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  label="Branch"
                />
              </Grid>
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Customer</InputLabel> */}
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
                {/* <InputLabel className="ip-label">Customer Address</InputLabel> */}
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
              {/* <InputLabel className="ip-label">Costing Requirement</InputLabel> */}
              {/* <select
                className="custom-text-field" style={{ width: "55%", padding: "10px" }}
                name="costingRequirement"
                value={formData.costingRequirement}
                onChange={handleChange}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select> */}

<Autocomplete
 sx={{
  width: '78%',
  '.MuiAutocomplete-inputRoot': {
    minHeight: '30px',                // Control height of the input root
    padding: '0px',                   // Remove internal padding
  },
  '.MuiInputBase-input': {
    minHeight: '30px',                // Control height of the outlined input
    padding: '0px',  
  },
  '.MuiFormLabel-root': {
    fontSize: '0.75rem',              // Default font size of the label
    top: '50%',                       // Default vertical position
    left: '8px',                      // Default horizontal position
    transform: 'translateY(-50%)',   // Center vertically
    transition: 'all 0.3s ease',      // Smooth transition for positioning and font size
  },
  '.MuiFormLabel-root.Mui-focused': {
    top: '-9px',                     // Position when focused
    left: '13px',                      // Horizontal position remains the same
    fontSize: '0.65rem',              // Shrink the font size when focused
    transform: 'translateY(0)',      // Remove vertical transform when focused
    // borderBottom:'0.5px solid transparent'
  },

  // '.MuiFormLabel-root.MuiInputLabelShrink': {
  //   top: '-10px',                     // Ensure label is on top when shrunk
  //   left: '8px',                      // Horizontal position remains the same
  //   fontSize: '0.5rem',              // Shrink font size when label is shrunk
  //   // transform: 'translateY(0)',      // Remove vertical transform
  // },
}}

  value={formData.costingRequirement}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      costingRequirement: newValue
    });
  }}
  

  inputValue={formData.costingRequirement || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      costingRequirement:newInputValue
    });
  }}
  options={costReq}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      variant="outlined"
      fullWidth
      className='custom-text-field'
      label="Costing Requirement"
      InputLabelProps={{
        shrink: Boolean(formData.customerReferenceNumber),
      }}
      autoFocus={!!formData.customerReferenceNumber} // Autofocus if the value exists
    />
  )}
/>

            </Grid> 

            </Grid>
          </div>

          

         {/*  General  */}
          <div className="card">
             {/* <h3>General</h3> */}
             <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">General:-</div></div>
            <Grid container spacing={2}>
              <Grid item xs={4}>      
                  {/* <InputLabel className="ip-label" >Ref Dwg No</InputLabel > */}
                <TextField
                size="small"
                  className="custom-text-field"
                  name="refDrawingNumber"
                  value={formData.refDrawingNumber}
                  onChange={handleChange}
                   label="Ref Dwg No" 
                  />
              </Grid>
   </Grid>
</div>
    


       
      {/* Agitator Data */}

        <div className="card">
           {/* <h3>Agitator Data</h3> */}
           <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Agitator Data:-</div></div>
           
          <Grid container spacing={2}>
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

  {/* Existing text fields (replace with your previous code) */}
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Model</InputLabel> */}
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
    {/* <InputLabel className="ip-label">Tag No</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      name="tagNo"
      value={formData.tagNo}
      onChange={handleChange}
      label="Tag No"
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Entry</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      name="entry"
      value={formData.entry}
      onChange={handleChange}
      label="Entry"
    />
  </Grid>
 </Grid>
</div>    

{/*  Opration Parameter*/}

          <div className="card">
            {/* <h3>Operation Parameters</h3> */}
            <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Operation Parameters:-</div></div>
            <Grid container spacing={2}>
            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">percentage of soil</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="percentageOfSolid"
                value={formData.percentageOfSolid}
                onChange={handleChange}
                label="percentage of soil"
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Proposed Seal Series</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="proposedSealSeries"
                value={formData.proposedSealSeries}
                onChange={handleChange}
                 label="Proposed Seal Series" 
                />
            </Grid>

            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Propsed Seal Size</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="proposedSealSize"
                value={formData.proposedSealSize}
                onChange={handleChange}
                 label="Propsed Seal Size" 
                />
            </Grid>


            <Grid item xs={4}>      
                {/* <InputLabel className="ip-label">Pad Plate</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="padPlate"
                value={formData.padPlate}
                onChange={handleChange} 
                 label="Pad Plate" 
                />
            </Grid>

            </Grid>
            </div>


            
{/* MOC*/}

          <div className="card">
            {/* <h3>MOC</h3> */}
            <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">MOC:-</div></div>
            <Grid container spacing={2}>
            <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Temprature</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              label="Temprature"
            />
          </Grid>
          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Speed</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              label="Speeed"
            />
          </Grid>
          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Vessel Designer PR</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              name="vesselDesignPR"
              value={formData.vesselDesignPR}
              onChange={handleChange}
              label="Vessel Designer PR"
            />
          </Grid>
   
    <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Vessel Design Temperature</InputLabel> */}
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="custom-text-field"
      name="vesselDesignTemperature"
      value={formData.vesselDesignTemperature}
      onChange={handleChange}
      label="Vessel Design Temperature"
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Vessel Operating PR</InputLabel> */}
    <TextField
    size="small" // Consider using number input type
      className="custom-text-field"
      name="vesselOperatingPR"
      value={formData.vesselOperatingPR}
      onChange={handleChange}
      type="number" // Optional: number input type for area values
      label="Vessel Operating PR"
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Vessel Operating Temperature</InputLabel> */}
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="custom-text-field"
      name="vesselOperatingTemperature"
      value={formData.vesselOperatingTemperature}
      onChange={handleChange}
      label="Vessel Operating Temperature"
    />
  </Grid>

      </Grid>
      </div>

          <Grid item xs={4}>
          <Grid item xs={4}>
        
        {!aId ?( <Button className="submit-btn" type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" variant="contained" onClick={(e)=>handleUpdate(e,formData,navigate,aId)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}



