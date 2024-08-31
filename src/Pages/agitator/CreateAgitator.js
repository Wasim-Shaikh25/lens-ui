import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
import '../../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, handleSubmit, handleUpdate } from '../../apis/AgitatorApi';



export default function AgitatorSeal() {

  const navigate = useNavigate();
  let {aId} = useParams();


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
            <h3>Agitator Seal:-</h3>
            <Grid container spacing={2}>
              {aId &&
                <Grid item xs={4}>
                  <InputLabel className="ip-label">Agitator Drf Number</InputLabel>
                  <TextField
                  size="small"
                    className="text-field"
                    name="agitatorSealDrfNumber"
                    value={formData.agitatorSealDrfNumber}
                    onChange={handleChange} />
                </Grid>
              }
              <Grid item xs={4}>
                <InputLabel className="ip-label">Branch</InputLabel>
                <TextField
                size="small"
                  className="text-field"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="ip-label">Customer</InputLabel>
                <TextField
                size="small"
                  className="text-field"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="ip-label">Customer Address</InputLabel>
                <TextField
                size="small"
                  className="text-field"
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
                />
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


         {/*  General  */}
          <div className="card">
             <h3>General</h3>
            <Grid container spacing={2}>
              <Grid item xs={4}>      
                  <InputLabel className="ip-label" >Ref Dwg No</InputLabel >
                <TextField
                size="small"
                  className="text-field"
                  name="refDrawingNumber"
                  value={formData.refDrawingNumber}
                  onChange={handleChange} />
              </Grid>
   </Grid>
</div>
    


       
      {/* Agitator Data */}

        <div className="card">
           <h3>Agitator Data</h3>
          <Grid container spacing={2}>
            <Grid item xs={4}>      
                <InputLabel className="ip-label" >Make</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="make"
                value={formData.make}
                onChange={handleChange} />
            </Grid>

  {/* Existing text fields (replace with your previous code) */}
  <Grid item xs={4}>
    <InputLabel className="ip-label">Model</InputLabel>
    <TextField
    size="small"
      className="text-field"
      name="model"
      value={formData.model}
      onChange={handleChange}
    />
  </Grid>

  <Grid item xs={4}>
    <InputLabel className="ip-label">Tag No</InputLabel>
    <TextField
    size="small"
      className="text-field"
      name="tagNo"
      value={formData.tagNo}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    <InputLabel className="ip-label">Entry</InputLabel>
    <TextField
    size="small"
      className="text-field"
      name="entry"
      value={formData.entry}
      onChange={handleChange}
    />
  </Grid>
 </Grid>
</div>    

{/*  Opration Parameter*/}

          <div className="card">
            <h3>Operation Parameters</h3>
            <Grid container spacing={2}>
            <Grid item xs={4}>      
                <InputLabel className="ip-label">percentage of soil</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="percentageOfSolid"
                value={formData.percentageOfSolid}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label">Proposed Seal Series</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="proposedSealSeries"
                value={formData.proposedSealSeries}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>      
                <InputLabel className="ip-label">Propsed Seal Size</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="proposedSealSize"
                value={formData.proposedSealSize}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>      
                <InputLabel className="ip-label">Pad Plate</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="padPlate"
                value={formData.padPlate}
                onChange={handleChange} />
            </Grid>

            </Grid>
            </div>


            
{/* MOC*/}

          <div className="card">
            <h3>MOC</h3>
            <Grid container spacing={2}>
            <Grid item xs={4}>
            <InputLabel className="ip-label">Temprature</InputLabel>
            <TextField
            size="small"
              className="text-field"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel className="ip-label">Speed</InputLabel>
            <TextField
            size="small"
              className="text-field"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel className="ip-label">Vessel Designer PR</InputLabel>
            <TextField
            size="small"
              className="text-field"
              name="vesselDesignPR"
              value={formData.vesselDesignPR}
              onChange={handleChange}
            />
          </Grid>
   
    <Grid item xs={4}>
    <InputLabel className="ip-label">Vessel Design Temperature</InputLabel>
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="text-field"
      name="vesselDesignTemperature"
      value={formData.vesselDesignTemperature}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    <InputLabel className="ip-label">Vessel Operating PR</InputLabel>
    <TextField
    size="small" // Consider using number input type
      className="text-field"
      name="vesselOperatingPR"
      value={formData.vesselOperatingPR}
      onChange={handleChange}
      type="number" // Optional: number input type for area values
    />
  </Grid>
  <Grid item xs={4}>
    <InputLabel className="ip-label">Vessel Operating Temperature</InputLabel>
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="text-field"
      name="vesselOperatingTemperature"
      value={formData.vesselOperatingTemperature}
      onChange={handleChange}
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



