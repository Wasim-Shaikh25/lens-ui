import React, { useState, useEffect } from 'react';
import { Table, TableHead, Grid, TableBody, TableRow,InputAdornment, FormControl,Select, TableCell, IconButton, Button, TextField, Container, Autocomplete, MenuItem } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getApi, handleSubmit } from '../../apis/ApiPlan';
import { useNavigate, useParams } from 'react-router-dom';
import { handleUpdate } from '../../apis/ApiPlan';
import './CreateApiPlan.css'
import { useAuth } from '../../contextApi/AuthContext';
import moment from 'moment';


export default function CreateApi() {

  const navigate = useNavigate();
  let { apId } = useParams();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const {authState} = useAuth();

  console.log("authState is ",authState);
  
  

  

  const [formData, setFormData] = useState(
    
    {
      drfNumber: "",
      branch: "",
      createdByUser:authState?.sub,
      updatedByUser:authState?.sub,
      createdOn:dateTime,
      updatedOn:dateTime,
      salesInquiryItemReferenceNo: "",
      customerName: "",
      endUser: "",
      costingRequirement: "",
      existingSealSupportMake: "",
      existingSealSupportApiPlan: "",
      existingSealSupportCapacity: "",
      existingSealSupportReferenceApiPlanDrawingNumber: "",
      existingSealSupportHeatExchangeType: "",
      existingSealSupportHeatExchangeArea: "",
      existingSealSupportStandard: "",
      mocVessel: "",
      mocCoolingCoil: "",
      mocPipingAndFitting: "",
      mocBladder: "",
      mocStructuralParts: "",
      instrumentRequiredInstrumentsOrLooseItems: "",
      instrumentMakeOfInstruments: "",
      recommendedBufferOrBarrierFluid: "",
      accessories: "",
      remarks: "",
      attachmentAvl: "",
      attachmentSpecification: "",
      attachmentReferenceMechanicalSealDrawing: "",
      apiPlanInquiryItem: {
        apiPlanInquiryId: "",
        apiPlanInquiryReferenceNo: "",
        equipmentMake: "",
        equipmentModel: "",
        equipmentType: "",
        arrangement: "",
        tagNumber: "",
        pumpMOC: "",
        drawingNumber: "",
        mechanicalSealMake: "",
        mechanicalSealSeries: "",
        connectionSize: "",
        shaftSize: "",
        rotation: "",
        mawp: {
          value: "",
          unit: ""
        },
        mawt: {
          value: "",
          unit: ""
        },
        suctionPressurePump: {
          value: "",
          unit: ""
        },
        dischargePressurePump: {
          value: "",
          unit: ""
        },
        boxPressurePump: {
          value: "",
          unit: ""
        },
        vesselPressureAgitator: {
          value: "",
          unit: ""
        },
        operatingTemperature: {
          value: "",
          unit: ""
        },
        maxTemperature: {
          value: "",
          unit: ""
        },
        fluid: "",
        speed: "",
        viscosity: "",
        spGravity: "",
        percentageOfSolid: "",
        solidSize: "",
        freezingPoint: "",
        boilingPoint: "",
        leakProofProposalApiPlan: "",
        capacity: "",
        heatExchangeType: "",
        heatExchangeArea: "",
        standard: "",
        createdByUser: "",
        branch: "",
        updatedByUser: "",
        salesInquiryId: ""
      }
    }
  
  );



  useEffect(() => {
    if (apId !== undefined) {
      getApi(apId, setFormData);

    } else {
      setFormData(
        {
          drfNumber: "",
          branch: "",
          createdByUser:authState?.sub,
          updatedByUser:authState?.sub,
          createdOn:dateTime,
          updatedOn:dateTime,
          salesInquiryItemReferenceNo: "",
          customerName: "",
          endUser: "",
          costingRequirement: "",
          existingSealSupportMake: "",
          existingSealSupportApiPlan: "",
          existingSealSupportCapacity: "",
          existingSealSupportReferenceApiPlanDrawingNumber: "",
          existingSealSupportHeatExchangeType: "",
          existingSealSupportHeatExchangeArea: "",
          existingSealSupportStandard: "",
          mocVessel: "",
          mocCoolingCoil: "",
          mocPipingAndFitting: "",
          mocBladder: "",
          mocStructuralParts: "",
          instrumentRequiredInstrumentsOrLooseItems: "",
          instrumentMakeOfInstruments: "",
          recommendedBufferOrBarrierFluid: "",
          accessories: "",
          remarks: "",
          attachmentAvl: "",
          attachmentSpecification: "",
          attachmentReferenceMechanicalSealDrawing: "",
          apiPlanInquiryItem: {
            apiPlanInquiryReferenceNo: "",
            equipmentMake: "",
            equipmentModel: "",
            equipmentType: "",
            arrangement: "",
            tagNumber: "",
            pumpMOC: "",
            drawingNumber: "",
            mechanicalSealMake: "",
            mechanicalSealSeries: "",
            connectionSize: "",
            shaftSize: "",
            rotation: "",
            mawp: {
            value: "",
             unit: ""
            },
            mawt: {
            value :"",
            unit: ""
            },
            suctionPressurePump: {
            value :"",
            unit: ""
            },
            dischargePressurePump: {
            value :"",
             unit: ""
            },
            boxPressurePump: {
            value: "",
             unit: ""
            },
            vesselPressureAgitator: {
            value: "",
            unit: ""
            },
            operatingTemperature: {
            value: "",
             unit: ""
            },
            maxTemperature: {
            value: "",
             unit: ""
            },
            fluid: "",
            speed: "",
            viscosity: "",
            spGravity: "",
            percentageOfSolid: "",
            solidSize: "",
            freezingPoint: "",
            boilingPoint: "",
            leakProofProposalApiPlan: "",
            capacity: "",
            heatExchangeType: "",
            heatExchangeArea: "",
            standard: "",
            createdByUser: "",
            branch: "",
            updatedByUser: "",
          }
        }
        
        )
    }


  }, [apId, authState])



  const handleChange = (e) => {
    const { name,value} = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]:value    }));
 };







 const cancelUpdate = () => {
  const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
  // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
}

// State to store the list of instruments
const [instruments, setInstruments] = useState([
  { required: '', make: '' }
]);


const handleInstrumentChange = (e, index, field) => {
  const updatedInstruments = [...instruments];
  updatedInstruments[index][field] = e.target.value;
  setInstruments(updatedInstruments);
};

// Add a new row to the table
const addInstrumentRow = () => {
  setInstruments([...instruments, { required: '', make: '' }]);
};


// Delete a row from the table
const deleteInstrumentRow = (index) => {
  const updatedInstruments = instruments.filter((_, i) => i !== index);
  setInstruments(updatedInstruments);
};


//  just for sample 
const [loginDetails, setLoginDetails] = useState([
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' },
  // Add more branches as needed
]);


// Sample costing options
const [costingOptions, setCostingOptions] = useState([
  { id: 1, value: 'Standard', label: 'Standard' },
  { id: 2, value: 'Premium', label: 'Premium' },
  // Add more options as needed
]);

const [pId, setPId] = useState(null); // Initialize pId in the component's state



const resizeObserverErrHandler = (e) => {
  e.preventDefault();
};
window.addEventListener('error', resizeObserverErrHandler);



const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const handleChangeDebounced = debounce(handleChange, 300);



  return (
    <Container className="container" sx={{ marginTop: "20px", backgroundColor: "rgb(250, 251, 251)" }}>
    <form onSubmit={handleSubmit} >



      {/* API Plan:- Start */}

      <div className='card'>
        {!pId ? <h1>New API Plan  :</h1> : <h1>Update API Plan  :</h1>}
        <div className="MuiBox-root css-2e6lci">
          <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
            <g>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </g>
          </svg>
          <div className="MuiBox-root css-1isemmb">API Plan :-</div>
        </div>
        <hr />
        <Grid container spacing={2}>
          {/* DRF Number */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="DRF Number"
              id="disableItem"
              name="drfNumber"
              value={formData?.drfNumber} // Auto-generated, can be set to a value if available
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: Boolean(formData.drfNumber),
              }}
              autoFocus={formData.drfNumber} // Autofocus if the value exists
              InputProps={{
                readOnly: true, // To indicate it's auto-generated
              }}
            />
          </Grid>


         
          {/* Created By User */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Created By User"
              name="createdByUser"
              value={formData?.createdByUser} // Set from login details
              variant="outlined"
              InputLabelProps={{
                shrink: Boolean(formData.createdByUser),
              }}
              autoFocus={formData.createdByUser}
              disabled
              id="disableItem"
              fullWidth
              InputProps={{
                readOnly: true, // To indicate it's selectable from login details
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Sales Inquiry Item Reference No"
              name="salesInquiryItemReferenceNo"
              value={formData.salesInquiryItemReferenceNo} // Fetched based on reference number
              variant="outlined"
              fullWidth           
            />
          </Grid>

          {/* Created On */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Created On"
              name="createdOn"
              disabled
              id="disableItem"
              value={formData?.createdOn} // Auto-generated
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true, // Auto-generated field
              }}
            />
          </Grid>

          {/* Updated By User */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Updated By User"
              name="updatedByUser"
              value={formData?.updatedByUser} // Set from login details
              variant="outlined"
              InputLabelProps={{
                shrink: Boolean(formData.updatedByUser),
              }}
              autoFocus={formData.updatedByUser}
              disabled
              id="disableItem"
              fullWidth
              InputProps={{
                readOnly: true, // To indicate it's selectable from login details
              }}
            />
          </Grid>

          {/* Updated On */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Updated On"
              name="updatedOn"
              value={formData.updatedOn} // Auto-generated
              variant="outlined"
              disabled
              id="disableItem"
              fullWidth
              InputProps={{
                readOnly: true, // Auto-generated field
              }}
            />
          </Grid>

          {/* Customer Name */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Customer Name"
              name="customerName"
              value={formData.customerName} // Fetched based on reference number
              variant="outlined"
              InputLabelProps={{
                shrink: Boolean(formData.customerName),
              }}
              disabled 
              id="disableItem"
              autoFocus={formData.customerName}
              fullWidth
              InputProps={{
                readOnly: true, // Fetched value
              }}
            />
          </Grid>

          {/* End User */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="End User"
              name="endUser"
              value={formData.endUser}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Costing Requirement */}
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

  options={["Yes","No"].map((src) => src)}
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

      {/* Create API Plan : End */}



      {/* Equipment Deatails -  Start */}

      <div className='card'>
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Equipment Detail :-</div></div>
        <Grid container spacing={2}>
          {/* Make */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Make"
              name="make"
              value={formData.make || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>


          {/* Model */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Model"
              name="model"
              value={formData.model || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Type */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Type"
              name="type"
              value={formData.type || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Arrangement (Dropdown) */}
          <Grid item xs={4}>
            <TextField
              select
              size="small"
              className="custom-text-field"
              label="Arrangement"
              name="arrangement"
              value={formData.arrangement || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="" />
              <option value="Horizontal">Horizontal</option>
              <option value="Vertical">Vertical</option>
            </TextField>
          </Grid>

          {/* Tag Number */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Tag Number"
              name="tagNumber"
              value={formData.tagNumber || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Pump MOC */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Pump MOC"
              name="pumpMOC"
              value={formData.pumpMOC || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>




      {/* Equipment Deatails -  End */}




      {/* Machnical Seal Data - Start */}



      <div className='card'>
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Mechanical Seal Data :-</div></div>

        <Grid container spacing={2}>
          {/* Drawing Number */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Drawing Number"
              name="drawingNumber"
              value={formData.drawingNumber || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Mechanical Seal Make */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Mechanical Seal Make"
              name="mechanicalSealMake"
              value={formData.mechanicalSealMake || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Mechanical Seal Series */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Mechanical Seal Series"
              name="mechanicalSealSeries"
              value={formData.mechanicalSealSeries || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Connection Size */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Connection Size"
              name="connectionSize"
              value={formData.connectionSize || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Shaft Size */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Shaft Size"
              name="shaftSize"
              value={formData.shaftSize || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>



      {/* Mechanical Seal Data  -End */}


      {/*  Opration Parameter*/}




      {/* Operating parameter - Start*/}

      <div className='card'>
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Operating parameter :-</div></div>
        <Grid container spacing={2}>
          {/* Rotation */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Rotation"
              name="rotation"
              value={formData.rotation || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* MAWP */}
         <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="mawp"
  value={formData.mawp}
  onChange={handleChange}
  label="Mawp"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,mawp: `${prev.mawp.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData?.mawp?.length}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

          {!formData.mawp&&<MenuItem>Unit</MenuItem>}
      
            <MenuItem value="kg/cm2">kg/cm²</MenuItem>
            <MenuItem value="kg/cm2 a">kg/cm² (a)</MenuItem>
            <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>
            <MenuItem value="bar">bar</MenuItem>
            <MenuItem value="bar (a)">bar (a)</MenuItem>
            <MenuItem value="bar (g)">bar (g)</MenuItem>
            <MenuItem value="Mpa">MPa</MenuItem>
            <MenuItem value="Mpa (a)">MPa (a)</MenuItem>
            <MenuItem value="Mpa (g)">MPa (g)</MenuItem>
            <MenuItem value="Kpa">kPa</MenuItem>
            <MenuItem value="Kpa (g)">kPa (g)</MenuItem>
            <MenuItem value="PSI">PSI</MenuItem>
            <MenuItem value="PSIG">PSIG</MenuItem>
            <MenuItem value="MLC">MLC</MenuItem>
            <MenuItem value="MWC">MWC</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
            <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>


          {/* MAWT */}
          <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="mawt"
  value={formData.mawt}
  onChange={handleChange}
  label="MAWT"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,mawt: `${prev.mawt.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.mawt}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.mawt&&<MenuItem>Unit</MenuItem>}
      
      <MenuItem value="℃">℃</MenuItem>
      <MenuItem value="℉">℉</MenuItem>
    
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>

          {/* Suction Presuure */}
          <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="suctionPressure"
  value={formData.suctionPressure}
  onChange={handleChange}
  label="Suction Pressure"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,suctionPressure: `${prev.suctionPressure.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.suctionPressure}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.suctionPressure&&<MenuItem>Unit</MenuItem>}
      
<MenuItem value="kg/cm2">kg/cm²</MenuItem>
            <MenuItem value="kg/cm2 a">kg/cm² (a)</MenuItem>
            <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>
            <MenuItem value="bar">bar</MenuItem>
            <MenuItem value="bar (a)">bar (a)</MenuItem>
            <MenuItem value="bar (g)">bar (g)</MenuItem>
            <MenuItem value="Mpa">MPa</MenuItem>
            <MenuItem value="Mpa (a)">MPa (a)</MenuItem>
            <MenuItem value="Mpa (g)">MPa (g)</MenuItem>
            <MenuItem value="Kpa">kPa</MenuItem>
            <MenuItem value="Kpa (g)">kPa (g)</MenuItem>
            <MenuItem value="PSI">PSI</MenuItem>
            <MenuItem value="PSIG">PSIG</MenuItem>
            <MenuItem value="MLC">MLC</MenuItem>
            <MenuItem value="MWC">MWC</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
            <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>



          {/* Discharge Presuure */}
          <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="dischargePressure"
  value={formData.dischargePressure}
  onChange={handleChange}
  label="Discharge Pressure"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,dischargePressure: `${prev.dischargePressure.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.dischargePressure}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.dischargePressure&&<MenuItem>Unit</MenuItem>}
      
<MenuItem value="kg/cm2">kg/cm²</MenuItem>
            <MenuItem value="kg/cm2 a">kg/cm² (a)</MenuItem>
            <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>
            <MenuItem value="bar">bar</MenuItem>
            <MenuItem value="bar (a)">bar (a)</MenuItem>
            <MenuItem value="bar (g)">bar (g)</MenuItem>
            <MenuItem value="Mpa">MPa</MenuItem>
            <MenuItem value="Mpa (a)">MPa (a)</MenuItem>
            <MenuItem value="Mpa (g)">MPa (g)</MenuItem>
            <MenuItem value="Kpa">kPa</MenuItem>
            <MenuItem value="Kpa (g)">kPa (g)</MenuItem>
            <MenuItem value="PSI">PSI</MenuItem>
            <MenuItem value="PSIG">PSIG</MenuItem>
            <MenuItem value="MLC">MLC</MenuItem>
            <MenuItem value="MWC">MWC</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
            <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>



          {/* Box Pressure (Pump) */}
                   <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="boxPressure"
  value={formData.boxPressure}
  onChange={handleChange}
  label="Box Pressure (Pump)"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,boxPressure: `${prev.boxPressure.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.boxPressure}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.boxPressure&&<MenuItem>Unit</MenuItem>}
      
<MenuItem value="kg/cm2">kg/cm²</MenuItem>
            <MenuItem value="kg/cm2 a">kg/cm² (a)</MenuItem>
            <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>
            <MenuItem value="bar">bar</MenuItem>
            <MenuItem value="bar (a)">bar (a)</MenuItem>
            <MenuItem value="bar (g)">bar (g)</MenuItem>
            <MenuItem value="Mpa">MPa</MenuItem>
            <MenuItem value="Mpa (a)">MPa (a)</MenuItem>
            <MenuItem value="Mpa (g)">MPa (g)</MenuItem>
            <MenuItem value="Kpa">kPa</MenuItem>
            <MenuItem value="Kpa (g)">kPa (g)</MenuItem>
            <MenuItem value="PSI">PSI</MenuItem>
            <MenuItem value="PSIG">PSIG</MenuItem>
            <MenuItem value="MLC">MLC</MenuItem>
            <MenuItem value="MWC">MWC</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
            <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>


          {/* Speed */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Speed"
              name="speed"
              value={formData.speed || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Vessel Pressure (Agitator) */}

<Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="vesselPressure"
  value={formData.vesselPressure}
  onChange={handleChange}
  label="Vessel Pressure (Agitator)"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,vesselPressure: `${prev.vesselPressure.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.vesselPressure}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.vesselPressure&&<MenuItem>Unit</MenuItem>}
      
<MenuItem value="kg/cm2">kg/cm²</MenuItem>
            <MenuItem value="kg/cm2 a">kg/cm² (a)</MenuItem>
            <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>
            <MenuItem value="bar">bar</MenuItem>
            <MenuItem value="bar (a)">bar (a)</MenuItem>
            <MenuItem value="bar (g)">bar (g)</MenuItem>
            <MenuItem value="Mpa">MPa</MenuItem>
            <MenuItem value="Mpa (a)">MPa (a)</MenuItem>
            <MenuItem value="Mpa (g)">MPa (g)</MenuItem>
            <MenuItem value="Kpa">kPa</MenuItem>
            <MenuItem value="Kpa (g)">kPa (g)</MenuItem>
            <MenuItem value="PSI">PSI</MenuItem>
            <MenuItem value="PSIG">PSIG</MenuItem>
            <MenuItem value="MLC">MLC</MenuItem>
            <MenuItem value="MWC">MWC</MenuItem>
            <MenuItem value="Meter">Meter</MenuItem>
            <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>
        </Grid>
      </div>

      {/*  Operating parameter - End */}


      {/* Fluid Detail - Start*/}

      <div className='card'>
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Fluid Detail :-</div></div>
        <Grid container spacing={2}>
          {/* Fluid */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Fluid"
              name="fluid"
              value={formData.fluid || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Op. Temperature */}
          <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="operatingTemperature"
  value={formData.operatingTemperature}
  onChange={handleChange}
  label="Operating Temprature"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,operatingTemperature: `${prev.operatingTemperature.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.operatingTemperature}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.operatingTemperature&&<MenuItem>Unit</MenuItem>}
      
<MenuItem value="℃">℃</MenuItem>
  <MenuItem value="℉">℉</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>

          {/* Max Temperature */}
          <Grid item xs={4}>
<TextField
  size="small"
  className="custom-text-field"
  name="maxOperatingTemperature"
  value={formData.maxOperatingTemperature}
  onChange={handleChange}
  label="Max Operating Temprature"
  fullWidth
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
      <FormControl size="small" variant="outlined">
        {/* <InputLabel id="temperature-unit-label">Unit</InputLabel> */}
        <Select
          // labelId="temperature-unit-label" // Link the label to the select
          onChange= {(e) => { const selectedUnit = e.target.value;
            setFormData((prev) => ({
              ...prev,maxOperatingTemperature: `${prev.maxOperatingTemperature.split(' ')[0]} ${selectedUnit}`}))}}

          displayEmpty
          disabled={!formData.maxOperatingTemperature}
          disableUnderline
          sx={{
            height: '100%', // Set the dropdown height to match the TextField
            borderLeft: '1px solid rgba(0, 0, 0, 0.23)', // Only show left border
            borderRadius: 0, // Remove other borders
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, // Disable outline
            '& .MuiSelect-select': {
              padding: '0 8px',
              outline:'none',
              border: 'none',
              height: '100%', // Match height to TextField
              display: 'flex',
              alignItems: 'center',
            },
            minWidth: 60, // Width of dropdown
          }}>

{!formData.maxOperatingTemperature&&<MenuItem>Unit</MenuItem>}
      
<MenuItem value="℃">℃</MenuItem>
  <MenuItem value="℉">℉</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>

          {/* Viscosity */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Viscosity"
              name="viscosity"
              value={formData.viscosity || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Sp. Gravity */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Sp. Gravity"
              name="spGravity"
              value={formData.spGravity || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Percentage of Solid */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Percentage of Solid"
              name="percentageOfSolid"
              value={formData.percentageOfSolid || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Size of Solid Particles */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Size of Solid Particles"
              name="sizeOfSolidParticles"
              value={formData.sizeOfSolidParticles || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Freezing Point */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Freezing Point"
              name="freezingPoint"
              value={formData.freezingPoint || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>

          {/* Boiling Point */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Boiling Point"
              name="boilingPoint"
              value={formData.boilingPoint || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>

      {/* Fluid Detail -  End  */}


      {/* Existing Seal Support System Data =  Start */}

      <div className="card">
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Existing Seal Support System Data :-</div></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Make"
              name="make"
              value={formData.make || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="API Plan"
              name="apiPlan"
              value={formData.apiPlan || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Capacity"
              name="capacity"
              value={formData.capacity || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Reference API Plan Drawing Number"
              name="referenceApiPlanDrawingNumber"
              value={formData.referenceApiPlanDrawingNumber || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Type"
              name="heatExchangeType"
              value={formData.heatExchangeType || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Area"
              name="heatExchangeArea"
              value={formData.heatExchangeArea || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              size="small"
              className="custom-text-field"
              label="Standard"
              name="standard"
              value={formData.standard || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="" />
              <option value="API">API</option>
              <option value="Non-API">Non-API</option>
            </TextField>
          </Grid>
        </Grid>
      </div>


      {/* Existing-seal-support-system-data - End  */}


      {/* Leak Proof Proposal -  Start*/}

      <div className="card">
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Leak Proof Proposal :-</div></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="API Plan"
              name="apiPlanLeakProof"
              value={formData.apiPlanLeakProof || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Capacity"
              name="capacityLeakProof"
              value={formData.capacityLeakProof || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Type"
              name="heatExchangeTypeLeakProof"
              value={formData.heatExchangeTypeLeakProof || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Area"
              name="heatExchangeAreaLeakProof"
              value={formData.heatExchangeAreaLeakProof || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              size="small"
              className="custom-text-field"
              label="Standard"
              name="standardLeakProof"
              value={formData.standardLeakProof || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              SelectProps={{ native: true }}
            >
              <option value="" />
              <option value="API">API</option>
              <option value="Non-API">Non-API</option>
            </TextField>
          </Grid>
        </Grid>
      </div>


      {/* Leak Proof Proposal - End */}


      {/* MOC - Start */}

      <div className="card">
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">MOC :-</div></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Vessel"
              name="mocVessel"
              value={formData.mocVessel || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Cooling Coil"
              name="mocCoolingCoil"
              value={formData.mocCoolingCoil || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Piping and Fitting"
              name="mocPipingFitting"
              value={formData.mocPipingFitting || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Bladder"
              name="mocBladder"
              value={formData.mocBladder || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Structural Parts"
              name="mocStructuralParts"
              value={formData.mocStructuralParts || ''}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </div>


      {/* MOC - End */}


      {/* Instruments -  Start  */}

      <div className="card">
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Instruments :-</div></div>
        <Table className="instruments-table">
          <TableHead>
            <TableRow>
              <TableCell>Required Instruments or Any Loose Items</TableCell>
              <TableCell>Make of Instruments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instruments.map((instrument, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    value={instrument.required}
                    onChange={(e) => handleInstrumentChange(e, index, 'required')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder={`Required Instrument ${index + 1}`}
                    className="custom-text-field"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={instrument.make}
                    onChange={(e) => handleInstrumentChange(e, index, 'make')}
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder={`Make of Instrument ${index + 1}`}
                    className="custom-text-field"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteInstrumentRow(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          variant="contained"
          onClick={addInstrumentRow}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#3e3e3e'; // Darker shade on hover
            e.currentTarget.style.transform = 'scale(1.03)'; // Slight scale up
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#5a5a5a';
            e.currentTarget.style.transform = 'scale(1)';
          }}

          style={{ marginBottom: '15px' }} 
        >
          Add Instrument Row
        </Button>


        <Grid container spacing={2}>
          {/* Recommended Buffer or Barrier Fluid */}
          <Grid item xs={4}>
            <TextField
              className="custom-text-field"
              label="Recommended Buffer or Barrier Fluid (Limit of 150 Characters)"
              name="bufferFluid"
              value={formData.bufferFluid || ''}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
              
            />
          </Grid>

          {/* Accessories */}
          <Grid item xs={4}>
            <TextField
              className="custom-text-field"
              label="Accessories (Limit of 150 Characters)"
              name="accessories"
              value={formData.accessories || ''}
              onChange={handleChange}
              inputProps={{ maxLength: 150 }}
              variant="outlined"
              size="small"
              fullWidth
              
            />
          </Grid>

          {/* Remarks */}
          <Grid item xs={4}>
            <TextField
              className="custom-text-field"
              label="Remarks (Limit of 150 Characters)"
              name="remarks"
              value={formData.remarks || ''}
              onChange={handleChange}
              inputProps={{ maxLength: 150 }}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>

          {/* Attachments */}
          <Grid item xs={4}>
            <TextField
              className="custom-text-field"
              label="AVL"
              name="attachmentsAvl"
              value={formData.attachmentsAvl || ''}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className="custom-text-field"
              label="Specification"
              name="attachmentsSpecification"
              value={formData.attachmentsSpecification || ''}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              className="custom-text-field"
              label="Reference Mechanical Seal Drawing"
              name="attachmentsDrawing"
              value={formData.attachmentsDrawing || ''}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>



      </div>


      {/* Instruments -  End  */}







      <Grid item xs={4} style={{ marginLeft: "1rem", marginBottom: '1rem' }}>
        <Grid item xs={4}>

          {!apId ? (<Button className="submit-btn" type="submit" onClick={(e) => handleSubmit(e, formData, navigate)} variant="contained" >Submit</Button>) : (
            <>
              <Button className="update-btn" variant="contained" onClick={(e) => handleUpdate(e, formData, apId, navigate)} >Update</Button>
              <Button className="cancel-btn" variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
        </Grid>
      </Grid>
    </form>
  </Container>
  );

}



