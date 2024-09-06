import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, InputLabel, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { getPumpSeal, handleSubmit } from '../../apis/PumpSealApi';
import { handleUpdatePumpSeal } from '../../apis/PumpSealApi';
import { getColumnData } from '../../apis/PumpSealApi';


export default function CreatePumpSeal() {


  const navigate = useNavigate();
  let { pId } = useParams();
  const [ptOption, setptOption] = useState([]);
  const [arOption, setarOption] = useState([]);
  const [saOption, setsaOption] = useState([]);
  const [stOption, setstOption] = useState([]);
  const [stgOption, setstgOption] = useState([]);
  const [cstOption, setcstOption] = useState([]);
  const [pfOption, setpfOption] = useState([]);
  const [fnOption, setfnOption] = useState([]);



  const [formData, setFormData] = useState({
    branch: '',
    endUser: '',
    costingRequirement: '',
    customerAddress: '',
    customerName:'',
    make: '',
    model: '',
    impeller: '',
    shaft: '',
    sealChamber: '',
    bearingBracket: '',
    tagNumber: '',
    arrangement: '',
    pumpType: '',
    stuffingBox: '',
    stage: '',
    casting: '',
    series: '',
    sealArrangement: '',
    sealType: '',
    performance: '',
    flushPlan: '',
    barrierOrBufferPlan: '',
    quenchPlan: '',
    barrierOrBufferFluid: '',
    designOffered: '',
    sizeAvailable: '',
    materialCode: '',
    sealSeries: '',
    shaftSize: '',
    boreDia: '',
    boreDepth: '',
    nearestObstruction: '',
    allPressureUnit: '',
    totalHeat: '',
    suctionPressure: '',
    dischargePressure: '',
    directionOfRotation: '',
    speed: '',
    boxPressure: '',
    operatingFluid: '',
    allTempPressureUnit: '',
    nature: '',
    operatingTemperature: '',
    minOperatingTemperature: '',
    spGravity: '',
    freezePoint: '',
    boilPoint: '',
    viscosity: '',
    viscosityUnit: '',
    percentageOfSolid: '',
    grainPoint: '',
    description: '',
    d1SleeveOd: '',
    studHoles: '',
    d2StuffingBoxId: '',
    d4StuffingBoxBore: '',
    d5SpigotDia: '',
    d51: '',
    d52: '',
    d9BoltCircle: '',
    boltSize: '',
    l11: '',
    l12: '',
    l1SleeveExten: '',
    l2ShaftHub: '',
    l3ThreadLength: '',
    l8sbDepth: '',
    l9NearObstr: '',
    alpha: '',
    beta: '',
    theta: '',
    createdByUserGUID: '',
    lastEditedByUserGUID: '',
    rowguid: '',
    region: '',
    address: '',
    emailId: '',
    srNo: '',
    dshaftOd: '',
    sboxCover: '',
    mnumberOfBolts: '',
    lraisedCol: ''
  });



  useEffect(() => {
    if (pId !== undefined) {
      getPumpSeal(pId, setFormData)

    } else {
      setFormData(
        {
          branch: '',
          endUser: '',
          costingRequirement: '',
          customerName: '',
          customerAddress: '',
          make: '',
          model: '',
          impeller: '',
          shaft: '',
          sealChamber: '',
          bearingBracket: '',
          tagNumber: '',
          arrangement: '',
          pumpType: '',
          stuffingBox: '',
          stage: '',
          casting: '',
          series: '',
          sealArrangement: '',
          sealType: '',
          performance: '',
          flushPlan: '',
          barrierOrBufferPlan: '',
          quenchPlan: '',
          barrierOrBufferFluid: '',
          designOffered: '',
          sizeAvailable: '',
          materialCode: '',
          sealSeries: '',
          shaftSize: '',
          boreDia: '',
          boreDepth: '',
          nearestObstruction: '',
          allPressureUnit: '',
          totalHeat: '',
          suctionPressure: '',
          dischargePressure: '',
          directionOfRotation: '',
          speed: '',
          boxPressure: '',
          operatingFluid: '',
          allTempPressureUnit: '',
          nature: '',
          operatingTemperature: '',
          minOperatingTemperature: '',
          spGravity: '',
          freezePoint: '',
          boilPoint: '',
          viscosity: '',
          viscosityUnit: '',
          percentageOfSolid: '',
          grainPoint: '',
          description: '',
          d1SleeveOd: '',
          studHoles: '',
          d2StuffingBoxId: '',
          d4StuffingBoxBore: '',
          d5SpigotDia: '',
          d51: '',
          d52: '',
          d9BoltCircle: '',
          boltSize: '',
          l11: '',
          l12: '',
          l1SleeveExten: '',
          l2ShaftHub: '',
          l3ThreadLength: '',
          l8sbDepth: '',
          l9NearObstr: '',
          alpha: '',
          beta: '',
          theta: '',
          createdByUserGUID: '',
          lastEditedByUserGUID: '',
          rowguid: '',
          region: '',
          address: '',
          emailId: '',
          srNo: '',
          dshaftOd: '',
          sboxCover: '',
          mnumberOfBolts: '',
          lraisedCol: ''
        })

    }


  }, [pId])




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const cancelUpdate = () => {

    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    // If user confirms, navigate to the home page and reload the window
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  }




  return (

    <Container className="container">
      <form  className="">
        <div className='card'>
      {!pId ? <h1 >New Pump Seal :</h1> : <h1>Update Pump Seal :</h1>}


          {/* <h3>Drawing Requisition - Pump Seal :-</h3> */}
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Drawing Requisition - Pump Seal :-</div></div>
          <hr />
          <Grid container spacing={2}>
            {pId && <Grid item xs={4}>
              <InputLabel className="ip-label" >PumpSeal Drf Number</InputLabel >
              <TextField
              size="small"
                className="custom-text-field"
                name="pumpSealDrfNumber"
                InputLabelProps={{
                  shrink: Boolean(formData.pumpSealDrfNumber),
                }}
                autoFocus={!formData.pumpSealDrfNumber}
                value={formData.pumpSealDrfNumber}
                onChange={handleChange} />
            </Grid>
            }

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Branch</InputLabel > */}
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
              {/* <InputLabel className="ip-label" >Name</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange} 
                label="Name"
                />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >endUser</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="endUser"
                value={formData.endUser}
                onChange={handleChange} 
                label="endUser"
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


        <div className='card'>
          <h3>Pump Data :-</h3>
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
              {/* <InputLabel className="ip-label" >Bearing BKT</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="bearingBracket"
                value={formData.bearingBracket}
                onChange={handleChange} 
                label="Bearing BKT"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Impeller</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="impeller"
                value={formData.impeller}
                onChange={handleChange}
                label="Impeller"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Shaft</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="shaft"
                value={formData.shaft}
                onChange={handleChange} 
                label="Shaft"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Seal Chamber</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="sealChamber"
                value={formData.sealChamber}
                onChange={handleChange} 
                label="Seal Chamber"
                />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Tag Number</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange}
                label="Tag Number"
                />
            </Grid>

            <Grid item xs={4}>
              
{/* <InputLabel className="ip-label" >Arrangement</InputLabel > */}

<Autocomplete style={{width:'100%'}}
size="small"
  value={formData.arrangement}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      arrangement: newValue
    });
  }}
  onFocus={()=>getColumnData('Arrangement', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.arrangement || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      arrangement:newInputValue
    });
  }}
  options={arOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Arrangement"
      variant="outlined"
      className='custom-text-field'
      fullWidth
      label="Arrangement"
    />
  )}
/>
            </Grid>




            <Grid item xs={4}>
<Autocomplete style={{width:'100%'}}
size="small"
  value={formData.pumpType}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      pumpType: newValue
    });
  }}
  onFocus={()=>getColumnData('Pump Type', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.pumpType || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      pumpType: newInputValue
    });
  }}
  options={ptOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Pump Type"
      variant="outlined"
      fullWidth
      className='custom-text-field'
      label="Pump Type"
    />
  )}
/>
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Stuffing Box</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="stuffingBox"
                value={formData.stuffingBox}
                onChange={handleChange}
                label="Stuffing Box"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Stage</InputLabel > */}
<Autocomplete style={{width:'100%'}}
              size="small"
  value={formData.stage}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      stage: newValue
    });
  }}
  onFocus={()=>getColumnData('Stages', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.stage || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      stage: newInputValue
    });
  }}
  options={stgOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Stage"
      variant="outlined"
      label="Stage"
      className='custom-text-field'
      fullWidth
    />
  )}
/>
</Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label">Casing</InputLabel > */}
              <Autocomplete style={{width:'100%'}}
              size="small"
  value={formData.casting}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      casting: newValue
    });
  }}
  onFocus={()=>getColumnData('Casing Type', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.casting || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      casting: newInputValue
    });
  }}
  options={cstOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Casing Type"
      variant="outlined"
      className='custom-text-field'
      label="Casing"
      fullWidth
    />
  )}
/>
            </Grid>
          </Grid>

        </div>


 <div className='card'>
          <h3>Existing Seal :-</h3>
          <Grid container spacing={2}>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Series</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="series"
                value={formData.series}
                label="Series"
                onChange={handleChange} />
            </Grid>

              <Grid item xs={4}>
{/* <InputLabel className="ip-label" >Performance</InputLabel > */}

<Autocomplete style={{width:'100%'}}
size="small"
  value={formData.performance}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      performance: newValue
    });
  }}
  onFocus={()=>getColumnData('Performance', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.performance || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      perfromance:newInputValue
    });
  }}
  options={pfOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      className="custom-text-field"
      placeholder="Select Performance Type"
      variant="outlined"
      label="Performance"
      fullWidth
    />
  )}
/>
    </Grid>


              <Grid item xs={4}>
{/* <InputLabel className="ip-label" >Seal Arrangement</InputLabel > */}
<Autocomplete style={{width:'100%'}}
size="small"
  value={formData.sealArrangement}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      sealArrangement: newValue
    });
  }}
  onFocus={()=>getColumnData('Seal Arrangement', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.sealArrangement || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      sealArrangement:newInputValue
    });
  }}
  options={saOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Seal Arrangement"
      variant="outlined"
      label="Seal Arrangement"
      className='custom-text-field'
      fullWidth
    />
  )}
/>
    </Grid>


              <Grid item xs={4}>
{/* <InputLabel className="ip-label" >Seal Type</InputLabel > */}

<Autocomplete style={{width:'100%'}}
  size="small"
  value={formData.sealType}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      sealType: newValue
    });
  }}
  onFocus={()=>getColumnData('Seal Type', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.sealType || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      sealType:newInputValue
    });
  }}
  options={stOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Seal Type"
      variant="outlined"
      label="Seal Type"
      fullWidth
    />
  )}
/>
    </Grid>
            </Grid>
            </div>


            
            
          <div className='card'>
          <h2>Parameters & Fluids :-</h2>
          <div className=''>
          <h3>Parameters :-</h3>
          <Grid container spacing={2}>
           
           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >All Pressure Unit</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="allPressureUnit"
                value={formData.allPressureUnit}
                onChange={handleChange} 
                label="All Pressure Unit"
                />
            </Grid>
          
           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Total Heat</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="totalHeat"
                value={formData.totalHeat}
                onChange={handleChange}
                label="Total Heat"
                />
            </Grid>
          
          
           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Suction Pressure</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="suctionPressure"
                value={formData.suctionPressure}
                onChange={handleChange} 
                label="Suction Pressure"
                />
            </Grid>

           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Discharge Pressure</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="dischargePressure"
                value={formData.dischargePressure}
                onChange={handleChange}
                label="Discharge Pressure"
                />
            </Grid>

           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Direction of Rortation</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="directionOfRotation"
                value={formData.directionOfRotation}
                onChange={handleChange} 
                label="Direction of Rortation"
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
              {/* <InputLabel className="ip-label" >Box Pressure</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="boxPressure"
                value={formData.boxPressure}
                onChange={handleChange}
                label="Box Pressure"
                />
            </Grid>
            
            </Grid>
            </div>

        <div >
        <h3>Fluids :-</h3>

        <Grid container spacing={2}>
        
           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Operating Fluid</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="operatingFluid"
                value={formData.operatingFluid}
                onChange={handleChange} 
                label="Operating Fluid"
                />
            </Grid>
           
           <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >All Temprature Unit</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="allTempPressureUnit"
                value={formData.allTempPressureUnit}
                onChange={handleChange} 
                label="All Temprature Unit"
                />
            </Grid>


            <Grid item xs={4}>
{/* <InputLabel className="ip-label" >Nature</InputLabel > */}

<Autocomplete style={{width:'100%'}}
size="small"
  value={formData.nature}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      nature: newValue
    });
  }}
  onFocus={()=>getColumnData('Fluid Nature',setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
  inputValue={formData.nature || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      nature:newInputValue
    });
  }}
  options={fnOption}
  renderInput={(params) => (
    <TextField
    size="small"
      {...params}
      placeholder="Select Fluid Nature"
      variant="outlined"
      label="Nature"
      fullWidth
    />
  )}
/>
    </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Opearating Temprature</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="operatingTemperature"
                value={formData.operatingTemperature}
                onChange={handleChange} 
                label="Opearating Temprature"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Minimum Operating Temprature</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="minOperatingTemperature"
                value={formData.minOperatingTemperature}
                onChange={handleChange} 
                label="Minimum Operating Temprature"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >SP Gravity</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="spGravity"
                value={formData.spGravity}
                onChange={handleChange}
                label="SP Gravity"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Freez Point</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="freezePoint"
                value={formData.freezePoint}
                onChange={handleChange} 
                label="Freez Point"
                />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Boiling Point</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="boilPoint"
                value={formData.boilPoint}
                onChange={handleChange} 
                label="Boiling Point"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Viscosity</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="viscosity"
                value={formData.viscosity}
                onChange={handleChange} 
                label="Viscosity"
                />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Viscosity Unit</InputLabel > */}
              <TextField
              size="small"
              className="custom-text-field"
                name="viscosityUnit"
                value={formData.viscosityUnit}
                label="Viscosity Unit"
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >percentage Of Solid</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="percentageOfSolid"
                value={formData.percentageOfSolid}
                onChange={handleChange} 
                label="percentage Of Solid"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Grain Point</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="grainPoint"
                value={formData.grainPoint}
                onChange={handleChange} 
                label="Grain Point"
                />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Description</InputLabel > */}
              <TextField
              size="small"
                className="custom-text-field"
                name="description"
                value={formData.description}
                onChange={handleChange} 
                label="Description"
                />
            </Grid>

            </Grid>
        </div>
            </div>




<div className='card'>
          <h3>Section 5&6</h3>
          <Grid container spacing={2}>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >flush plan:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="flushPlan"
             value={formData.flushPlan}
             onChange={handleChange} 
             label="flush plan:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Barrier OR Buffer plan:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="barrierOrBufferFluid"
             value={formData.barrierOrBufferFluid}
             onChange={handleChange} 
             label="Barrier OR Buffer plan:"
             />
         </Grid>
         
        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Quench plan:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="quenchPlan"
             value={formData.quenchPlan}
             onChange={handleChange} 
             label="Quench plan:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Design Offered:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="designOffered"
             value={formData.designOffered}
             onChange={handleChange} 
             label="Design Offered:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Size Available:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="sizeAvailable"
             value={formData.sizeAvailable}
             onChange={handleChange} 
             label="Size Available:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Material Code:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="materialCode"
             value={formData.materialCode}
             onChange={handleChange} 
             label="Material Code:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Seal Series:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="sealSeries"
             value={formData.sealSeries}
             onChange={handleChange} 
             label="Seal Series:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Shaft Size:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="shaftSize"
             value={formData.shaftSize}
             onChange={handleChange} 
             label="Shaft Size:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Bore Dia:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="boreDia"
             value={formData.boreDia}
             onChange={handleChange} 
             label="Bore Dia:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Bore Depth:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="boreDepth"
             value={formData.boreDepth}
             onChange={handleChange} 
             label="Bore Depth:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Nearest Obstruction:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="nearestObstruction"
             value={formData.nearestObstruction}
             onChange={handleChange} 
             label="Nearest Obstruction:"
             />
         </Grid>



         </Grid>
     </div>






          

        <div className='card'>
          <h3>Measurement</h3>
          <Grid container spacing={2}>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >d1-Sleev OD:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d1SleeveOd"
             value={formData.d1SleeveOd}
             onChange={handleChange} 
             label="d1-Sleev OD:"
             />
         </Grid>
     
        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Stud Holes:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="studHoles"
             value={formData.studHoles}
             onChange={handleChange} 
             label="Stud Holes:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >D2 Stuffing Box ID:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d2StuffingBoxId"
             value={formData.d2StuffingBoxId}
             onChange={handleChange} 
             label="D2 Stuffing Box ID:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >D4 Stuffing Box Bore:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d4StuffingBoxBore"
             value={formData.d4StuffingBoxBore}
             onChange={handleChange} 
             label="D4 Stuffing Box Bore:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >D5 Spogit Dia:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d5SpigotDia"
             value={formData.d5SpigotDia}
             onChange={handleChange}
             label="D5 Spogit Dia:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >D51:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d51"
             value={formData.d51}
             onChange={handleChange} 
             label="D51:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >D52:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d52"
             value={formData.d52}
             onChange={handleChange} 
             label="D52:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >D9 Bolt Circle:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="d9BoltCircle"
             value={formData.d9BoltCircle}
             onChange={handleChange} 
             label="D9 Bolt Circle:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Bolt Size:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="boltSize"
             value={formData.boltSize}
             onChange={handleChange} 
             label="Bolt Size:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l11:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l11"
             value={formData.l11}
             onChange={handleChange} 
             label="l11:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l12:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l12"
             value={formData.l12}
             onChange={handleChange} 
             label="l12:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l1 Sleeve Exten:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l1SleeveExten"
             value={formData.l1SleeveExten}
             onChange={handleChange} 
             label="l1 Sleeve Exten:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l2 Shaft Hub:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l2ShaftHub"
             value={formData.l2ShaftHub}
             onChange={handleChange} 
             label="l2 Shaft Hub:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l3 Thread Length:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l3ThreadLength"
             value={formData.l3ThreadLength}
             onChange={handleChange} 
             label="l3 Thread Length:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l8 SB Depth:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l8sbDepth"
             value={formData.l8sbDepth}
             onChange={handleChange} 
             label="l8 SB Depth:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >l9 Nearest Obstruction:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="l9NearObstr"
             value={formData.l9NearObstr}
             onChange={handleChange} 
             label="l9 Nearest Obstruction:"
             />
         </Grid>
         

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Alpha:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="alpha"
             value={formData.alpha}
             onChange={handleChange} 
             label="Alpha:"
             />
         </Grid>
         
        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Beta:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="beta"
             value={formData.beta}
             onChange={handleChange} 
             label="Beta:"
             />
         </Grid>
         
        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Theta:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="theta"
             value={formData.theta}
             onChange={handleChange} 
             label="Theta:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Created By User GUID:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="createdByUserGUID"
             value={formData.createdByUserGUID}
             onChange={handleChange} 
             label="Created By User GUID:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Last Edited By User GUID:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="lastEditedByUserGUID"
             value={formData.lastEditedByUserGUID}
             onChange={handleChange} 
             label="Last Edited By User GUID:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Row GUID:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="rowguid"
             value={formData.rowguid}
             onChange={handleChange} 
             label="Row GUID:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Email Id:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="emailId"
             value={formData.emailId}
             onChange={handleChange} 
             label="Email Id:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Region:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="region"
             value={formData.region}
             onChange={handleChange} 
             label="Region"
             />
         </Grid>
         
        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Address:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="address"
             value={formData.address}
             onChange={handleChange} 
             label="Address"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Sr No:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="srNo"
             value={formData.srNo}
             onChange={handleChange} 
             label="Sr No:"
             />
         </Grid>


        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >Dshaft OD:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="dshaftOd"
             value={formData.dshaftOd}
             onChange={handleChange} 
             label="Dshaft OD:"
             />
         </Grid>
         

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >SBox Cover:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="sboxCover"
             value={formData.sboxCover}
             onChange={handleChange} 
             label="SBox Cover:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >M Number Of Bolts:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="mnumberOfBolts"
             value={formData.mnumberOfBolts}
             onChange={handleChange} 
             label="M Number Of Bolts:"
             />
         </Grid>

        <Grid item xs={4}>
           {/* <InputLabel className="ip-label" >L Raised Col:</InputLabel > */}
           <TextField
           size="small"
             className="custom-text-field"
             name="lraisedCol"
             value={formData.lraisedCol}
             onChange={handleChange} 
             label="L Raised Col:"
             />
         </Grid>
         

         </Grid>

        </div>


        <Grid item xs={4}>
          <Grid item xs={4}>
            {!pId ? (
              <Button className="submit-btn" style={{margin:"2rem 1rem"}} 
              onClick={(e)=>handleSubmit(e,formData,navigate)} type="submit" variant="contained">
                Submit
              </Button>
            ) : (
              <>
                <Button className="update-btn" variant="contained" type="submit" 
                onClick={(e)=>handleUpdatePumpSeal(e,formData,pId,navigate)}>
                  Update
                </Button>
                <Button className="cancel-btn" variant="contained" onClick={cancelUpdate}>
                  Cancel
                </Button>{' '}
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>


  );

}


