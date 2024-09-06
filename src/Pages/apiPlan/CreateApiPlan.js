import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel, Autocomplete } from '@mui/material';
import { getApi, handleSubmit } from '../../apis/ApiPlan';
import { useNavigate, useParams } from 'react-router-dom';
import { handleUpdate } from '../../apis/ApiPlan';


export default function CreateApi() {

  const navigate = useNavigate();
  let {apId} = useParams();

 
  const [formData, setFormData] = useState({
        branch: "",
        customer: "",
        customerAddress: "",
        costingRequirement: true,
        type: "",
        make: "",
        model: "",
        tagNumber: "",
        arrangement: "",
        maxDynamicSealingPressure: "",
        maxStaticSealingPressure: "",
        mechanicalSealMake: "",
        mechanicalSealSeries: "",
        connectionSize: "",
        connectionSizeUnit: "",
        drawingNumber: "",
        shaftSize: "",
        shaftSizeUnit: "",
        rotation: "",
        dischargePressure: "",
        mawp: "",
        speed: "",
        boxPressure: "",
        mawt: "",
        suctionPressure: "",
        vesselPressure: "",
        existingMake: "",
        existingApiPlan: "",
        existingCapacity: "",
        shell: "",
        coolingCoil: "",
        bladder: "",
        heatExchangerType: "",
        heatExchangerArea: "",
        standard: "",
        apiPlanDrawingNumber: "",
        lpApiPlan: "",
        lpCapacity: "",
        lpCapacityUnit: "",
        lpShell: "",
        lpCoolingCoil: "",
        lpBladder: "",
        lpHeatExchangerType: "",
        lpHeatExchangerArea: "",
        lpStandard: "",
        operatingFluid: "",
        allTempPressureUnit: "",
        nature: "",
        operatingTemperature: "",
        minOperatingTemperature: "",
        spGravity: "",
        freezePoint: "",
        boilPoint: "",
        viscosity: "",
        viscosityUnit: "",
        percentageOfSolid: "",
        grainPoint: "",
        description: ""
  });
  
  

   useEffect(()=>{
    if(apId!==undefined){
    getApi(apId,setFormData);

    }else{
      setFormData(
        {
            // Api Plane
                branch: "",
                customer: "",
                customerAddress: "",
                costingRequirement: true,

//  Equipment details
                type: "",
                make: "",
                model: "",
                tagNumber: "",
                arrangement: "",
                maxDynamicSealingPressure: "",
                maxStaticSealingPressure: "",
  
        // Machnical Seal Data
                mechanicalSealMake: "",
                mechanicalSealSeries: "",
                connectionSize: "",
                connectionSizeUnit: "",
                drawingNumber: "",
                shaftSize: "",

               //no section found in prinout 
                shaftSizeUnit: "",

                //  Operation Seal Data
                rotation: "",
                dischargePressure: "",
                mawp: "",
                speed: "",
                boxPressure: "",
                mawt: "",
                suctionPressure: "",
                vesselPressure: "",
                
                //no section found in prinout 
                existingMake: "",
                existingApiPlan: "",
                existingCapacity: "",

// moc
                shell: "",
                coolingCoil: "",
                bladder: "",

// Moc sub_part
                heatExchangerType: "",
                heatExchangerArea: "",
                standard: "",

  //  No section avaiable in printout
                apiPlanDrawingNumber: "",
                lpApiPlan: "",
                lpCapacity: "",
                lpCapacityUnit: "",
                lpShell: "",
                lpCoolingCoil: "",
                lpBladder: "",
                lpHeatExchangerType: "",
                lpHeatExchangerArea: "",
                lpStandard: "",
                operatingFluid: "",
                allTempPressureUnit: "",
                nature: "",
                
                operatingTemperature: "",
                minOperatingTemperature: "",
                spGravity: "",
                freezePoint: "",
                boilPoint: "",
                viscosity: "",
                viscosityUnit: "",
                percentageOfSolid: "",
                grainPoint: "",
                description: ""
              
              
          })
    }
    
    
  },[apId])



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
      <Container className="container" sx={{ marginTop: "20px", backgroundColor: "rgb(250, 251, 251)" }}>
        <form onSubmit={handleSubmit} >
          <div className='card'>
        {!apId ? <h1>Create API Plan :</h1> : <h1>Update Api Plan :</h1>}
            <h3>API Plan:-</h3>
            <Grid container spacing={2}>
              {apId &&
                <Grid item xs={4}>
                  {/* <InputLabel className="ip-label">API Plan Drf Number</InputLabel> */}
                  <TextField
                  size="small"
                    className="custom-text-field"
                    label='API Plan Drf Number'
                    name="apiPlanDrfNumber"
                    value={formData?.apiPlanDrfNumber}
                    onChange={handleChange} />
                </Grid>
              }
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Branch</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  label='Branch'
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Customer</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  label='Customer'
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Customer Address</InputLabel> */}
                <TextField
                size="small"
                  className="custom-text-field"
                  label='Customer Address'
                  name="customerAddress"
                  value={formData.customerAddress}
                  onChange={handleChange}
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



         {/*  Equipment Deatails  */}
          <div className="card">
             <h3>Equipment Details</h3>
            <Grid container spacing={2}>
              <Grid item xs={4}>      
                  {/* <InputLabel className="ip-label" >Existing Make</InputLabel > */}
                <TextField
                size="small"
                  className="custom-text-field"
                  label='Existing Make'
                  name="existingMake"
                  value={formData.existingMake}
                  onChange={handleChange} />
              </Grid>

              <Grid item xs={4}>
                {/* <InputLabel className="ip-label">Type</InputLabel> */}
                <TextField
                size="small" // Consider using Dropdown for options if applicable
                  className="custom-text-field"
                  label='Type'
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                />
             </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Make</InputLabel> */}
              <TextField
              size="small"
                className="custom-text-field"
                label='Make'
                name="make"
                value={formData.make}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Model</InputLabel> */}
              <TextField
              size="small"
                className="custom-text-field"
                label='Model'
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Tag Number</InputLabel> */}
              <TextField
              size="small"
                className="custom-text-field"
                label='Tag Number'
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Arrangement</InputLabel> */}
              <TextField
              size="small"
                className="custom-text-field"
                label='Arrangement'
                name="arrangement"
                value={formData.arrangement}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Max Dynamic Sealing Pressure</InputLabel> */}
              <TextField
              size="small" // Consider using number input type
                className="custom-text-field"
                label='Max Dynamic Sealing Pressure'
                name="maxDynamicSealingPressure"
                value={formData.maxDynamicSealingPressure}
                onChange={handleChange}
                type="number" // Optional: number input type for pressure values
              />
            </Grid>
            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Max Static Sealing Pressure</InputLabel> */}
              <TextField
              size="small" // Consider using number input type
                className="custom-text-field"
                label='Max Static Sealing Pressure'
                name="maxStaticSealingPressure"
                value={formData.maxStaticSealingPressure}
                onChange={handleChange}
                type="number" // Optional: number input type for pressure values
              />
            </Grid>

     
         </Grid>
     </div>
    


       
      {/* Machnical Seal Data */}
        <div className="card">
           <h3>Mechanical Seal Data</h3>
          <Grid container spacing={2}>

  {/* Existing text fields (replace with your previous code) */}
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Mechanical Seal Make</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      label='Mechanical Seal Make'
      name="mechanicalSealMake"
      value={formData.mechanicalSealMake}
      onChange={handleChange}
    />
  </Grid>

  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Mechanical Seal Series</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      label='Mechanical Seal Series'
      name="mechanicalSealSeries"
      value={formData.mechanicalSealSeries}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Connection Size</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      label='Connection Size'
      name="connectionSize"
      value={formData.connectionSize}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Connection Size Unit</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      label='Connection Size Unit'
      name="connectionSizeUnit"
      value={formData.connectionSizeUnit}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Drawing Number</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      label='Drawing Number'
      name="drawingNumber"
      value={formData.drawingNumber}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Shaft Size</InputLabel> */}
    <TextField
    size="small"
      className="custom-text-field"
      label='Shaft Size'
      name="shaftSize"
      value={formData.shaftSize}
      onChange={handleChange}
    />
  </Grid>
</Grid>

</div>    

{/*  Opration Parameter*/}




            
{/* MOC*/}

          <div className="card">
            <h3>MOC</h3>
            <Grid container spacing={2}>
            <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Shell</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              label='Shell'
              name="shell"
              value={formData.shell}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Cooling Coil</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              label='Cooling Coil'
              name="coolingCoil"
              value={formData.coolingCoil}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Bladder</InputLabel> */}
            <TextField
            size="small"
              className="custom-text-field"
              label='Bladder'
              name="bladder"
              value={formData.bladder}
              onChange={handleChange}
            />
          </Grid>
   
    <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Heat Exchanger Type</InputLabel> */}
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="custom-text-field"
      label='Heat Exchanger Type'
      name="heatExchangerType"
      value={formData.heatExchangerType}
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Heat Exchanger Area</InputLabel> */}
    <TextField
    size="small" // Consider using number input type
      className="custom-text-field"
      label='Heat Exchanger Area'
      name="heatExchangerArea"
      value={formData.heatExchangerArea}
      onChange={handleChange}
      type="number" // Optional: number input type for area values
    />
  </Grid>
  <Grid item xs={4}>
    {/* <InputLabel className="ip-label">Standard</InputLabel> */}
    <TextField
    size="small" // Consider using Dropdown for options if applicable
      className="custom-text-field"
      label='Standard'
      name="standard"
      value={formData.standard}
      onChange={handleChange}
    />
  </Grid>

      </Grid>
      </div>

          <Grid item xs={4} style={{marginLeft:"1rem",marginBottom:'1rem'}}>
          <Grid item xs={4}>
        
        {!apId ?( <Button className="submit-btn" type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" variant="contained" onClick={(e)=>handleUpdate(e, formData, apId, navigate)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}



