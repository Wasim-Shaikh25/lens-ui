import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, InputLabel, IconButton } from '@mui/material';
// import '../../css/CustomerFrom.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import axios from 'axios';
// import DataContext from '../../contextAPI/DataContext'
// import "C:/Admin Panel/adminpanel/src/Pages/customerPage/createCustomer/customerFrom.css";
import { useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';




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
    costingRequirement: true,
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
  });



  useEffect(() => {
    if (pId !== undefined) {
      axios.get(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/get?pumSealDrfNo=${pId}`)
        .then(res => {
          const { data } = res;
          setFormData(data);
          console.log("the pId fetched data is ", data)

        })
        .catch(err => {
          console.log(err)
        })

    } else {
      setFormData(
        {
          branch: '',
          endUser: '',
          costingRequirement: true,
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






  const handleSubmit = async (e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');


    if (!formData.createdDate) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.createdDate = dateTime;
    }
    formData.lastEditedDate = dateTime;

    formData.srNo = parseInt(formData.srNo)

    console.log("formData sales is ", formData);


    try {
      const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/save", formData);
      console.log("response is ", res.data);
      navigate(`/pumpSealSuccess/${res.data}`);
    }
    catch (err) {
      console.log(err);
    }



  };


  const getColumnData = async (colName)=>{

    try {
      const res = await axios.get(`https://lens-svc.azurewebsites.net/lens-svc/queryDrawingMasterTablebyColumn?columnName=${colName}`);
      switch(colName){
        case 'Pump Type' :
          setptOption(res.data);
          break;
          case 'Arrangement':
          setarOption(res.data);
          break;
          case 'Seal Arrangement':
          setsaOption(res.data);
          break;
          case 'Seal Type':
          setstOption(res.data);
          break;
          case 'Stages':
          setstgOption(res.data);
          break;
          case 'Casing Type':
          setcstOption(res.data);
          break;
          case 'Performance':
          setpfOption(res.data);
          break;
          case 'Fluid Nature':
          setfnOption(res.data);
          break;
          default:
            break;
      }
      console.log("res is ",res.data);

    } catch (error) {
        console.log(error)
    }

  }


  const handleUpdate = async (e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    formData.lastEditedDate = dateTime;

    console.log("formData sales is ", formData);

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/pumSeal/Update", formData);
    console.log("response from update is ", res.data);


    pId = "";
    navigate(`/pumpSealSuccess/${formData.pumpSealDrfNumber}`);
  }



  const cancelUpdate = () => {

    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    // If user confirms, navigate to the home page and reload the window
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  }




  return (

    <Container className="container" sx={{ marginTop: '20px', backgroundColor: 'rgb(250, 251, 251)' }}>
      {!pId ? <h1 style={{ marginLeft: '20px' }}>New Pump Seal :</h1> : <h1 style={{ marginLeft: '20px' }}>Update Pump Seal :</h1>}
      <form onSubmit={handleSubmit} className="form-style">
        {/* {Object.keys(formData).map((key, index) => (
      <Grid item xs={4} key={index}>
        <InputLabel className="ip-label">{key}</InputLabel>
        {key === 'costingRequirement' ? ( 
            <select
              className="text-field" style={{width:"55%", padding:"10px"}}
              name={key}
              value={formData[key]}
              onChange={handleChange}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          ) : (
            <TextField
              className="text-field" 
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          )}
      </Grid>
    ))} */}
        <div className='card'>
          <h3>Drawing Requisition - Pump Seal :-</h3>
          <Grid container spacing={2}>
            {pId && <Grid item xs={4}>
              <InputLabel className="ip-label" >PumpSeal Drf Number</InputLabel >
              <TextField
                className="text-field"
                name="pumpSealDrfNumber"
                value={formData.pumpSealDrfNumber}
                onChange={handleChange} />
            </Grid>
            }

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Branch</InputLabel >
              <TextField
                className="text-field"
                name="branch"
                value={formData.branch}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >endUser</InputLabel >
              <TextField
                className="text-field"
                name="endUser"
                value={formData.endUser}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Customer Address</InputLabel >
              <TextField
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


        <div className='card'>
          <h3>Pump Data :-</h3>
          <Grid container spacing={2}>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Make</InputLabel >
              <TextField
                className="text-field"
                name="make"
                value={formData.make}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Model</InputLabel >
              <TextField
                className="text-field"
                name="model"
                value={formData.model}
                onChange={handleChange} />
            </Grid>

          

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Bearing BKT</InputLabel >
              <TextField
                className="text-field"
                name="bearingBracket"
                value={formData.bearingBracket}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Impeller</InputLabel >
              <TextField
                className="text-field"
                name="impeller"
                value={formData.impeller}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Shaft</InputLabel >
              <TextField
                className="text-field"
                name="shaft"
                value={formData.shaft}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Seal Chamber</InputLabel >
              <TextField
                className="text-field"
                name="sealChamber"
                value={formData.sealChamber}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Tag Number</InputLabel >
              <TextField
                className="text-field"
                name="tagNumber"
                value={formData.tagNumber}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
<InputLabel className="ip-label" >Arrangement</InputLabel >

<Autocomplete style={{width:'62%'}}
  value={formData.arrangement}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      arrangement: newValue
    });
  }}
  onFocus={()=>getColumnData('Arrangement')}
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
      {...params}
      placeholder="Select Arrangement"
      variant="outlined"
      fullWidth
    />
  )}
/>
            </Grid>




            <Grid item xs={4}>
<InputLabel className="ip-label" >Pump Type</InputLabel >

<Autocomplete style={{width:'62%'}}
  value={formData.pumpType}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      pumpType: newValue
    });
  }}
  onFocus={()=>getColumnData('Pump Type')}
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
      {...params}
      placeholder="Select Pump Type"
      variant="outlined"
      fullWidth
    />
  )}
/>
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label">Stuffing Box</InputLabel >
              <TextField
                className="text-field"
                name="stuffingBox"
                value={formData.stuffingBox}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label">Stage</InputLabel >
              <Autocomplete style={{width:'62%'}}
  value={formData.stage}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      stage: newValue
    });
  }}
  onFocus={()=>getColumnData('Stages')}
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
      {...params}
      placeholder="Select Stage"
      variant="outlined"
      fullWidth
    />
  )}
/>
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label">Casing</InputLabel >
              <Autocomplete style={{width:'62%'}}
  value={formData.casting}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      casting: newValue
    });
  }}
  onFocus={()=>getColumnData('Casing Type')}
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
      {...params}
      placeholder="Select Casing Type"
      variant="outlined"
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
              <InputLabel className="ip-label" >Series</InputLabel >
              <TextField
                className="text-field"
                name="series"
                value={formData.series}
                onChange={handleChange} />
            </Grid>

              <Grid item xs={4}>
<InputLabel className="ip-label" >Performance</InputLabel >

<Autocomplete style={{width:'62%'}}
  value={formData.performance}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      performance: newValue
    });
  }}
  onFocus={()=>getColumnData('Performance')}
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
      {...params}
      placeholder="Select Performance Type"
      variant="outlined"
      fullWidth
    />
  )}
/>
    </Grid>


              <Grid item xs={4}>
<InputLabel className="ip-label" >Seal Arrangement</InputLabel >

<Autocomplete style={{width:'62%'}}
  value={formData.sealArrangement}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      sealArrangement: newValue
    });
  }}
  onFocus={()=>getColumnData('Seal Arrangement')}
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
      {...params}
      placeholder="Select Seal Arrangement"
      variant="outlined"
      fullWidth
    />
  )}
/>
    </Grid>


              <Grid item xs={4}>
<InputLabel className="ip-label" >Seal Type</InputLabel >

<Autocomplete style={{width:'62%'}}
  value={formData.sealType}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      sealType: newValue
    });
  }}
  onFocus={()=>getColumnData('Seal Type')}
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
      {...params}
      placeholder="Select Seal Type"
      variant="outlined"
      fullWidth
    />
  )}
/>
    </Grid>
            </Grid>
            </div>


            
            
          <div className='card'>
          <h2>Parameters & Fluids :-</h2>
          <div className='card'>
          <h3>Parameters :-</h3>
          <Grid container spacing={2}>
           
           <Grid item xs={4}>
              <InputLabel className="ip-label" >All Pressure Unit</InputLabel >
              <TextField
                className="text-field"
                name="allPressureUnit"
                value={formData.allPressureUnit}
                onChange={handleChange} />
            </Grid>
          
           <Grid item xs={4}>
              <InputLabel className="ip-label" >Total Heat</InputLabel >
              <TextField
                className="text-field"
                name="totalHeat"
                value={formData.totalHeat}
                onChange={handleChange} />
            </Grid>
          
          
           <Grid item xs={4}>
              <InputLabel className="ip-label" >Suction Pressure</InputLabel >
              <TextField
                className="text-field"
                name="suctionPressure"
                value={formData.suctionPressure}
                onChange={handleChange} />
            </Grid>

           <Grid item xs={4}>
              <InputLabel className="ip-label" >Discharge Pressure</InputLabel >
              <TextField
                className="text-field"
                name="dischargePressure"
                value={formData.dischargePressure}
                onChange={handleChange} />
            </Grid>

           <Grid item xs={4}>
              <InputLabel className="ip-label" >Direction of Rortation</InputLabel >
              <TextField
                className="text-field"
                name="directionOfRotation"
                value={formData.directionOfRotation}
                onChange={handleChange} />
            </Grid>

           <Grid item xs={4}>
              <InputLabel className="ip-label" >Speed</InputLabel >
              <TextField
                className="text-field"
                name="speed"
                value={formData.speed}
                onChange={handleChange} />
            </Grid>

            
           <Grid item xs={4}>
              <InputLabel className="ip-label" >Box Pressure</InputLabel >
              <TextField
                className="text-field"
                name="boxPressure"
                value={formData.boxPressure}
                onChange={handleChange} />
            </Grid>
            
            </Grid>
            </div>


        <div className='card'>
        <h3>Fluids :-</h3>

        <Grid container spacing={2}>
        
           <Grid item xs={4}>
              <InputLabel className="ip-label" >Operating Fluid</InputLabel >
              <TextField
                className="text-field"
                name="operatingFluid"
                value={formData.operatingFluid}
                onChange={handleChange} />
            </Grid>
           
           <Grid item xs={4}>
              <InputLabel className="ip-label" >All Temprature Unit</InputLabel >
              <TextField
                className="text-field"
                name="allTempPressureUnit"
                value={formData.allTempPressureUnit}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
<InputLabel className="ip-label" >Nature</InputLabel >

<Autocomplete style={{width:'62%'}}
  value={formData.nature}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      nature: newValue
    });
  }}
  onFocus={()=>getColumnData('Fluid Nature')}
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
      {...params}
      placeholder="Select Fluid Nature"
      variant="outlined"
      fullWidth
    />
  )}
/>
    </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Opearating Temprature</InputLabel >
              <TextField
                className="text-field"
                name="operatingTemperature"
                value={formData.operatingTemperature}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Minimum Operating Temprature</InputLabel >
              <TextField
                className="text-field"
                name="minOperatingTemperature"
                value={formData.minOperatingTemperature}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >SP Gravity</InputLabel >
              <TextField
                className="text-field"
                name="spGravity"
                value={formData.spGravity}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Freez Point</InputLabel >
              <TextField
                className="text-field"
                name="freezePoint"
                value={formData.freezePoint}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Boiling Point</InputLabel >
              <TextField
                className="text-field"
                name="boilPoint"
                value={formData.boilPoint}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Viscosity</InputLabel >
              <TextField
                className="text-field"
                name="viscosity"
                value={formData.viscosity}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Viscosity Unit</InputLabel >
              <TextField
                className="text-field"
                name="viscosityUnit"
                value={formData.viscosityUnit}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >percentage Of Solid</InputLabel >
              <TextField
                className="text-field"
                name="percentageOfSolid"
                value={formData.percentageOfSolid}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Grain Point</InputLabel >
              <TextField
                className="text-field"
                name="grainPoint"
                value={formData.grainPoint}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Description</InputLabel >
              <TextField
                className="text-field"
                name="description"
                value={formData.description}
                onChange={handleChange} />
            </Grid>

            </Grid>
        </div>
            </div>




<div className='card'>
          <h3>Section 5&6</h3>
          <Grid container spacing={2}>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >flush plan:</InputLabel >
           <TextField
             className="text-field"
             name="flushPlan"
             value={formData.flushPlan}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Barrier OR Buffer plan:</InputLabel >
           <TextField
             className="text-field"
             name="barrierOrBufferPlan"
             value={formData.barrierOrBufferFluid}
             onChange={handleChange} />
         </Grid>
         
        <Grid item xs={4}>
           <InputLabel className="ip-label" >Quench plan:</InputLabel >
           <TextField
             className="text-field"
             name="quenchPlan"
             value={formData.quenchPlan}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >Design Offered:</InputLabel >
           <TextField
             className="text-field"
             name="designOffered"
             value={formData.designOffered}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Size Available:</InputLabel >
           <TextField
             className="text-field"
             name="sizeAvailable"
             value={formData.sizeAvailable}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Material Code:</InputLabel >
           <TextField
             className="text-field"
             name="materialCode"
             value={formData.materialCode}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Seal Series:</InputLabel >
           <TextField
             className="text-field"
             name="sealSeries"
             value={formData.sealSeries}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Shaft Size:</InputLabel >
           <TextField
             className="text-field"
             name="shaftSize"
             value={formData.shaftSize}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Bore Dia:</InputLabel >
           <TextField
             className="text-field"
             name="boreDia"
             value={formData.boreDia}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Bore Depth:</InputLabel >
           <TextField
             className="text-field"
             name="boreDepth"
             value={formData.boreDepth}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >Nearest Obstruction:</InputLabel >
           <TextField
             className="text-field"
             name="nearestObstruction"
             value={formData.nearestObstruction}
             onChange={handleChange} />
         </Grid>



         </Grid>
     </div>






          

        <div className='card'>
          <h3>Measurement</h3>
          <Grid container spacing={2}>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >d1-Sleev OD:</InputLabel >
           <TextField
             className="text-field"
             name="d1SleeveOd"
             value={formData.d1SleeveOd}
             onChange={handleChange} />
         </Grid>
     
        <Grid item xs={4}>
           <InputLabel className="ip-label" >Stud Holes:</InputLabel >
           <TextField
             className="text-field"
             name="studHoles"
             value={formData.studHoles}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >D2 Stuffing Box ID:</InputLabel >
           <TextField
             className="text-field"
             name="d2StuffingBoxId"
             value={formData.d2StuffingBoxId}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >D4 Stuffing Box Bore:</InputLabel >
           <TextField
             className="text-field"
             name="d4StuffingBoxBore"
             value={formData.d4StuffingBoxBore}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >D5 Spogit Dia:</InputLabel >
           <TextField
             className="text-field"
             name="d5SpigotDia"
             value={formData.d5SpigotDia}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >D51:</InputLabel >
           <TextField
             className="text-field"
             name="d51"
             value={formData.d51}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >D52:</InputLabel >
           <TextField
             className="text-field"
             name="d52"
             value={formData.d52}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >D9 Bolt Circle:</InputLabel >
           <TextField
             className="text-field"
             name="d9BoltCircle"
             value={formData.d9BoltCircle}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Bolt Size:</InputLabel >
           <TextField
             className="text-field"
             name="boltSize"
             value={formData.boltSize}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >l11:</InputLabel >
           <TextField
             className="text-field"
             name="l11"
             value={formData.l11}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >l12:</InputLabel >
           <TextField
             className="text-field"
             name="l12"
             value={formData.l12}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >l1 Sleeve Exten:</InputLabel >
           <TextField
             className="text-field"
             name="l1SleeveExten"
             value={formData.l1SleeveExten}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >l2 Shaft Hub:</InputLabel >
           <TextField
             className="text-field"
             name="l2ShaftHub"
             value={formData.l2ShaftHub}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >l3 Thread Length:</InputLabel >
           <TextField
             className="text-field"
             name="l3ThreadLength"
             value={formData.l3ThreadLength}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >l8 SB Depth:</InputLabel >
           <TextField
             className="text-field"
             name="l8sbDepth"
             value={formData.l8sbDepth}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >l9 Nearest Obstruction:</InputLabel >
           <TextField
             className="text-field"
             name="l9NearObstr"
             value={formData.l9NearObstr}
             onChange={handleChange} />
         </Grid>
         

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Alpha:</InputLabel >
           <TextField
             className="text-field"
             name="alpha"
             value={formData.alpha}
             onChange={handleChange} />
         </Grid>
         
        <Grid item xs={4}>
           <InputLabel className="ip-label" >Beta:</InputLabel >
           <TextField
             className="text-field"
             name="beta"
             value={formData.beta}
             onChange={handleChange} />
         </Grid>
         
        <Grid item xs={4}>
           <InputLabel className="ip-label" >Theta:</InputLabel >
           <TextField
             className="text-field"
             name="theta"
             value={formData.theta}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Created By User GUID:</InputLabel >
           <TextField
             className="text-field"
             name="createdByUserGUID"
             value={formData.createdByUserGUID}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Last Edited By User GUID:</InputLabel >
           <TextField
             className="text-field"
             name="lastEditedByUserGUID"
             value={formData.lastEditedByUserGUID}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >Row GUID:</InputLabel >
           <TextField
             className="text-field"
             name="rowguid"
             value={formData.rowguid}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >Email Id:</InputLabel >
           <TextField
             className="text-field"
             name="emailId"
             value={formData.emailId}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >Region:</InputLabel >
           <TextField
             className="text-field"
             name="region"
             value={formData.region}
             onChange={handleChange} />
         </Grid>
         
        <Grid item xs={4}>
           <InputLabel className="ip-label" >Address:</InputLabel >
           <TextField
             className="text-field"
             name="address"
             value={formData.address}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >Sr No:</InputLabel >
           <TextField
             className="text-field"
             name="srNo"
             value={formData.srNo}
             onChange={handleChange} />
         </Grid>


        <Grid item xs={4}>
           <InputLabel className="ip-label" >Dshaft OD:</InputLabel >
           <TextField
             className="text-field"
             name="dshaftOd"
             value={formData.dshaftOd}
             onChange={handleChange} />
         </Grid>
         

        <Grid item xs={4}>
           <InputLabel className="ip-label" >SBox Cover:</InputLabel >
           <TextField
             className="text-field"
             name="sboxCover"
             value={formData.sboxCover}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >M Number Of Bolts:</InputLabel >
           <TextField
             className="text-field"
             name="mnumberOfBolts"
             value={formData.mnumberOfBolts}
             onChange={handleChange} />
         </Grid>

        <Grid item xs={4}>
           <InputLabel className="ip-label" >L Raised Col:</InputLabel >
           <TextField
             className="text-field"
             name="lraisedCol"
             value={formData.lraisedCol}
             onChange={handleChange} />
         </Grid>
         

         </Grid>

        </div>


        <Grid item xs={4}>
          <Grid item xs={4}>
            {!pId ? (
              <Button className="submit-btn" type="submit" variant="contained">
                Submit
              </Button>
            ) : (
              <>
                <Button className="update-btn" variant="contained" onClick={handleUpdate}>
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


