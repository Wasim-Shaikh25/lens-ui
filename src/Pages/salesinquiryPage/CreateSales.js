import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  InputLabel,
  IconButton,
  Autocomplete,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPumpSeal } from '../../apis/PumpSealApi';
import {handleSubmit} from '../../apis/SalesInquiryApi'

import {handleUpdate} from '../../apis/SalesInquiryApi'

import { getColumnData } from '../../apis/PumpSealApi';
import dayjs from "dayjs";
import moment from "moment";
import { useAuth } from "../../contextApi/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';



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
  const loggedInUser = { name: "John Doe" }; // Hardcoded user data
  const [referenceNo, setReferenceNo] = useState("");
  const [createdOn, setCreatedOn] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  const [updatedOn, setUpdatedOn] = useState("");

  const seriesOptions = ['Option 1', 'Option 2', 'Option 3']; // Example series options
  const makeOptions = ['Make 1', 'Make 2', 'Make 3']; // Example make options
  const sizeOptions = ['Size 1', 'Size 2', 'Size 3']; // Example size options
  const mocOptions = ['MOC 1', 'MOC 2', 'MOC 3']; // Example MOC options
  const apiPlanOptions = ['Plan 1', 'Plan 2', 'Plan 3']; // Example API plan options
  const [performance, setPerformance] = useState("");

  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const { authState } = useAuth();


  // Common units for pressure-related fields
  const unitOptions = ["℃", "℉"];


  useEffect(() => {
    const generateReferenceNo = () => `SI-${Date.now()}`;
    setReferenceNo(generateReferenceNo());
  }, []);


  // Add new state for mechanical seal section
  const [sealType, setSealType] = useState("agitator");


  


const [formData, setFormData] = useState({
  salesInquiryReferenceNo: "",
  customerReferenceNo: "",
  customerName: "",
  customerAddress: "",
  contactPerson: "",
  mobileNumber: "",
  sourceOfInquiry: "",
  industry: "",
  branch: "",
  createdByUser: "",
  updatedByUser: "",
  pumpInquiries: [],
  agitatorInquiries: [],
  apiPlanInquiries: [],
  rotaryJointInquiries: []
})

  useEffect(() => {
    if (pId !== undefined) {
      getPumpSeal(pId, setFormData);
    }
  }, [pId]);


  const addItem = (inquiryType) => {
    const newItemTemplates = {
      agitatorInquiries:  {
        series: "",
        performance: "",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        sealArrangement: "",
        sealType:"",
        branch:"",
        existingSealMake: "",
        existingSealSize: "",
        existingSealMOC: "",
        existingSealApiPlan: "",
        vesselPressureOperating: "",
        vesselPressureOperatingUnit: "",
        vesselPressureDesign: "",
        vesselPressureDesignUnit: "",
        directionOfRotation: "",
        speed: "",
        fluid: "",
        nature: "",
        branch: "",
        pumpingTemperature: {
          value: "",
          unit: ""
        },
        maximumTemperature: {
          value: "",
          unit: ""
        },
        spGravity: "",
        freezingPoint: "",
        boilingPoint: "",
        viscosity: "",
        percentageOfSolid: "",
        solidSize: "",
        specialNote: "",
        createdByUser: "",
        updatedByUser: "",
        salesInquiryId: 0
      },
      pumpInquiries: {
        pumpInquiryReferenceNo: "",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        sealType:"",
        branch: "",
        make: "",
        model: "",
        pumpMOC: "",
        impellerCasingMOC: "",
        shaftMOC: "",
        bearingBKT: "",
        tagNumber: "",
        arrangement: "",
        pumpType: "",
        stage: "",
        casingType: "",
        series: "",
        performance: "",
        sealArrangement: "",
        existingSealMake: "",
        existingSealSize: "",
        existingSealMOC: "",
        existingSealApiPlan: "",
        suctionPressure: {  
          value: "",
          unit: ""
        },
        dischargePressure: {
          value: "",
          unit: ""
        },
        boxPressure: {
          value: "",
          unit: ""
        },
        totalHead: {
          value: "",
          unit: ""
        },
        pumpingTemperature: {
          value: "",
          unit: ""
        },
        maximumTemperature: {
         
          value: "",
          unit: ""
        },
        directionOfRotation: "",
        speed: "",
        fluid: "",
        nature: "",
        spGravity: "",
        freezingPoint: "",
        boilingPoint: "",
        viscosity: "",
        percentageOfSolid: "",
        solidSize: "",
        specialNote: "",
        salesInquiryId: 0
      },


      apiPlanInquiries: {
        apiPlanInquiryId: "",
        apiPlanInquiryReferenceNo: "",
        equipmentMake: "",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        sealType:"",
        branch:"",
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
        salesInquiryId: 0
      },
      rotaryJointInquiries:{
        rotaryJointInquiryId: "",
        rotaryJointInquiryReferenceNo: "",
        sealType:"",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        branch: "",
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
        existingRotaryJointMake: "",
        existingRotaryJointModelType: "",
        existingRotaryJointConnectionSize: "",
        existingRotaryJointConnectionType: "",
        jointType: "",
        proposedRotaryJointMake: "",
        proposedRotaryJointModelType: "",
        inletConnectionSize: "",
        outletConnectionSize: "",
        connectionType: "",
        handing: "",
        inletFlangedSize: "",
        outletFlangedSize: "",
        referenceDrawing: "",
        salesInquiryId: "",
        fileName: ""
      }
    };
    console.log("the add button is from",inquiryType)
    setFormData((prevData) => ({
      ...prevData,
      [inquiryType]: [...prevData[inquiryType], newItemTemplates[inquiryType]],
    }));
  };

  const removeItem = (inquiryType, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [inquiryType]: prevData[inquiryType].filter((_, i) => i !== index),
    }));
  };

  
 
  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  // Dynamically updating formData based on name
    }));
  };
  


const handleChange = (arrayName = null, index = null) => (event) => {
  const { name, value } = event.target;

  const updatedInquiries = [...formData[arrayName]];
  updatedInquiries[index] = {
    ...updatedInquiries[index],
    [name]: value
  };
  setFormData({
    ...formData,
    [arrayName]: updatedInquiries
  });
};


      console.log("formData after vp is",formData);  
  



  const handleSealTypeChange = (event) => {
    setSealType(event.target.value);
  };




  const cancelUpdate = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  };


//   const PumpData = ({index}) => (

//     <form>
//       <Grid container spacing={2} sx={{ marginTop: '10px' }}>
//         {/* Autogenerated Reference Number */}
//         <Grid item xs={4}>
//           <TextField
//             size="small"
//             className="custom-text-field"
//             label="Pump Inquiry Reference No."
//             value={item?.pumpInquiryReferenceNo}
//             disabled
//             fullWidth
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={4}>
//   <Autocomplete
//     size="small"
//     value={item?.branch || ''}
//     onChange={(event, newValue) => handleChange('pumpInquiries', index)({ target: { name: 'branch', value: newValue || '' } })}
//     options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
//     renderInput={(params) => (
//       <TextField
//         required
//         className="custom-text-field"
//         {...params}
//         size="small"
//         label="Branch"
//         variant="outlined"
//         fullWidth
//       />
//     )}
//   />
// </Grid>


//         {/* Created On (Autogenerated) */}
//         <Grid item xs={4}>
//           <TextField
//             size="small"
//             className="custom-text-field"
//             label="Created On"
//             value={dateTime} // Auto-generated value
//             disabled
//             fullWidth
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>


//             {/* Updated By User */}
//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 className="custom-text-field"
//                 label="Created By User"
//                 value={authState?.sub}
//                 id="disableItem"
//                 InputLabelProps={{
//                   shrink: Boolean(authState?.sub),
//                 }}
//                 autoFocus={authState?.sub} 
//                 InputProps={{
//                   readOnly: true, // Read-only for auto-generated field
//                 }}
//                 disabled
//                 fullWidth />
//             </Grid>


//             <Grid item xs={4}>
//               <TextField
//                 size="small"
//                 className="custom-text-field"
//                 label="Updated By User"
//                 value={authState?.sub}
//                 id="disableItem"
//                 InputLabelProps={{
//                   shrink: Boolean(authState?.sub),
//                 }}
//                 autoFocus={authState?.sub} 
//                 InputProps={{
//                   readOnly: true, // Read-only for auto-generated field
//                 }}
//                 disabled
//                 fullWidth />
//             </Grid>



//         {/* Updated On (Autogenerated) */}
//         <Grid item xs={4}>
//           <TextField
//             size="small"
//             className="custom-text-field"
//             label="Updated On"
//             value={dateTime} // Auto-generated value
//             disabled
//             fullWidth
//             InputProps={{ readOnly: true }}
//           />
//         </Grid>



//       </Grid>


//       {/*////////////////// 2nd form staring here   ///////  */}

//       <h3 style={{ padding: '10px 0' }}>Pump Data :-</h3>
//       <Grid container spacing={2}>
//         {/* Make */}

//        {/* Pump Make */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     label="Make"
//     name="make"
//     value={item?.make || ''}
//     onChange={handleChange('pumpInquiries', index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
// </Grid>

//         {/* Model */}
//         <Grid item xs={4}>
//   <TextField
//     size="small"
//     label="Model"
//     name="model"
//     value={item?.model || ''}
//     onChange={handleChange('pumpInquiries', index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
// </Grid>
//         {/* Pump MOC */}
 

//         {/* Impeller/Casing MOC */}
//         {/* Impeller/Casing MOC */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     label="Impeller/Casing MOC"
//     name="impellerCasingMOC"
//     value={item?.impellerCasingMOC || ''}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
// </Grid>

// {/* Shaft MOC */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     label="Shaft MOC"
//     name="shaftMOC"
//     value={item?.shaftMOC || ''}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
// </Grid>

// {/* Bearing BKT */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     label="Bearing BKT"
//     name="bearingBKT"
//     value={item?.bearingBKT || ''}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
// </Grid>

// {/* Tag Number */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     label="Tag Number"
//     name="tagNumber"
//     value={item?.tagNumber || ''}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
// </Grid>


//         {/* Arrangement (Autocomplete Dropdown) */}
//         <Grid item xs={4}>
//   <Autocomplete
//     size="small"
//     options={['Horizontal', 'Vertical']}
//     value={item?.arrangement || null} 
//     onChange={(event, newValue) => {
//       setFormData((prev) => {
//         const updatedPumpInquiry = [...prev.pumpInquiries];
//         updatedPumpInquiry[index] = {
//           ...updatedPumpInquiry[index],
//           arrangement: newValue, // Correctly update state
//         };
//         return { ...prev, pumpInquiries: updatedPumpInquiry };
//       });
//     }}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         size="small"
//         label="Arrangement"
//         variant="outlined"
//         fullWidth
//         className="custom-text-field"
//       />
//     )}
//   />
// </Grid>


//         {/* Pump Type (Autocomplete Dropdown) */}
//        {/* Pump Type */}
// <Grid item xs={4}>
//   <Autocomplete
//     value={item?.pumpType || ''}
//     onChange={(event, newValue) => {
//       setFormData((prev) => {
//         const updatedPumpInquiries = [...prev.pumpInquiries];
//         updatedPumpInquiries[index] = {
//           ...updatedPumpInquiries[index],
//           pumpType: newValue || "",
//         };
//         return { ...prev, pumpInquiries: updatedPumpInquiries };
//       });
//     }}
//     options={['Centrifugal', 'Positive Displacement']}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         size="small"
//         label="Pump Type"
//         variant="outlined"
//         fullWidth
//         className="custom-text-field"
//       />
//     )}
//   />
// </Grid>

// {/* Stage */}
// <Grid item xs={4}>
//   <Autocomplete
//     value={item?.stage || ''}
//     onChange={(event, newValue) => {
//       setFormData((prev) => {
//         const updatedPumpInquiries = [...prev.pumpInquiries];
//         updatedPumpInquiries[index] = {
//           ...updatedPumpInquiries[index],
//           stage: newValue || "",
//         };
//         return { ...prev, pumpInquiries: updatedPumpInquiries };
//       });
//     }}
//     options={['Single', 'Multiple']}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         size="small"
//         label="Stage"
//         variant="outlined"
//         fullWidth
//         className="custom-text-field"
//       />
//     )}
//   />
// </Grid>

// {/* Casing Type */}
// <Grid item xs={4}>
//   <Autocomplete
//     value={item?.casingType || ''}
//     onChange={(event, newValue) => {
//       setFormData((prev) => {
//         const updatedPumpInquiries = [...prev.pumpInquiries];
//         updatedPumpInquiries[index] = {
//           ...updatedPumpInquiries[index],
//           casingType: newValue || "",
//         };
//         return { ...prev, pumpInquiries: updatedPumpInquiries };
//       });
//     }}
//     options={['Split', 'Unsplitted']}
//     renderInput={(params) => (
//       <TextField
//         {...params}
//         size="small"
//         label="Casing Type"
//         variant="outlined"
//         fullWidth
//         className="custom-text-field"
//       />
//     )}
//   />
// </Grid>

//       </Grid>

//       {/* //////////////////////////////////3rd form ////////////////////// */}

//       <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>
//       <Grid container spacing={2}>
//         {/* Series */}
//         <Grid item xs={4}>
//         <TextField
//     size="small"
//     label="Series"
//     name="series"
//     value={item?.series || ''}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//     variant="outlined"
//     className="custom-text-field"
//   />
   
//   </Grid>

//         {/* Performance (Dropdown) */}
//         <Grid item xs={4}>
//     <Autocomplete
//       size="small"
//       options={['Satisfactory', 'Unsatisfactory']}
//       value={item?.performance || ''}
//       onChange={(event, newValue) => {
//         setFormData((prev) => {
//           const updatedPumpInquiry = [...prev.pumpInquiries];
//           updatedPumpInquiry[index] = {
//             ...updatedPumpInquiry[index],
//              performance: newValue ,
//           };
//           return { ...prev, pumpInquiries: updatedPumpInquiry };
//         });
//       }}
//       renderInput={(params) => <TextField {...params} label="Performance" variant="outlined" fullWidth className="custom-text-field" />}
//     />
//   </Grid>


//         {/* Seal Arrangement (Dropdown) */}
//         <Grid item xs={4}>
//     <Autocomplete
//       size="small"
//       options={['Single', 'Double']}
//       value={item?.sealArrangement || ''}
//       onChange={(event, newValue) => {
//         setFormData((prev) => {
//           const updatedPumpInquiry = [...prev.pumpInquiries];
//           updatedPumpInquiry[index] = {
//             ...updatedPumpInquiry[index],
//             sealArrangement: newValue || "" ,
//           };
//           return { ...prev, pumpInquiries: updatedPumpInquiry };
//         });
//       }}
//       renderInput={(params) => <TextField {...params} label="Seal Arrangement" variant="outlined" fullWidth className="custom-text-field" />}
//     />
//   </Grid>

//         {/* Make */}
//   {/* Make */}
//   <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     label="Make"
//     name="existingSealMake"
//     value={item?.existingSealMake || ""}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     label="Size"
//     name="existingSealSize"
//     value={item?.existingSealSize || ""}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     label="MOC"
//     name="existingSealMOC"
//     value={item?.existingSealMOC || ""}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     label="API Plan"
//     name="existingSealApiPlan"
//     value={item?.existingSealApiPlan || ""}
//     onChange={handleChange("pumpInquiries", index)}
//     fullWidth
//   />
// </Grid>

//  </Grid>

//  <h3 style={{ padding: '10px 0' }}>Parameters :-</h3>

//       <Grid container spacing={2}>
   
//       <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="suctionPressure"
//     value={item?.suctionPressure?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             suctionPressure: {
//               ...prev.pumpInquiries[index].suctionPressure,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Suction Pressure"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.suctionPressure?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       suctionPressure: {
//                         ...prev.pumpInquiries[index].suctionPressure,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.suctionPressure?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.suctionPressure?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="boxPressure"
//     value={item?.boxPressure?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             boxPressure: {
//               ...prev.pumpInquiries[index].boxPressure,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Box Pressure"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.boxPressure?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       boxPressure: {
//                         ...prev.pumpInquiries[index].boxPressure,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.boxPressure?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="dischargePressure"
//     value={item?.dischargePressure?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             dischargePressure: {
//               ...prev.pumpInquiries[index].dischargePressure,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Discharge Pressure"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.dischargePressure?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       dischargePressure: {
//                         ...prev.pumpInquiries[index].dischargePressure,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.dischargePressure?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>


// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="totalHead"
//     value={item?.totalHead?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             totalHead: {
//               ...prev.pumpInquiries[index].totalHead,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Total Head"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.totalHead?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       totalHead: {
//                         ...prev.pumpInquiries[index].totalHead,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.totalHead?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.totalHead?.value && <MenuItem>Unit</MenuItem>}
//               {["Meter", "MWC", "MLC", "kg/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>



// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="directionOfRotation"
//     value={item?.directionOfRotation || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             directionOfRotation: value
//           }
//         ]
//       }));
//     }}
//     label="Direction of Rotation"
//     fullWidth
//     select
//   >
//     <MenuItem value="CW">CW</MenuItem>
//     <MenuItem value="CCW">CCW</MenuItem>
//   </TextField>
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="speed"
//     value={item?.speed || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             speed: value
//           }
//         ]
//       }));
//     }}
//     label="Speed"
//     fullWidth
//   />
// </Grid>

//       </Grid>


//       {/* //////////// 5th section start ///////// */}

//       <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
//       <Grid container spacing={2}>
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Fluid"
//       name="fluid"
//       value={item?.fluid || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [
//             {
//               ...prev.pumpInquiries[index],
//               fluid: value,
//             },
//           ],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Nature */}
//   <Grid item xs={4}>
//     <Autocomplete
//       options={["Option 1", "Option 2", "Option 3"]} // Replace with actual options
//       renderInput={(params) => (
//         <TextField {...params} label="Nature" size="small" fullWidth className="custom-text-field" />
//       )}
//       onChange={(event, value) =>
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], nature: value }],
//         }))
//       }
//     />
//   </Grid>

//   {/* Pumping Temperature */}
// {/* Pumping Temperature */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="pumpingTemperature"
//     value={item?.pumpingTemperature?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             pumpingTemperature: {
//               ...prev.pumpInquiries[index].pumpingTemperature,
//               value,
//             },
//           },
//         ],
//       }));
//     }}
//     label="Pumping Temperature"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.pumpingTemperature?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       pumpingTemperature: {
//                         ...prev.pumpInquiries[index].pumpingTemperature,
//                         unit: selectedUnit,
//                       },
//                     },
//                   ],
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.pumpingTemperature?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                 },
//                 minWidth: 60,
//               }}
//             >
//               {!item?.pumpingTemperature?.value && <MenuItem>Unit</MenuItem>}
//               <MenuItem value="℃">℃</MenuItem>
//               <MenuItem value="℉">℉</MenuItem>
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

// {/* Maximum Temperature */}
// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="maximumTemperature"
//     value={item?.maximumTemperature?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             maximumTemperature: {
//               ...prev.pumpInquiries[index].maximumTemperature,
//               value,
//             },
//           },
//         ],
//       }));
//     }}
//     label="Maximum Temperature"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.maximumTemperature?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       maximumTemperature: {
//                         ...prev.pumpInquiries[index].maximumTemperature,
//                         unit: selectedUnit,
//                       },
//                     },
//                   ],
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.maximumTemperature?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center",
//                 },
//                 minWidth: 60,
//               }}
//             >
//               {!item?.maximumTemperature?.value && <MenuItem>Unit</MenuItem>}
//               <MenuItem value="℃">℃</MenuItem>
//               <MenuItem value="℉">℉</MenuItem>
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>


//   {/* SP Gravity */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="SP Gravity"
//       name="spGravity"
//       value={item?.spGravity || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], spGravity: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Freezing Point */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Freezing Point"
//       name="freezingPoint"
//       value={item?.freezingPoint || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], freezingPoint: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Boiling Point */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Boiling Point"
//       name="boilingPoint"
//       value={item?.boilingPoint || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], boilingPoint: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Viscosity */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Viscosity"
//       name="viscosity"
//       value={item?.viscosity || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], viscosity: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Percentage of Solid */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Percentage of Solid"
//       name="percentageOfSolid"
//       value={item?.percentageOfSolid || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], percentageOfSolid: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Solid Size */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Solid Size"
//       name="solidSize"
//       value={item?.solidSize || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], solidSize: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Special Note */}
//   <Grid item xs={4}>
//     <TextField
//       size="small"
//       label="Special Note"
//       name="specialNote"
//       value={item?.specialNote || ""}
//       onChange={(e) => {
//         const value = e.target.value;
//         setFormData((prev) => ({
//           ...prev,
//           pumpInquiries: [{ ...prev.pumpInquiries[index], specialNote: value }],
//         }));
//       }}
//       fullWidth
//       className="custom-text-field"
//       inputProps={{ maxLength: 150 }}
//     />
//   </Grid>
// </Grid>

//     </form>
//   );



  ///////////////// Agitor from ////////////////////
   //pass the index as a parameter here so that it can be dynamically managed   
//   const Agitator =React.memo (({index, item}) => (


//     <div key={index}>
//       <Grid container spacing={2} style={{ marginTop: "10px" }}>
//         {/* Sales Inquiry Item Reference No */}
//         <Grid item xs={4}>
//           <TextField
//             label="Sales Inquiry Item Reference No."
//             value={item?.agitatorInquiryReferenceNo}
//             InputProps={{ readOnly: true }}
//             size="small"
//             fullWidth
//             id="disableItem"
//             disabled
//             className="custom-text-field"
//           />
//         </Grid>

//         <Grid item xs={12} sm={4}>
//   <Autocomplete
//     size="small"
//     value={item?.branch || ''}
//     onChange={(event, newValue) => {
//       setFormData((prevState) => ({
//         ...prevState,
//         agitatorInquiries: [
//           {
//             ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
//             branch: newValue || "", // Update the 'branch' property
//           },
//         ],
//       }));
//     }}
    
//     inputValue={formData?.agitatorInquiries[index]?.branch || ''}
//     onInputChange={(event, newInputValue) => {
//       setFormData((prevState) => ({
//         ...prevState,
//         agitatorInquiries: [
//           {
//             ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
//             branch: newInputValue || "", // Update the 'branch' property
//           },
//         ],
//       }));
//     }}
//     options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
//     renderInput={(params) => (
//       <TextField
//         required
//         className="custom-text-field"
//         {...params}
//         size="small"
//         label="Branch"
//         variant="outlined"
//         fullWidth

//       />
//     )}
//   />
// </Grid>

//         {/* Created By User */}
//         <Grid item xs={4}>
//           <TextField
//             label="Created By User"
//             value={authState?.sub}
//             InputProps={{ readOnly: true }}
//             size="small"
//             fullWidth
//             id="disableItem"
//             disabled
//             className="custom-text-field"
//           />
//         </Grid>



//         {/* Created On */}
//         <Grid item xs={4}>
//           <TextField
//             label="Created On"
//             value={dateTime}
//             InputProps={{ readOnly: true }}
//             size="small"
//             id="disableItem"
//             fullWidth
//             disabled
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Updated By User */}
//         <Grid item xs={4}>
//           <TextField
//             label="Updated By User"
//             value={authState?.sub}
//             InputProps={{ readOnly: true }}
//             size="small"
//             fullWidth
//             id="disableItem"
//             disabled
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Updated On */}
//         <Grid item xs={4}>
//           <TextField
//             label="Updated On"
//             value={dateTime}
//             id="disableItem"
//             InputProps={{ readOnly: true }}
//             size="small"
//             fullWidth
//             disabled
//             className="custom-text-field"
//           />
//         </Grid>
//       </Grid>

//       {/* //////// 2nd form ///////////// */}

//       <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

//       <Grid container spacing={2}>
//         {/* Series */}
//         <Grid item xs={4}>
//        <TextField
//           label="Series"
//           name="series" // This is used to identify the property dynamically
//           value={item?.series || ""}
//           onChange={handleChange("agitatorInquiries",index)} // Specify array name and index
//           size="small"
//           fullWidth
//           className="custom-text-field" />
//         </Grid>



// <Grid item xs={4}>
// <Autocomplete
//   style={{ width: "100%" }}
//   size="small"
//   value={formData?.agitatorInquiries[index]?.sealArrangement || ""}
//   onChange={(event, newValue) =>
//     handleChange("agitatorInquiries", index)({
//       target: { name: "sealArrangement", value: newValue || "" },
//     })
//   }
//   options={["Single", "Double"]}
//   renderInput={(params) => (
//     <TextField
//       size="small"
//       {...params}
//       placeholder="Seal Arrangement"
//       variant="outlined"
//       className="custom-text-field"
//       fullWidth
//       label="Seal Arrangement"
//     />
//   )}
// />

// </Grid>


//         <Grid item xs={4}>
//           <Autocomplete
//             style={{ width: '100%' }}
//             size="small"
//         value={formData?.agitatorInquiries[index]?.performance || ""}
//             onChange={(event, newValue) => {
//               setFormData({
//                 ...formData,
//                 agitatorInquiries: [
//                   {
//                     ...item,
//                     performance: newValue || "", // Update the sealArrangement field
//                   },
//                 ],
//               });
//             }}
//             options={['Satisfactory', 'Unsatisfactory']}
//             renderInput={(params) => (
//               <TextField
//                 size="small"
//                 {...params}
//                 placeholder="Performance"
//                 variant="outlined"
//                 className='custom-text-field'
//                 fullWidth
//                 label="Performance"
//               />
//             )}
//           />
//         </Grid>


//         {/* Make */}
//         <Grid item xs={4}>
//           <TextField
//             label="Make"
//             name="existingSealMake"
//           value={formData?.agitatorInquiries[index]?.existingSealMake}
//             onChange={handleChange("agitatorInquiries",index)}
//             size="small"
//             fullWidth
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Size */}
//         <Grid item xs={4}>
//           <TextField
//             label="Size"
//             name="existingSealSize"
//             value={item?.existingSealSize}
//             onChange={handleChange("agitatorInquiries",index)}
//             size="small"
//             fullWidth
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* MOC */}
//         <Grid item xs={4}>
//           <TextField
//             label="MOC"
//             name="existingSealMOC"
//             value={item?.existingSealMOC}
//             onChange={handleChange("agitatorInquiries",index)}
//             size="small"
//             fullWidth
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* API Plan */}
//         <Grid item xs={4}>
//           <TextField
//             label="API Plan"
//             name="existingSealApiPlan"
//             value={item?.existingSealApiPlan}
//             onChange={handleChange("agitatorInquiries",index)}
//             size="small"
//             fullWidth
//             className="custom-text-field"
//           />
//         </Grid>
//       </Grid>

//       {/*///////////////3rd form ////////////// */}

//       <h3 style={{ padding: '10px 0' }}>Operating Parameters And Fluid Detail :-</h3>

//       <Grid container spacing={2}>
//         {/* Vessel Pressure (Operating) */}


// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="vesselPressureOperating"
//     value={item?.vesselPressureOperating}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         agitatorInquiries: [
//           {
//             ...prev.agitatorInquiries[index],
//             vesselPressureOperating: +value
//           }
//         ]
//       }));
//     }}
//     label="Vessel Pressure (Operating)"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.vesselPressureOperatingUnit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   agitatorInquiries: [
//                     {
//                       ...prev.agitatorInquiries[index],
//                       vesselPressureOperatingUnit: selectedUnit
//                     }
//                   ]
//                 }));
          
                
//               }}
//               displayEmpty
//               disabled={!item?.vesselPressureOperating}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Unit
//               </MenuItem>
//               <MenuItem value="kg/cm2">kg/cm²</MenuItem>
//               <MenuItem value="kg/cm2 a">kg/cm² (a)</MenuItem>
//               <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>
//               <MenuItem value="bar">bar</MenuItem>
//               <MenuItem value="bar (a)">bar (a)</MenuItem>
//               <MenuItem value="bar (g)">bar (g)</MenuItem>
//               <MenuItem value="Mpa">MPa</MenuItem>
//               <MenuItem value="Mpa (a)">MPa (a)</MenuItem>
//               <MenuItem value="Mpa (g)">MPa (g)</MenuItem>
//               <MenuItem value="Kpa">kPa</MenuItem>
//               <MenuItem value="Kpa (g)">kPa (g)</MenuItem>
//               <MenuItem value="PSI">PSI</MenuItem>
//               <MenuItem value="PSIG">PSIG</MenuItem>
//               <MenuItem value="MLC">MLC</MenuItem>
//               <MenuItem value="MWC">MWC</MenuItem>
//               <MenuItem value="Meter">Meter</MenuItem>
//               <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       )
//     }}
//   />
// </Grid>



//         <Grid item xs={4}>
//         <TextField
//     size="small"
//     type="number"
//     className="custom-text-field"
//     name="vesselPressureDesign"
//     value={item?.vesselPressureDesign}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         agitatorInquiries: [
//           {
//             ...prev.agitatorInquiries[index],
//             vesselPressureDesign: +value
//           }
//         ]
//       }));
//     }}
//     label="Vessel Pressure (Design)"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.vesselPressureDesignUnit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   agitatorInquiries: [
//                     {
//                       ...prev.agitatorInquiries[index],
//                       vesselPressureDesignUnit: selectedUnit
//                     }
//                   ]
//                 }));
          
                
//               }}
//               displayEmpty
//               disabled={!item?.vesselPressureDesign}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Unit
//               </MenuItem>
//               <MenuItem value="MLC">MLC</MenuItem>
//               <MenuItem value="MWC">MWC</MenuItem>
//               <MenuItem value="Meter">Meter</MenuItem>
//               <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>




      




//         {/* Direction of Rotation */}
//         <Grid item xs={4}>
//           <Autocomplete
//             size="small"
//             value={item?.directionOfRotation}
//             onChange={(event, newValue) => {
//               setFormData((prevState) => ({
//                 ...prevState,
//                 agitatorInquiries: [
//                   {
//                     ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
//                     directionOfRotation: newValue || "", // Update the 'branch' property
//                   },
//                 ],
//               }));
//             }}
//             options={['CW', 'CCW']}
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Direction of Rotation"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 className="custom-text-field"
//               />
//             )}
//           />
//         </Grid>

//         {/* Speed */}
//         <Grid item xs={4}>
//           <TextField
//             label="Speed"
//             type="number"
//             name="speed"
//             value={item?.speed}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>
//       </Grid>

//       {/*/////////////// 4th form /////////////// */}
//       <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
//       <Grid container spacing={2}>
//         {/* Fluid */}
//         <Grid item xs={4}>
//           <TextField
//             label="Fluid"
//             name="fluid"
//             value={item?.fluid}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>


//         {/* Nature */}
//         <Grid item xs={4}>
//           <Autocomplete
//             size="small"
//             value={item?.nature}
//             onChange={(event, newValue) => {
//               setFormData((prevState) => ({
//                 ...prevState,
//                 agitatorInquiries: [
//                   {
//                     ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
//                     nature: newValue || "", // Update the 'branch' property
//                   },
//                 ],
//               }));
//             }}
//             options={['Option1', 'Option2']} // Replace with actual nature options
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 label="Nature"
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 className="custom-text-field"
//               />
//             )}
//           />
//         </Grid>

//         {/* Pumping Temperature */}
//          <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="pumpingTemperature"
//     value={item?.pumpingTemperature?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         agitatorInquiries: [
//           {
//             ...prev.agitatorInquiries[index],
//             pumpingTemperature: {
//               ...prev.agitatorInquiries[index]?.pumpingTemperature,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Pumping Temperature"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.pumpingTemperature?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   agitatorInquiries: [
//                     {
//                       ...prev.agitatorInquiries[index],
//                       pumpingTemperature: {
//                         ...prev.agitatorInquiries[index]?.pumpingTemperature,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.pumpingTemperature?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Unit
//               </MenuItem>
//               <MenuItem value="℃">℃ </MenuItem>
//               <MenuItem value="℉">℉</MenuItem>
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>


//         {/* Maximum Temperature */}
//   <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="maximumTemperature"
//     value={item?.maximumTemperature?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         agitatorInquiries: [
//           {
//             ...prev.agitatorInquiries[index],
//             maximumTemperature: {
//               ...prev.agitatorInquiries[index]?.maximumTemperature,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Maximum Temperature"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.maximumTemperature?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   agitatorInquiries: [
//                     {
//                       ...prev.agitatorInquiries[index],
//                       maximumTemperature: {
//                         ...prev.agitatorInquiries[index]?.maximumTemperature,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.maximumTemperature?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               <MenuItem value="" disabled>
//                 Unit
//               </MenuItem>
//               <MenuItem value="℃">℃ </MenuItem>
//               <MenuItem value="℉">℉</MenuItem>
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>



//         {/* SP Gravity */}
//         <Grid item xs={4}>
//           <TextField
//             label="SP Gravity"
//             name="spGravity"
//             value={item?.spGravity}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Freezing Point */}
//         <Grid item xs={4}>
//           <TextField
//             label="Freezing Point"
//             name="freezingPoint"
//             value={item?.freezingPoint}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Boiling Point */}
//         <Grid item xs={4}>
//           <TextField
//             label="Boiling Point"
//             name="boilingPoint"
//             value={item?.boilingPoint}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Viscosity */}
//         <Grid item xs={4}>
//           <TextField
//             label="Viscosity"
//             name="viscosity"
//             value={item?.viscosity}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Percentage Of Solid */}
//         <Grid item xs={4}>
//           <TextField
//             label="Percentage Of Solid"
//             name="percentageOfSolid"
//             value={item?.percentageOfSolid}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Solid Size */}
//         <Grid item xs={4}>
//           <TextField
//             label="Solid Size"
//             name="solidSize"
//             value={item?.solidSize}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//           />
//         </Grid>

//         {/* Special Note */}
//         <Grid item xs={4}>
//           <TextField
//             label="Special Note"
//             name="specialNote"
//             value={formData.agitatorInquiries?.specialNote}
//             onChange={handleChange("agitatorInquiries",index)}
//             fullWidth
//             size="small"
//             variant="outlined"
//             className="custom-text-field"
//             inputProps={{ maxLength: 150 }}
//           />
//         </Grid>
//       </Grid>
      

//     </div>
//   )
// )
  // Api plane Section

//   const ApiPlane = ({index}) => (
//     <form>
//       <div>
//         <Grid container spacing={2} style={{ marginTop: "10px" }}>
//           {/* Sales Inquiry Item Reference No. */}
//           <Grid item xs={4}>
//             <TextField
//               label="Sales Inquiry Item Reference No."
//               name="salesInquiryRefNo"
//               value={formData?.apiPlanInquiries[index]?.salesInquiryRefNo}
//               fullWidth
//               disabled
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//               id="disableItem"
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>


//           {/* Created On */}
//           <Grid item xs={4}>
//             <TextField
//               label="Created On *"
//               name="createdOn"
//               value={dateTime}
//               fullWidth
//               id="disableItem"
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>


//           {/* Updated On */}
//           <Grid item xs={4}>
//             <TextField
//               label="Updated On"
//               name="updatedOn"
//               value={dateTime}
//               id="disableItem"
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid item xs={4}>
//             <TextField
//               label="Created By"
//               value={authState?.sub}
//               id="disableItem"
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid item xs={4}>
//             <TextField
//               label="Updated By"
//               value={authState?.sub}
//               id="disableItem"
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>


//         </Grid>

//         {/* 1st Form ll */}
//         <h3 style={{ padding: '10px 0' }}>Equipment Detail :-</h3>
// <Grid container spacing={2}>
//   {/* Make */}
//   <Grid item xs={4}>
//     <TextField
//       label="Make"
//       name="make"
//       value={formData?.apiPlanInquiries?.[index]?.make || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Model */}
//   <Grid item xs={4}>
//     <TextField
//       label="Model"
//       name="model"
//       value={formData?.apiPlanInquiries?.[index]?.model || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Type */}
//   <Grid item xs={4}>
//     <TextField
//       label="Type"
//       name="type"
//       value={formData?.apiPlanInquiries?.[index]?.type || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Arrangement */}
//   <Grid item xs={4}>
//     <Autocomplete
//       size="small"
//       options={["Horizontal", "Vertical"]}
//       getOptionLabel={(option) => option}
//       value={formData?.apiPlanInquiries?.[index]?.arrangement || null}
//       onChange={(event, newValue) => {
//         setFormData((prev) => {
//           const updatedApiPlanInquiry = [...prev.apiPlanInquiries];
//           updatedApiPlanInquiry[index] = {
//             ...updatedApiPlanInquiry[index],
//             arrangement: newValue || "",
//           };
//           return { ...prev, apiPlanInquiries: updatedApiPlanInquiry };
//         });
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Arrangement"
//           variant="outlined"
//           className="custom-text-field"
//           fullWidth
//         />
//       )}
//     />
//   </Grid>

//   {/* Tag Number */}
//   <Grid item xs={4}>
//     <TextField
//       label="Tag Number"
//       name="tagNumber"
//       value={formData?.apiPlanInquiries?.[index]?.tagNumber || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Pump MOC */}
//   <Grid item xs={4}>
//     <TextField
//       label="Pump MOC"
//       name="pumpMoc"
//       value={formData?.apiPlanInquiries?.[index]?.pumpMoc || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>
// </Grid>


//         {/*////////////// 3rd from //////////////// */}

//         <h3 style={{ padding: '10px 0' }}>Mechanical Seal Data :-</h3>
//         <Grid container spacing={2}>
//   {/* Drawing Number */}
//   <Grid item xs={4}>
//     <TextField
//       label="Drawing Number"
//       name="drawingNumber"
//       value={formData?.apiPlanInquiries?.[index]?.drawingNumber || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Mechanical Seal Make */}
//   <Grid item xs={4}>
//     <TextField
//       label="Mechanical Seal Make"
//       name="mechanicalSealMake"
//       value={formData?.apiPlanInquiries?.[index]?.mechanicalSealMake || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Mechanical Seal Series */}
//   <Grid item xs={4}>
//     <TextField
//       label="Mechanical Seal Series"
//       name="mechanicalSealSeries"
//       value={formData?.apiPlanInquiries?.[index]?.mechanicalSealSeries || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Connection Size */}
//   <Grid item xs={4}>
//     <TextField
//       label="Connection Size"
//       name="connectionSize"
//       value={formData?.apiPlanInquiries?.[index]?.connectionSize || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Shaft Size */}
//   <Grid item xs={4}>
//     <TextField
//       label="Shaft Size"
//       name="shaftSize"
//       value={formData?.apiPlanInquiries?.[index]?.shaftSize || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>
// </Grid>


//         {/*//////////// 4th From section /////////////// */}

//         <h3 style={{ padding: '10px 0' }}>Operating Parameters :-</h3>
//         <Grid container spacing={2}>
//           {/* Rotation */}
//           <Grid item xs={4}>
//             <TextField
//               label="Rotation"
//               name="rotation"
//               value={formData.apiPlanInquiries[index]?.rotation}
//               onChange={handleChange("apiPlanInquiries",0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* MAWP */}
//           <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="mawp"
//     value={formData.apiPlanInquiries[index].mawp?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             mawp: {
//               ...prev.apiPlanInquiries[index].mawp,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="MAWP"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].mawp?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       mawp: {
//                         ...prev.apiPlanInquiries[index].mawp,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].mawp?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!formData.apiPlanInquiries[index].mawp?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

//           {/* MAWT */}
//           <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="mawt"
//     value={formData.apiPlanInquiries[index].mawt?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             mawt: {
//               ...prev.apiPlanInquiries[index].mawt,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="MAWT"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].mawt?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       mawt: {
//                         ...prev.apiPlanInquiries[index].mawt,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].mawt?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!formData.apiPlanInquiries[index].mawt?.value && <MenuItem>Unit</MenuItem>}
//               {["℃","℉"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

//           {/* Suction Pressure */}
//           <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="suctionPressure"
//     value={item?.suctionPressure?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         pumpInquiries: [
//           {
//             ...prev.pumpInquiries[index],
//             suctionPressure: {
//               ...prev.pumpInquiries[index].suctionPressure,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Suction Pressure"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={item?.suctionPressure?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   pumpInquiries: [
//                     {
//                       ...prev.pumpInquiries[index],
//                       suctionPressure: {
//                         ...prev.pumpInquiries[index].suctionPressure,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!item?.suctionPressure?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.suctionPressure?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="boxPressure"
//     value={formData.apiPlanInquiries[index].boxPressure?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             boxPressure: {
//               ...prev.apiPlanInquiries[index].boxPressure,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Box Pressure"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].boxPressure?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       boxPressure: {
//                         ...prev.apiPlanInquiries[index].boxPressure,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].boxPressure?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="dischargePressurePump"
//     value={formData.apiPlanInquiries[index].dischargePressurePump?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             dischargePressurePump: {
//               ...prev.apiPlanInquiries[index].dischargePressurePump,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Discharge Pressure"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].dischargePressurePump?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       dischargePressurePump: {
//                         ...prev.apiPlanInquiries[index].dischargePressurePump,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].dischargePressurePump?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!item?.dischargePressurePump?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

//           {/* Speed */}
//           <Grid item xs={4}>
//             <TextField
//               label="Speed"
//               name="speed"
//               value={formData?.apiPlanInquiries[index]?.speed}
//               onChange={handleChange("apiPlanInquiries",0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Vessel Pressure */}
//           <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="vesselPressureAgitator"
//     value={formData.apiPlanInquiries[index].vesselPressureAgitator?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             vesselPressureAgitator: {
//               ...prev.apiPlanInquiries[index].vesselPressureAgitator,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Vessel Pressure(Agitator)"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].vesselPressureAgitator?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       vesselPressureAgitator: {
//                         ...prev.apiPlanInquiries[index].vesselPressureAgitator,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].vesselPressureAgitator?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!formData.apiPlanInquiries[index].vesselPressureAgitator?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

//         </Grid>

//         {/*/////////// 5th from/////////////////// */}
//         <h3 style={{ padding: '10px 0' }}>Fluid Details :-</h3>
//         <Grid container spacing={2}>
//           {/* Fluid */}
//           <Grid item xs={4}>
//             <TextField
//               label="Fluid"
//               name="fluid"
//               value={formData?.apiPlanInquiries[index]?.fluid}
//               onChange={handleChange("apiPlanInquiries",0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Operating Temperature */}
//           <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="operatingTemperature"
//     value={formData.apiPlanInquiries[index].operatingTemperature?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             operatingTemperature: {
//               ...prev.apiPlanInquiries[index].operatingTemperature,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="OP.Temprature"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].operatingTemperature?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       operatingTemperature: {
//                         ...prev.apiPlanInquiries[index].operatingTemperature,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].operatingTemperature?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!formData.apiPlanInquiries[index].operatingTemperature?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

//           {/* Max Temperature */}
//           <Grid item xs={4}>
//   <TextField
//     size="small"
//     className="custom-text-field"
//     name="maxTemperature"
//     value={formData.apiPlanInquiries[index].maxTemperature?.value || ""}
//     onChange={(e) => {
//       const value = e.target.value;
//       setFormData((prev) => ({
//         ...prev,
//         apiPlanInquiries: [
//           {
//             ...prev.apiPlanInquiries[index],
//             maxTemperature: {
//               ...prev.apiPlanInquiries[index].maxTemperature,
//               value
//             }
//           }
//         ]
//       }));
//     }}
//     label="Max Temprature"
//     fullWidth
//     InputProps={{
//       endAdornment: (
//         <InputAdornment position="end">
//           <FormControl size="small" variant="outlined">
//             <Select
//               value={formData.apiPlanInquiries[index].maxTemperature?.unit || ""}
//               onChange={(e) => {
//                 const selectedUnit = e.target.value;
//                 setFormData((prev) => ({
//                   ...prev,
//                   apiPlanInquiries: [
//                     {
//                       ...prev.apiPlanInquiries[index],
//                       maxTemperature: {
//                         ...prev.apiPlanInquiries[index].maxTemperature,
//                         unit: selectedUnit
//                       }
//                     }
//                   ]
//                 }));
//               }}
//               displayEmpty
//               disabled={!formData.apiPlanInquiries[index].maxTemperature?.value}
//               sx={{
//                 height: "100%",
//                 borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
//                 borderRadius: 0,
//                 "& .MuiOutlinedInput-notchedOutline": { border: "none" },
//                 "& .MuiSelect-select": {
//                   padding: "0 8px",
//                   outline: "none",
//                   border: "none",
//                   height: "100%",
//                   display: "flex",
//                   alignItems: "center"
//                 },
//                 minWidth: 60
//               }}
//             >
//               {!formData.apiPlanInquiries[index].maxTemperature?.value && <MenuItem>Unit</MenuItem>}
//               {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
//                 <MenuItem key={unit} value={unit}>
//                   {unit}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </InputAdornment>
//       ),
//     }}
//   />
// </Grid>

//           {/* Viscosity */}
//           <Grid item xs={4}>
//             <TextField
//               label="Viscosity"
//               name="viscosity"
//               value={formData?.apiPlanInquiries?.[index]?.viscosity || ""}
//               onChange={handleChange("apiPlanInquiries", 0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Specific Gravity */}
//           <Grid item xs={4}>
//             <TextField
//               label="Sp. Gravity"
//               name="specificGravity"
//               value={formData?.apiPlanInquiries?.[index]?.specificGravity || ""}
//               onChange={handleChange("apiPlanInquiries", 0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Percentage of Solid */}
//           <Grid item xs={4}>
//             <TextField
//               label="Percentage of Solid"
//               name="percentageSolid"
//               value={formData?.apiPlanInquiries?.[index]?.percentageSolid || ""}
//               onChange={handleChange("apiPlanInquiries", 0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Size of Solid Particles */}
//           <Grid item xs={4}>
//             <TextField
//               label="Size of Solid Particles"
//               name="solidParticleSize"
//               value={formData?.apiPlanInquiries?.[index]?.solidParticleSize || ""}
//               onChange={handleChange("apiPlanInquiries", 0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Freezing Point */}
//           <Grid item xs={4}>
//             <TextField
//               label="Freezing Point"
//               name="freezingPoint"
//               value={formData?.apiPlanInquiries?.[index]?.freezingPoint || ""}
//               onChange={handleChange("apiPlanInquiries", 0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//           {/* Boiling Point */}
//           <Grid item xs={4}>
//             <TextField
//               label="Boiling Point"
//               name="boilingPoint"
//               value={formData?.apiPlanInquiries?.[index]?.boilingPoint || ""}
//               onChange={handleChange("apiPlanInquiries", 0)}
//               fullWidth
//               size="small"
//               variant="outlined"
//               className="custom-text-field"
//             />
//           </Grid>

//         </Grid>

//         {/*//////////// 6th form //////////////////// */}

//         <h3 style={{ padding: '10px 0' }}>Leak Proof Proposal :-</h3>
//         <Grid container spacing={2}>
//   {/* API Plan */}
//   <Grid item xs={4}>
//     <TextField
//       label="API Plan"
//       name="leakProofProposalApiPlan"
//       value={formData?.apiPlanInquiries?.[index]?.leakProofProposalApiPlan || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Capacity */}
//   <Grid item xs={4}>
//     <TextField
//       label="Capacity"
//       name="capacity"
//       value={formData?.apiPlanInquiries?.[index]?.capacity || ""}
//       onChange={handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Heat Exchange Type */}
//   <Grid item xs={4}>
//     <TextField
//       label="Heat Exchange Type"
//       name="heatExchangeType"
//       value={formData?.apiPlanInquiries?.[index]?.heatExchangeType || ""}
//       onChange={ handleChange("apiPlanInquiries", 0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Heat Exchange Area */}
//   <Grid item xs={4}>
//     <TextField
//       label="Heat Exchange Area"
//       name="heatExchangeArea"
//       value={formData?.apiPlanInquiries?.[index]?.heatExchangeArea || ""}
//       onChange={handleChange("apiPlanInquiries",0)}
//       fullWidth
//       size="small"
//       variant="outlined"
//       className="custom-text-field"
//     />
//   </Grid>

//   {/* Standard */}
//   <Grid item xs={4}>
//           <Autocomplete
//             style={{ width: '100%' }}
//             size="small"
//         value={formData?.apiPlanInquiries[index]?.standard || ""}
//             onChange={(event, newValue) => {
//               setFormData({
//                 ...formData,
//                 apiPlanInquiries: [
//                   {
//                     ...formData.apiPlanInquiries[index],
//                     standard: newValue || "", // Update the sealArrangement field
//                   },
//                 ],
//               });
//             }}
//             options={['API', 'Non-API']}
//             renderInput={(params) => (
//               <TextField
//                 size="small"
//                 {...params}
//                 placeholder="Standard"
//                 variant="outlined"
//                 className='custom-text-field'
//                 fullWidth
//                 label="Standard"
//               />
//             )}
//           />
//         </Grid>


// </Grid>



//       </div>
//     </form>
//   );

  const Rotatoryjoin = ({index}) => (
    <form>
      <div>
        
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {/* Sales Inquiry Item Reference No */}
        <Grid item xs={4}>
          <TextField
            label="Sales Inquiry Item Reference No."
            value={formData.rotaryJointInquiries[index]?.rotaryJointInquiryReferenceNo}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            id="disableItem"
            disabled
            className="custom-text-field"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData.rotaryJointInquiries[index]?.branch || ''}
    onChange={(event, newValue) => {
      setFormData((prevState) => ({
        ...prevState,
        rotaryJointInquiries: [
          {
            ...prevState.rotaryJointInquiries[index], // Keep the other fields of the first object intact
            branch: newValue || "", // Update the 'branch' property
          },
        ],
      }));
    }}
    
    inputValue={formData?.rotaryJointInquiries[index]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      setFormData((prevState) => ({
        ...prevState,
        rotaryJointInquiries: [
          {
            ...prevState.rotaryJointInquiries[index], // Keep the other fields of the first object intact
            branch: newInputValue || "", // Update the 'branch' property
          },
        ],
      }));
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth

      />
    )}
  />
</Grid>

        {/* Created By User */}
        <Grid item xs={4}>
          <TextField
            label="Created By User"
            value={authState?.sub}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            id="disableItem"
            disabled
            className="custom-text-field"
          />
        </Grid>



        {/* Created On */}
        <Grid item xs={4}>
          <TextField
            label="Created On"
            value={dateTime}
            InputProps={{ readOnly: true }}
            size="small"
            id="disableItem"
            fullWidth
            disabled
            className="custom-text-field"
          />
        </Grid>

        {/* Updated By User */}
        <Grid item xs={4}>
          <TextField
            label="Updated By User"
            value={authState?.sub}
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            id="disableItem"
            disabled
            className="custom-text-field"
          />
        </Grid>

        {/* Updated On */}
        <Grid item xs={4}>
          <TextField
            label="Updated On"
            value={dateTime}
            id="disableItem"
            InputProps={{ readOnly: true }}
            size="small"
            fullWidth
            disabled
            className="custom-text-field"
          />
        </Grid>
      </Grid>

      
      <h3 style={{ padding: '10px 0' }}>Application Details :-</h3>
        <Grid container spacing={2}>
          {/* Equipment */}
          <Grid item xs={4}>
            <TextField
              label="Equipment"
              name="equipment"
              value={formData.equipment}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Make */}
          <Grid item xs={4}>
            <TextField
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Model */}
          <Grid item xs={4}>
            <TextField
              label="Model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Fluid */}
          <Grid item xs={4}>
            <TextField
              label="Fluid"
              name="fluid"
              value={formData.fluid}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Operating Temperature */}
          <Grid item xs={4}>
            <TextField
              label="Operating Temperature"
              name="operatingTemperature"
              value={formData.operatingTemperature}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Operating Temperature Unit */}
          <Grid item xs={4}>
            <Autocomplete
              options={["℃", "℉"]}
              value={formData.operatingTemperatureUnit}
              onChange={(event, newValue) => setFormData({ ...formData, operatingTemperatureUnit: newValue || "" })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Operating Temperature Unit"
                  fullWidth
                  size="small"
                  variant="outlined"
                  className="custom-text-field"
                />
              )}
            />
          </Grid>

          {/* Flow Rate */}
          <Grid item xs={4}>
            <TextField
              label="Flow Rate"
              name="flowRate"
              value={formData.flowRate}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Speed */}
          <Grid item xs={4}>
            <TextField
              label="Speed"
              name="speed"
              value={formData.speed}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Operating Pressure */}
          <Grid item xs={4}>
            <TextField
              label="Operating Pressure"
              name="operatingPressure"
              value={formData.operatingPressure}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Operating Pressure Unit */}
          <Grid item xs={4}>
            <Autocomplete
              options={["unit1", "unit2"]} // Adjust these values based on the units for "Suction Pressure" in Pump DRF
              value={formData.operatingPressureUnit}
              onChange={(event, newValue) => setFormData({ ...formData, operatingPressureUnit: newValue || "" })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Operating Pressure Unit"
                  fullWidth
                  size="small"
                  variant="outlined"
                  className="custom-text-field"
                />
              )}
            />
          </Grid>
        </Grid>

        {/*/////////////// 2nd Form  /////////////*/}

        <h3 style={{ padding: '10px 0' }}>Existing Rotary Joint Details :-</h3>
        <Grid container spacing={2}>
          {/* Make */}
          <Grid item xs={4}>
            <TextField
              label="Make"
              name="make"
              value={formData.make}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Model Type */}
          <Grid item xs={4}>
            <Autocomplete
              options={["Dual Flow", "Mono Flow"]}
              value={formData.modelType}
              onChange={(event, newValue) => setFormData({ ...formData, modelType: newValue || "" })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Model Type"
                  fullWidth
                  size="small"
                  variant="outlined"
                  className="custom-text-field"
                />
              )}
            />
          </Grid>

          {/* Connection Size */}
          <Grid item xs={4}>
            <TextField
              label="Connection Size"
              name="connectionSize"
              value={formData.connectionSize}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Connection Type */}
          <Grid item xs={4}>
            <TextField
              label="Connection Type"
              name="connectionType"
              value={formData.connectionType}
              onChange={handleChange}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Joint Type */}
          <Grid item xs={4}>
            <Autocomplete
              options={["Threaded", "Flanged"]}
              value={formData.jointType}
              onChange={(event, newValue) => setFormData({ ...formData, jointType: newValue || "" })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Joint Type"
                  fullWidth
                  size="small"
                  variant="outlined"
                  className="custom-text-field"
                />
              )}
            />
          </Grid>
        </Grid>

        {/*//////////////// 3rd Form ////////////// */}

        <h3 style={{ padding: '10px 0' }}>Proposed Rotary Joint Detail :-</h3>
<Grid container spacing={2}>
  {/* Make */}
  <Grid item xs={4}>
    <TextField
      label="Make"
      name="make"
      value={formData.make}
      onChange={handleChange}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Model Type */}
  <Grid item xs={4}>
    <Autocomplete
      options={["Dual Flow", "Mono Flow"]}
      value={formData.modelType}
      onChange={(event, newValue) => setFormData({ ...formData, modelType: newValue || "" })}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Model Type"
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      )}
    />
  </Grid>

  {/* Joint Type Dropdown */}
  <Grid item xs={4}>
    <TextField
      label="Joint Type"
      name="jointType"
      value={formData.jointType}
      onChange={handleChange}
      select
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    >
      <MenuItem value="Threaded">Threaded</MenuItem>
      <MenuItem value="Flanged">Flanged</MenuItem>
    </TextField>
  </Grid>

  {/* Conditional Fields Based on Joint Type */}
  {formData.jointType === 'Threaded' && (
    <>
      <Grid item xs={4}>
        <TextField
          label="Inlet Connection Size"
          name="inletConnectionSize"
          value={formData.inletConnectionSize}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Outlet Connection Size"
          name="outletConnectionSize"
          value={formData.outletConnectionSize}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Connection Type"
          name="connectionType"
          value={formData.connectionType}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Handing"
          name="handing"
          value={formData.handing}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>
    </>
  )}

  {formData.jointType === 'Flanged' && (
    <>
      <Grid item xs={4}>
        <TextField
          label="Inlet Flanged Size"
          name="inletFlangedSize"
          value={formData.inletFlangedSize}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="Outlet Flanged Size"
          name="outletFlangedSize"
          value={formData.outletFlangedSize}
          onChange={handleChange}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>
    </>
  )}

  {/* Attachments */}
  <Grid item xs={4}>
    <TextField
      label="Reference Drawing"
      name="referenceDrawing"
      value={formData.referenceDrawing}
      onChange={handleChange}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>
</Grid>



      </div>
    </form>
  )


  return (

    <Container className="container">
      <form>
        {/* Existing Drawing Requisition Section */}
        <div className='card'>
          {!pId ? <h1>New Sales Inquiry :</h1> : <h1>Update Sales Inquiry :</h1>}

          <div className="MuiBox-root css-2e6lci">
            <svg width="18" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Sales Inquiry :-</div>
          </div>
          {/* <hr /> */}
          <Grid container spacing={2}>
            {/* Sales Inquiry Reference No. */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Sales Inquiry Reference No."
                value={formData.salesInquiryRef}
                id="disableItem"
                InputLabelProps={{
                  shrink: Boolean(formData.salesInquiryRef),
                }}
                autoFocus={formData.salesInquiryRef} 
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                disabled
                fullWidth
              />
            </Grid>

            {/* Customer Reference No. */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Customer Reference No."
                name="customerRef"
                value={formData.customerRef}
                onChange={handleFieldChange}
                required
                fullWidth
              />
            </Grid>

            {/* Customer Name (Not Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Customer Name"
                value={formData.customerName}
                id="disableItem"
                InputLabelProps={{
                  shrink: Boolean(formData.customerName),
                }}
                autoFocus={formData.customerName} 
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                disabled
                fullWidth

              />
            </Grid>

            {/* Customer Address (Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Customer Address"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange}
                id="disableItem"
                disabled
                InputLabelProps={{
                  shrink: Boolean(formData.customerAddress),
                }}
                autoFocus={formData.customerAddress} 
                required
                fullWidth
              />
            </Grid>


            {/* Contact Person (Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Contact Person"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                id="disableItem"
                disabled
                InputLabelProps={{
                  shrink: Boolean(formData.contactPerson),
                }}
                autoFocus={formData.contactPerson} 
                required
                fullWidth
              />
            </Grid>

            {/* Mobile Number (Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Mobile Number"
                name="mobileNumber"
                id="disableItem"
                disabled
                value={formData.mobileNumber}
                InputLabelProps={{
                  shrink: Boolean(formData.mobileNumber),
                }}
                autoFocus={formData.mobileNumber} 
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>

            {/* Source of Inquiry */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="sourceOfInquiry"
                value={formData.sourceOfInquiry}
                onChange={handleFieldChange}
                label="Source of Inquiry"
                required
                fullWidth
              />
            </Grid>


            {/* Industry (Not Editable) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                required
                className="custom-text-field"
                label="Industry"
                value={formData.industry}
                InputLabelProps={{
                  shrink: Boolean(formData.industry),
                }}
                autoFocus={formData.industry} 
                id="disableItem"
                disabled
                InputProps={{
                  readOnly: true, // Read-only for non-editable field
                }}
                fullWidth
              />
            </Grid>


            {/* Branch (Selectable) */}
            <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData?.branch || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        branch: newValue || ""
      });
    }}
    inputValue={formData?.branch || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        branch: newInputValue
      });
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth

      />
    )}
  />
</Grid>


            {/* Created By User */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Created By User"
                value={authState?.sub}
                id="disableItem"
                disabled
                InputProps={{
                  readOnly: true, // Read-only as it's filled automatically
                }}
                InputLabelProps={{
                  shrink: Boolean(authState?.sub),
                }}
                autoFocus={authState?.sub} 
                fullWidth
              />
            </Grid>


            {/* Created On (Auto Generated) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Created On"
                value={dateTime}
                id="disableItem"
                disabled
           
                InputLabelProps={{
                  shrink: Boolean(authState?.sub),
                }}
                autoFocus={authState?.sub} 
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                fullWidth  />
            </Grid>


            {/* Updated By User */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Updated By User"
                value={authState?.sub}
                id="disableItem"
                InputLabelProps={{
                  shrink: Boolean(authState?.sub),
                }}
                autoFocus={authState?.sub} 
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                disabled
                fullWidth />
            </Grid>


            {/* Updated On (Auto Generated) */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Updated On"
                value={dateTime}
                id="disableItem"
                disabled
                InputProps={{
                  readOnly: true, // Read-only for auto-generated field
                }}
                fullWidth
              />
            </Grid>
          </Grid>

        </div>


        {/* Select Seal Type */}

        <div className='card'>
          <div className="MuiBox-root css-2e6lci">
            <svg
              width="18"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-alert-circle"
            >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Add Item Details :-</div>
          </div>



          {/* Wrapper div with consistent height */}
          {/* this is where the form is getting rendered conditionally  */}
          <div style={{ minHeight: '200px' }}>
          <div>

{sealType === 'agitator' && (
 <div>
  {formData?.agitatorInquiries.length === 0 && addItem("agitatorInquiries")}

 {formData?.agitatorInquiries.map((item, index) => (
   <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "25px", borderRadius: "5px" }}>
    
 


<Grid item xs={2}>
      <Autocomplete
        size="small"
        value={item?.sealType || ""}
        onChange={(event, newValue) =>
          handleChange("agitatorInquiries", index)({ target: { name: "sealType", value: newValue || "" } })
        }
        options={["agitatorInquiries", "pumpInquiries", "apiPlanInquiries", "rotaryJointInquiries"]}
        renderInput={(params) => (
          <TextField
            required
            className="custom-text-field"
            {...params}
            size="small"
            label="Seal Type"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Grid>


     {/* Conditionally Render Inquiry Type Form Based on sealType */}
   {/* Conditionally Render Inquiry Type Form Based on sealType */}
   {item?.sealType === "agitatorInquiries" && (
     <div key={index}>
     <Grid container spacing={2} style={{ marginTop: "10px" }}>
       {/* Sales Inquiry Item Reference No */}
       <Grid item xs={4}>
         <TextField
           label="Sales Inquiry Item Reference No."
           value={item?.agitatorInquiryReferenceNo}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={item?.branch || ''}
    onChange={(event, newValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    inputValue={formData?.agitatorInquiries[index]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newInputValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>


       {/* Created By User */}
       <Grid item xs={4}>
         <TextField
           label="Created By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>



       {/* Created On */}
       <Grid item xs={4}>
         <TextField
           label="Created On"
           value={dateTime}
           InputProps={{ readOnly: true }}
           size="small"
           id="disableItem"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated By User */}
       <Grid item xs={4}>
         <TextField
           label="Updated By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated On */}
       <Grid item xs={4}>
         <TextField
           label="Updated On"
           value={dateTime}
           id="disableItem"
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/* //////// 2nd form ///////////// */}

     <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

     <Grid container spacing={2}>
       {/* Series */}
       <Grid item xs={4}>
      <TextField
         label="Series"
         name="series" // This is used to identify the property dynamically
         value={item?.series || ""}
         onChange={handleChange("agitatorInquiries",index)} // Specify array name and index
         size="small"
         fullWidth
         className="custom-text-field" />
       </Grid>



<Grid item xs={4}>
<Autocomplete
 style={{ width: "100%" }}
 size="small"
 value={formData?.agitatorInquiries[index]?.sealArrangement || ""}
 onChange={(event, newValue) =>
   handleChange("agitatorInquiries", index)({
     target: { name: "sealArrangement", value: newValue || "" },
   })
 }
 options={["Single", "Double"]}
 renderInput={(params) => (
   <TextField
     size="small"
     {...params}
     placeholder="Seal Arrangement"
     variant="outlined"
     className="custom-text-field"
     fullWidth
     label="Seal Arrangement"
   />
 )}
/>

</Grid>


       <Grid item xs={4}>
         <Autocomplete
           style={{ width: '100%' }}
           size="small"
       value={formData?.agitatorInquiries[index]?.performance || ""}
           onChange={(event, newValue) => {
             setFormData({
               ...formData,
               agitatorInquiries: [
                 {
                   ...item,
                   performance: newValue || "", // Update the sealArrangement field
                 },
               ],
             });
           }}
           options={['Satisfactory', 'Unsatisfactory']}
           renderInput={(params) => (
             <TextField
               size="small"
               {...params}
               placeholder="Performance"
               variant="outlined"
               className='custom-text-field'
               fullWidth
               label="Performance"
             />
           )}
         />
       </Grid>


       {/* Make */}
       <Grid item xs={4}>
         <TextField
           label="Make"
           name="existingSealMake"
         value={formData?.agitatorInquiries[index]?.existingSealMake}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* Size */}
       <Grid item xs={4}>
         <TextField
           label="Size"
           name="existingSealSize"
           value={item?.existingSealSize}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* MOC */}
       <Grid item xs={4}>
         <TextField
           label="MOC"
           name="existingSealMOC"
           value={item?.existingSealMOC}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* API Plan */}
       <Grid item xs={4}>
         <TextField
           label="API Plan"
           name="existingSealApiPlan"
           value={item?.existingSealApiPlan}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*///////////////3rd form ////////////// */}

     <h3 style={{ padding: '10px 0' }}>Operating Parameters And Fluid Detail :-</h3>

     <Grid container spacing={2}>
       {/* Vessel Pressure (Operating) */}


<Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="vesselPressureOperating"
   value={item?.vesselPressureOperating}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureOperating: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Operating)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureOperatingUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureOperatingUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureOperating}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
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



       <Grid item xs={4}>
       <TextField
   size="small"
   type="number"
   className="custom-text-field"
   name="vesselPressureDesign"
   value={item?.vesselPressureDesign}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureDesign: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Design)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureDesignUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureDesignUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureDesign}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="MLC">MLC</MenuItem>
             <MenuItem value="MWC">MWC</MenuItem>
             <MenuItem value="Meter">Meter</MenuItem>
             <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>




     




       {/* Direction of Rotation */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.directionOfRotation}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   directionOfRotation: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['CW', 'CCW']}
           renderInput={(params) => (
             <TextField
               {...params}
               label="Direction of Rotation"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Speed */}
       <Grid item xs={4}>
         <TextField
           label="Speed"
           type="number"
           name="speed"
           value={item?.speed}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*/////////////// 4th form /////////////// */}
     <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
     <Grid container spacing={2}>
       {/* Fluid */}
       <Grid item xs={4}>
         <TextField
           label="Fluid"
           name="fluid"
           value={item?.fluid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>


       {/* Nature */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.nature}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   nature: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['Option1', 'Option2']} // Replace with actual nature options
           renderInput={(params) => (
             <TextField
               {...params}
               label="Nature"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Pumping Temperature */}
        <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="pumpingTemperature"
   value={item?.pumpingTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           pumpingTemperature: {
             ...prev.agitatorInquiries[index]?.pumpingTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Pumping Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.pumpingTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     pumpingTemperature: {
                       ...prev.agitatorInquiries[index]?.pumpingTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.pumpingTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>


       {/* Maximum Temperature */}
 <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="maximumTemperature"
   value={item?.maximumTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           maximumTemperature: {
             ...prev.agitatorInquiries[index]?.maximumTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Maximum Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.maximumTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     maximumTemperature: {
                       ...prev.agitatorInquiries[index]?.maximumTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.maximumTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>



       {/* SP Gravity */}
       <Grid item xs={4}>
         <TextField
           label="SP Gravity"
           name="spGravity"
           value={item?.spGravity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Freezing Point */}
       <Grid item xs={4}>
         <TextField
           label="Freezing Point"
           name="freezingPoint"
           value={item?.freezingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Boiling Point */}
       <Grid item xs={4}>
         <TextField
           label="Boiling Point"
           name="boilingPoint"
           value={item?.boilingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Viscosity */}
       <Grid item xs={4}>
         <TextField
           label="Viscosity"
           name="viscosity"
           value={item?.viscosity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Percentage Of Solid */}
       <Grid item xs={4}>
         <TextField
           label="Percentage Of Solid"
           name="percentageOfSolid"
           value={item?.percentageOfSolid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Solid Size */}
       <Grid item xs={4}>
         <TextField
           label="Solid Size"
           name="solidSize"
           value={item?.solidSize}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Special Note */}
       <Grid item xs={4}>
         <TextField
           label="Special Note"
           name="specialNote"
           value={formData.agitatorInquiries?.specialNote}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
           inputProps={{ maxLength: 150 }}
         />
       </Grid>
     </Grid>
     

   </div>
   )}
    {item?.sealType === "pumpInquiries" && (
         <form>
         <Grid container spacing={2} sx={{ marginTop: '10px' }}>
           {/* Autogenerated Reference Number */}
           <Grid item xs={4}>
             <TextField
               size="small"
               className="custom-text-field"
               label="Pump Inquiry Reference No."
               value={item?.pumpInquiryReferenceNo}
               disabled
               fullWidth
               InputProps={{ readOnly: true }}
             />
           </Grid>
   
           <Grid item xs={12} sm={4}>
     <Autocomplete
       size="small"
       value={item?.branch || ''}
       onChange={(event, newValue) => handleChange('pumpInquiries', index)({ target: { name: 'branch', value: newValue || '' } })}
       options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
       renderInput={(params) => (
         <TextField
           required
           className="custom-text-field"
           {...params}
           size="small"
           label="Branch"
           variant="outlined"
           fullWidth
         />
       )}
     />
   </Grid>
   
   
           {/* Created On (Autogenerated) */}
           <Grid item xs={4}>
             <TextField
               size="small"
               className="custom-text-field"
               label="Created On"
               value={dateTime} // Auto-generated value
               disabled
               fullWidth
               InputProps={{ readOnly: true }}
             />
           </Grid>
   
   
               {/* Updated By User */}
               <Grid item xs={4}>
                 <TextField
                   size="small"
                   className="custom-text-field"
                   label="Created By User"
                   value={authState?.sub}
                   id="disableItem"
                   InputLabelProps={{
                     shrink: Boolean(authState?.sub),
                   }}
                   autoFocus={authState?.sub} 
                   InputProps={{
                     readOnly: true, // Read-only for auto-generated field
                   }}
                   disabled
                   fullWidth />
               </Grid>
   
   
               <Grid item xs={4}>
                 <TextField
                   size="small"
                   className="custom-text-field"
                   label="Updated By User"
                   value={authState?.sub}
                   id="disableItem"
                   InputLabelProps={{
                     shrink: Boolean(authState?.sub),
                   }}
                   autoFocus={authState?.sub} 
                   InputProps={{
                     readOnly: true, // Read-only for auto-generated field
                   }}
                   disabled
                   fullWidth />
               </Grid>
   
   
   
           {/* Updated On (Autogenerated) */}
           <Grid item xs={4}>
             <TextField
               size="small"
               className="custom-text-field"
               label="Updated On"
               value={dateTime} // Auto-generated value
               disabled
               fullWidth
               InputProps={{ readOnly: true }}
             />
           </Grid>
   
   
   
         </Grid>
   
   
         {/*////////////////// 2nd form staring here   ///////  */}
   
         <h3 style={{ padding: '10px 0' }}>Pump Data :-</h3>
         <Grid container spacing={2}>
           {/* Make */}
   
          {/* Pump Make */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Make"
       name="make"
       value={item?.make || ''}
       onChange={handleChange('pumpInquiries', index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
           {/* Model */}
           <Grid item xs={4}>
     <TextField
       size="small"
       label="Model"
       name="model"
       value={item?.model || ''}
       onChange={handleChange('pumpInquiries', index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
           {/* Pump MOC */}
    
   
           {/* Impeller/Casing MOC */}
           {/* Impeller/Casing MOC */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Impeller/Casing MOC"
       name="impellerCasingMOC"
       value={item?.impellerCasingMOC || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   {/* Shaft MOC */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Shaft MOC"
       name="shaftMOC"
       value={item?.shaftMOC || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   {/* Bearing BKT */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Bearing BKT"
       name="bearingBKT"
       value={item?.bearingBKT || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   {/* Tag Number */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Tag Number"
       name="tagNumber"
       value={item?.tagNumber || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   
           {/* Arrangement (Autocomplete Dropdown) */}
           <Grid item xs={4}>
     <Autocomplete
       size="small"
       options={['Horizontal', 'Vertical']}
       value={item?.arrangement || null} 
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiry = [...prev.pumpInquiries];
           updatedPumpInquiry[index] = {
             ...updatedPumpInquiry[index],
             arrangement: newValue, // Correctly update state
           };
           return { ...prev, pumpInquiries: updatedPumpInquiry };
         });
       }}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Arrangement"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
   
           {/* Pump Type (Autocomplete Dropdown) */}
          {/* Pump Type */}
   <Grid item xs={4}>
     <Autocomplete
       value={item?.pumpType || ''}
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiries = [...prev.pumpInquiries];
           updatedPumpInquiries[index] = {
             ...updatedPumpInquiries[index],
             pumpType: newValue || "",
           };
           return { ...prev, pumpInquiries: updatedPumpInquiries };
         });
       }}
       options={['Centrifugal', 'Positive Displacement']}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Pump Type"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
   {/* Stage */}
   <Grid item xs={4}>
     <Autocomplete
       value={item?.stage || ''}
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiries = [...prev.pumpInquiries];
           updatedPumpInquiries[index] = {
             ...updatedPumpInquiries[index],
             stage: newValue || "",
           };
           return { ...prev, pumpInquiries: updatedPumpInquiries };
         });
       }}
       options={['Single', 'Multiple']}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Stage"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
   {/* Casing Type */}
   <Grid item xs={4}>
     <Autocomplete
       value={item?.casingType || ''}
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiries = [...prev.pumpInquiries];
           updatedPumpInquiries[index] = {
             ...updatedPumpInquiries[index],
             casingType: newValue || "",
           };
           return { ...prev, pumpInquiries: updatedPumpInquiries };
         });
       }}
       options={['Split', 'Unsplitted']}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Casing Type"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
         </Grid>
   
         {/* //////////////////////////////////3rd form ////////////////////// */}
   
         <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>
         <Grid container spacing={2}>
           {/* Series */}
           <Grid item xs={4}>
           <TextField
       size="small"
       label="Series"
       name="series"
       value={item?.series || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
      
     </Grid>
   
           {/* Performance (Dropdown) */}
           <Grid item xs={4}>
       <Autocomplete
         size="small"
         options={['Satisfactory', 'Unsatisfactory']}
         value={item?.performance || ''}
         onChange={(event, newValue) => {
           setFormData((prev) => {
             const updatedPumpInquiry = [...prev.pumpInquiries];
             updatedPumpInquiry[index] = {
               ...updatedPumpInquiry[index],
                performance: newValue ,
             };
             return { ...prev, pumpInquiries: updatedPumpInquiry };
           });
         }}
         renderInput={(params) => <TextField {...params} label="Performance" variant="outlined" fullWidth className="custom-text-field" />}
       />
     </Grid>
   
   
           {/* Seal Arrangement (Dropdown) */}
           <Grid item xs={4}>
       <Autocomplete
         size="small"
         options={['Single', 'Double']}
         value={item?.sealArrangement || ''}
         onChange={(event, newValue) => {
           setFormData((prev) => {
             const updatedPumpInquiry = [...prev.pumpInquiries];
             updatedPumpInquiry[index] = {
               ...updatedPumpInquiry[index],
               sealArrangement: newValue || "" ,
             };
             return { ...prev, pumpInquiries: updatedPumpInquiry };
           });
         }}
         renderInput={(params) => <TextField {...params} label="Seal Arrangement" variant="outlined" fullWidth className="custom-text-field" />}
       />
     </Grid>
   
           {/* Make */}
     {/* Make */}
     <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="Make"
       name="existingSealMake"
       value={item?.existingSealMake || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="Size"
       name="existingSealSize"
       value={item?.existingSealSize || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="MOC"
       name="existingSealMOC"
       value={item?.existingSealMOC || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="API Plan"
       name="existingSealApiPlan"
       value={item?.existingSealApiPlan || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
    </Grid>
   
    <h3 style={{ padding: '10px 0' }}>Parameters :-</h3>
   
         <Grid container spacing={2}>
      
         <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="suctionPressure"
       value={item?.suctionPressure?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               suctionPressure: {
                 ...prev.pumpInquiries[index].suctionPressure,
                 value
               }
             }
           ]
         }));
       }}
       label="Suction Pressure"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.suctionPressure?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         suctionPressure: {
                           ...prev.pumpInquiries[index].suctionPressure,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.suctionPressure?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.suctionPressure?.value && <MenuItem>Unit</MenuItem>}
                 {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="boxPressure"
       value={item?.boxPressure?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               boxPressure: {
                 ...prev.pumpInquiries[index].boxPressure,
                 value
               }
             }
           ]
         }));
       }}
       label="Box Pressure"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.boxPressure?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         boxPressure: {
                           ...prev.pumpInquiries[index].boxPressure,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.boxPressure?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
                 {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="dischargePressure"
       value={item?.dischargePressure?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               dischargePressure: {
                 ...prev.pumpInquiries[index].dischargePressure,
                 value
               }
             }
           ]
         }));
       }}
       label="Discharge Pressure"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.dischargePressure?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         dischargePressure: {
                           ...prev.pumpInquiries[index].dischargePressure,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.dischargePressure?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
                 {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="totalHead"
       value={item?.totalHead?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               totalHead: {
                 ...prev.pumpInquiries[index].totalHead,
                 value
               }
             }
           ]
         }));
       }}
       label="Total Head"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.totalHead?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         totalHead: {
                           ...prev.pumpInquiries[index].totalHead,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.totalHead?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.totalHead?.value && <MenuItem>Unit</MenuItem>}
                 {["Meter", "MWC", "MLC", "kg/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="directionOfRotation"
       value={item?.directionOfRotation || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               directionOfRotation: value
             }
           ]
         }));
       }}
       label="Direction of Rotation"
       fullWidth
       select
     >
       <MenuItem value="CW">CW</MenuItem>
       <MenuItem value="CCW">CCW</MenuItem>
     </TextField>
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="speed"
       value={item?.speed || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               speed: value
             }
           ]
         }));
       }}
       label="Speed"
       fullWidth
     />
   </Grid>
   
         </Grid>
   
   
         {/* //////////// 5th section start ///////// */}
   
         <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
         <Grid container spacing={2}>
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Fluid"
         name="fluid"
         value={item?.fluid || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [
               {
                 ...prev.pumpInquiries[index],
                 fluid: value,
               },
             ],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Nature */}
     <Grid item xs={4}>
       <Autocomplete
         options={["Option 1", "Option 2", "Option 3"]} // Replace with actual options
         renderInput={(params) => (
           <TextField {...params} label="Nature" size="small" fullWidth className="custom-text-field" />
         )}
         onChange={(event, value) =>
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], nature: value }],
           }))
         }
       />
     </Grid>
   
     {/* Pumping Temperature */}
   {/* Pumping Temperature */}
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="pumpingTemperature"
       value={item?.pumpingTemperature?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               pumpingTemperature: {
                 ...prev.pumpInquiries[index].pumpingTemperature,
                 value,
               },
             },
           ],
         }));
       }}
       label="Pumping Temperature"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.pumpingTemperature?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         pumpingTemperature: {
                           ...prev.pumpInquiries[index].pumpingTemperature,
                           unit: selectedUnit,
                         },
                       },
                     ],
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.pumpingTemperature?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center",
                   },
                   minWidth: 60,
                 }}
               >
                 {!item?.pumpingTemperature?.value && <MenuItem>Unit</MenuItem>}
                 <MenuItem value="℃">℃</MenuItem>
                 <MenuItem value="℉">℉</MenuItem>
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   {/* Maximum Temperature */}
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="maximumTemperature"
       value={item?.maximumTemperature?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               maximumTemperature: {
                 ...prev.pumpInquiries[index].maximumTemperature,
                 value,
               },
             },
           ],
         }));
       }}
       label="Maximum Temperature"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.maximumTemperature?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         maximumTemperature: {
                           ...prev.pumpInquiries[index].maximumTemperature,
                           unit: selectedUnit,
                         },
                       },
                     ],
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.maximumTemperature?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center",
                   },
                   minWidth: 60,
                 }}
               >
                 {!item?.maximumTemperature?.value && <MenuItem>Unit</MenuItem>}
                 <MenuItem value="℃">℃</MenuItem>
                 <MenuItem value="℉">℉</MenuItem>
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   
     {/* SP Gravity */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="SP Gravity"
         name="spGravity"
         value={item?.spGravity || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], spGravity: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Freezing Point */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Freezing Point"
         name="freezingPoint"
         value={item?.freezingPoint || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], freezingPoint: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Boiling Point */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Boiling Point"
         name="boilingPoint"
         value={item?.boilingPoint || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], boilingPoint: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Viscosity */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Viscosity"
         name="viscosity"
         value={item?.viscosity || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], viscosity: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Percentage of Solid */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Percentage of Solid"
         name="percentageOfSolid"
         value={item?.percentageOfSolid || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], percentageOfSolid: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Solid Size */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Solid Size"
         name="solidSize"
         value={item?.solidSize || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], solidSize: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Special Note */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Special Note"
         name="specialNote"
         value={item?.specialNote || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], specialNote: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
         inputProps={{ maxLength: 150 }}
       />
     </Grid>
   </Grid>
   
       </form>

    )}

    {/* {item?.sealType === "ApiPlan" && <ApiPlane index={index} item={item} handleChange={handleChange} />}
    {item?.sealType === "Rotatoryjoin" && <Rotatoryjoin index={index} item={item} handleChange={handleChange} />} */}


     {/* Remove Item Button */}
     <IconButton
       variant="contained"
       color="secondary"
       className="deleteIcon"
       onClick={() => removeItem(`${item?.sealType}`, index)}
       style={{ marginTop: "10px", backgroundColor: "red", color: "white", borderRadius: "5px" }}
     >
       <DeleteIcon />
     </IconButton>
   </div>
 ))}

 {/* Add Item Button */}
 <IconButton
  variant="contained"
  color="primary"
  onClick={()=>addItem()}
  disabled={!formData?.agitatorInquiries?.at(-1)?.sealType} 
  style={{
    marginTop: "10px",
    fontSize: "0.8rem",
    backgroundColor: formData?.agitatorInquiries?.at(-1)?.sealType ? "black" : "gray",
    color: "white",
    borderRadius: "5px",
  }}
>
  <AddIcon /> Add Item
</IconButton>
</div>


)}

{sealType === 'Pump' && (
  <div>
    {formData?.pumpInquiries.map((item, index) => (
      <div key={index}>
        

     {/* Conditionally Render Inquiry Type Form Based on sealType */}
     {item?.sealType === "Agitator" && (
     <div key={index}>
     <Grid container spacing={2} style={{ marginTop: "10px" }}>
       {/* Sales Inquiry Item Reference No */}
       <Grid item xs={4}>
         <TextField
           label="Sales Inquiry Item Reference No."
           value={item?.agitatorInquiryReferenceNo}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={item?.branch || ''}
    onChange={(event, newValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    inputValue={formData?.agitatorInquiries[index]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newInputValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>


       {/* Created By User */}
       <Grid item xs={4}>
         <TextField
           label="Created By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>



       {/* Created On */}
       <Grid item xs={4}>
         <TextField
           label="Created On"
           value={dateTime}
           InputProps={{ readOnly: true }}
           size="small"
           id="disableItem"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated By User */}
       <Grid item xs={4}>
         <TextField
           label="Updated By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated On */}
       <Grid item xs={4}>
         <TextField
           label="Updated On"
           value={dateTime}
           id="disableItem"
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/* //////// 2nd form ///////////// */}

     <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

     <Grid container spacing={2}>
       {/* Series */}
       <Grid item xs={4}>
      <TextField
         label="Series"
         name="series" // This is used to identify the property dynamically
         value={item?.series || ""}
         onChange={handleChange("agitatorInquiries",index)} // Specify array name and index
         size="small"
         fullWidth
         className="custom-text-field" />
       </Grid>



<Grid item xs={4}>
<Autocomplete
 style={{ width: "100%" }}
 size="small"
 value={formData?.agitatorInquiries[index]?.sealArrangement || ""}
 onChange={(event, newValue) =>
   handleChange("agitatorInquiries", index)({
     target: { name: "sealArrangement", value: newValue || "" },
   })
 }
 options={["Single", "Double"]}
 renderInput={(params) => (
   <TextField
     size="small"
     {...params}
     placeholder="Seal Arrangement"
     variant="outlined"
     className="custom-text-field"
     fullWidth
     label="Seal Arrangement"
   />
 )}
/>

</Grid>


       <Grid item xs={4}>
         <Autocomplete
           style={{ width: '100%' }}
           size="small"
       value={formData?.agitatorInquiries[index]?.performance || ""}
           onChange={(event, newValue) => {
             setFormData({
               ...formData,
               agitatorInquiries: [
                 {
                   ...item,
                   performance: newValue || "", // Update the sealArrangement field
                 },
               ],
             });
           }}
           options={['Satisfactory', 'Unsatisfactory']}
           renderInput={(params) => (
             <TextField
               size="small"
               {...params}
               placeholder="Performance"
               variant="outlined"
               className='custom-text-field'
               fullWidth
               label="Performance"
             />
           )}
         />
       </Grid>


       {/* Make */}
       <Grid item xs={4}>
         <TextField
           label="Make"
           name="existingSealMake"
         value={formData?.agitatorInquiries[index]?.existingSealMake}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* Size */}
       <Grid item xs={4}>
         <TextField
           label="Size"
           name="existingSealSize"
           value={item?.existingSealSize}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* MOC */}
       <Grid item xs={4}>
         <TextField
           label="MOC"
           name="existingSealMOC"
           value={item?.existingSealMOC}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* API Plan */}
       <Grid item xs={4}>
         <TextField
           label="API Plan"
           name="existingSealApiPlan"
           value={item?.existingSealApiPlan}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*///////////////3rd form ////////////// */}

     <h3 style={{ padding: '10px 0' }}>Operating Parameters And Fluid Detail :-</h3>

     <Grid container spacing={2}>
       {/* Vessel Pressure (Operating) */}


<Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="vesselPressureOperating"
   value={item?.vesselPressureOperating}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureOperating: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Operating)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureOperatingUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureOperatingUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureOperating}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
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



       <Grid item xs={4}>
       <TextField
   size="small"
   type="number"
   className="custom-text-field"
   name="vesselPressureDesign"
   value={item?.vesselPressureDesign}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureDesign: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Design)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureDesignUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureDesignUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureDesign}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="MLC">MLC</MenuItem>
             <MenuItem value="MWC">MWC</MenuItem>
             <MenuItem value="Meter">Meter</MenuItem>
             <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>




     




       {/* Direction of Rotation */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.directionOfRotation}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   directionOfRotation: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['CW', 'CCW']}
           renderInput={(params) => (
             <TextField
               {...params}
               label="Direction of Rotation"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Speed */}
       <Grid item xs={4}>
         <TextField
           label="Speed"
           type="number"
           name="speed"
           value={item?.speed}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*/////////////// 4th form /////////////// */}
     <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
     <Grid container spacing={2}>
       {/* Fluid */}
       <Grid item xs={4}>
         <TextField
           label="Fluid"
           name="fluid"
           value={item?.fluid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>


       {/* Nature */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.nature}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   nature: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['Option1', 'Option2']} // Replace with actual nature options
           renderInput={(params) => (
             <TextField
               {...params}
               label="Nature"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Pumping Temperature */}
        <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="pumpingTemperature"
   value={item?.pumpingTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           pumpingTemperature: {
             ...prev.agitatorInquiries[index]?.pumpingTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Pumping Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.pumpingTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     pumpingTemperature: {
                       ...prev.agitatorInquiries[index]?.pumpingTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.pumpingTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>


       {/* Maximum Temperature */}
 <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="maximumTemperature"
   value={item?.maximumTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           maximumTemperature: {
             ...prev.agitatorInquiries[index]?.maximumTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Maximum Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.maximumTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     maximumTemperature: {
                       ...prev.agitatorInquiries[index]?.maximumTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.maximumTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>



       {/* SP Gravity */}
       <Grid item xs={4}>
         <TextField
           label="SP Gravity"
           name="spGravity"
           value={item?.spGravity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Freezing Point */}
       <Grid item xs={4}>
         <TextField
           label="Freezing Point"
           name="freezingPoint"
           value={item?.freezingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Boiling Point */}
       <Grid item xs={4}>
         <TextField
           label="Boiling Point"
           name="boilingPoint"
           value={item?.boilingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Viscosity */}
       <Grid item xs={4}>
         <TextField
           label="Viscosity"
           name="viscosity"
           value={item?.viscosity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Percentage Of Solid */}
       <Grid item xs={4}>
         <TextField
           label="Percentage Of Solid"
           name="percentageOfSolid"
           value={item?.percentageOfSolid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Solid Size */}
       <Grid item xs={4}>
         <TextField
           label="Solid Size"
           name="solidSize"
           value={item?.solidSize}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Special Note */}
       <Grid item xs={4}>
         <TextField
           label="Special Note"
           name="specialNote"
           value={formData.agitatorInquiries?.specialNote}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
           inputProps={{ maxLength: 150 }}
         />
       </Grid>
     </Grid>
     

   </div>
   )}
  {item?.sealType === "Pump" && (
         <form>
         <Grid container spacing={2} sx={{ marginTop: '10px' }}>
           {/* Autogenerated Reference Number */}
           <Grid item xs={4}>
             <TextField
               size="small"
               className="custom-text-field"
               label="Pump Inquiry Reference No."
               value={item?.pumpInquiryReferenceNo}
               disabled
               fullWidth
               InputProps={{ readOnly: true }}
             />
           </Grid>
   
           <Grid item xs={12} sm={4}>
     <Autocomplete
       size="small"
       value={item?.branch || ''}
       onChange={(event, newValue) => handleChange('pumpInquiries', index)({ target: { name: 'branch', value: newValue || '' } })}
       options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
       renderInput={(params) => (
         <TextField
           required
           className="custom-text-field"
           {...params}
           size="small"
           label="Branch"
           variant="outlined"
           fullWidth
         />
       )}
     />
   </Grid>
   
   
           {/* Created On (Autogenerated) */}
           <Grid item xs={4}>
             <TextField
               size="small"
               className="custom-text-field"
               label="Created On"
               value={dateTime} // Auto-generated value
               disabled
               fullWidth
               InputProps={{ readOnly: true }}
             />
           </Grid>
   
   
               {/* Updated By User */}
               <Grid item xs={4}>
                 <TextField
                   size="small"
                   className="custom-text-field"
                   label="Created By User"
                   value={authState?.sub}
                   id="disableItem"
                   InputLabelProps={{
                     shrink: Boolean(authState?.sub),
                   }}
                   autoFocus={authState?.sub} 
                   InputProps={{
                     readOnly: true, // Read-only for auto-generated field
                   }}
                   disabled
                   fullWidth />
               </Grid>
   
   
               <Grid item xs={4}>
                 <TextField
                   size="small"
                   className="custom-text-field"
                   label="Updated By User"
                   value={authState?.sub}
                   id="disableItem"
                   InputLabelProps={{
                     shrink: Boolean(authState?.sub),
                   }}
                   autoFocus={authState?.sub} 
                   InputProps={{
                     readOnly: true, // Read-only for auto-generated field
                   }}
                   disabled
                   fullWidth />
               </Grid>
   
   
   
           {/* Updated On (Autogenerated) */}
           <Grid item xs={4}>
             <TextField
               size="small"
               className="custom-text-field"
               label="Updated On"
               value={dateTime} // Auto-generated value
               disabled
               fullWidth
               InputProps={{ readOnly: true }}
             />
           </Grid>
   
   
   
         </Grid>
   
   
         {/*////////////////// 2nd form staring here   ///////  */}
   
         <h3 style={{ padding: '10px 0' }}>Pump Data :-</h3>
         <Grid container spacing={2}>
           {/* Make */}
   
          {/* Pump Make */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Make"
       name="make"
       value={item?.make || ''}
       onChange={handleChange('pumpInquiries', index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
           {/* Model */}
           <Grid item xs={4}>
     <TextField
       size="small"
       label="Model"
       name="model"
       value={item?.model || ''}
       onChange={handleChange('pumpInquiries', index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
           {/* Pump MOC */}
    
   
           {/* Impeller/Casing MOC */}
           {/* Impeller/Casing MOC */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Impeller/Casing MOC"
       name="impellerCasingMOC"
       value={item?.impellerCasingMOC || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   {/* Shaft MOC */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Shaft MOC"
       name="shaftMOC"
       value={item?.shaftMOC || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   {/* Bearing BKT */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Bearing BKT"
       name="bearingBKT"
       value={item?.bearingBKT || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   {/* Tag Number */}
   <Grid item xs={4}>
     <TextField
       size="small"
       label="Tag Number"
       name="tagNumber"
       value={item?.tagNumber || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
   </Grid>
   
   
           {/* Arrangement (Autocomplete Dropdown) */}
           <Grid item xs={4}>
     <Autocomplete
       size="small"
       options={['Horizontal', 'Vertical']}
       value={item?.arrangement || null} 
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiry = [...prev.pumpInquiries];
           updatedPumpInquiry[index] = {
             ...updatedPumpInquiry[index],
             arrangement: newValue, // Correctly update state
           };
           return { ...prev, pumpInquiries: updatedPumpInquiry };
         });
       }}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Arrangement"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
   
           {/* Pump Type (Autocomplete Dropdown) */}
          {/* Pump Type */}
   <Grid item xs={4}>
     <Autocomplete
       value={item?.pumpType || ''}
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiries = [...prev.pumpInquiries];
           updatedPumpInquiries[index] = {
             ...updatedPumpInquiries[index],
             pumpType: newValue || "",
           };
           return { ...prev, pumpInquiries: updatedPumpInquiries };
         });
       }}
       options={['Centrifugal', 'Positive Displacement']}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Pump Type"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
   {/* Stage */}
   <Grid item xs={4}>
     <Autocomplete
       value={item?.stage || ''}
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiries = [...prev.pumpInquiries];
           updatedPumpInquiries[index] = {
             ...updatedPumpInquiries[index],
             stage: newValue || "",
           };
           return { ...prev, pumpInquiries: updatedPumpInquiries };
         });
       }}
       options={['Single', 'Multiple']}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Stage"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
   {/* Casing Type */}
   <Grid item xs={4}>
     <Autocomplete
       value={item?.casingType || ''}
       onChange={(event, newValue) => {
         setFormData((prev) => {
           const updatedPumpInquiries = [...prev.pumpInquiries];
           updatedPumpInquiries[index] = {
             ...updatedPumpInquiries[index],
             casingType: newValue || "",
           };
           return { ...prev, pumpInquiries: updatedPumpInquiries };
         });
       }}
       options={['Split', 'Unsplitted']}
       renderInput={(params) => (
         <TextField
           {...params}
           size="small"
           label="Casing Type"
           variant="outlined"
           fullWidth
           className="custom-text-field"
         />
       )}
     />
   </Grid>
   
         </Grid>
   
         {/* //////////////////////////////////3rd form ////////////////////// */}
   
         <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>
         <Grid container spacing={2}>
           {/* Series */}
           <Grid item xs={4}>
           <TextField
       size="small"
       label="Series"
       name="series"
       value={item?.series || ''}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
       variant="outlined"
       className="custom-text-field"
     />
      
     </Grid>
   
           {/* Performance (Dropdown) */}
           <Grid item xs={4}>
       <Autocomplete
         size="small"
         options={['Satisfactory', 'Unsatisfactory']}
         value={item?.performance || ''}
         onChange={(event, newValue) => {
           setFormData((prev) => {
             const updatedPumpInquiry = [...prev.pumpInquiries];
             updatedPumpInquiry[index] = {
               ...updatedPumpInquiry[index],
                performance: newValue ,
             };
             return { ...prev, pumpInquiries: updatedPumpInquiry };
           });
         }}
         renderInput={(params) => <TextField {...params} label="Performance" variant="outlined" fullWidth className="custom-text-field" />}
       />
     </Grid>
   
   
           {/* Seal Arrangement (Dropdown) */}
           <Grid item xs={4}>
       <Autocomplete
         size="small"
         options={['Single', 'Double']}
         value={item?.sealArrangement || ''}
         onChange={(event, newValue) => {
           setFormData((prev) => {
             const updatedPumpInquiry = [...prev.pumpInquiries];
             updatedPumpInquiry[index] = {
               ...updatedPumpInquiry[index],
               sealArrangement: newValue || "" ,
             };
             return { ...prev, pumpInquiries: updatedPumpInquiry };
           });
         }}
         renderInput={(params) => <TextField {...params} label="Seal Arrangement" variant="outlined" fullWidth className="custom-text-field" />}
       />
     </Grid>
   
           {/* Make */}
     {/* Make */}
     <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="Make"
       name="existingSealMake"
       value={item?.existingSealMake || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="Size"
       name="existingSealSize"
       value={item?.existingSealSize || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="MOC"
       name="existingSealMOC"
       value={item?.existingSealMOC || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       label="API Plan"
       name="existingSealApiPlan"
       value={item?.existingSealApiPlan || ""}
       onChange={handleChange("pumpInquiries", index)}
       fullWidth
     />
   </Grid>
   
    </Grid>
   
    <h3 style={{ padding: '10px 0' }}>Parameters :-</h3>
   
         <Grid container spacing={2}>
      
         <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="suctionPressure"
       value={item?.suctionPressure?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               suctionPressure: {
                 ...prev.pumpInquiries[index].suctionPressure,
                 value
               }
             }
           ]
         }));
       }}
       label="Suction Pressure"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.suctionPressure?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         suctionPressure: {
                           ...prev.pumpInquiries[index].suctionPressure,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.suctionPressure?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.suctionPressure?.value && <MenuItem>Unit</MenuItem>}
                 {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="boxPressure"
       value={item?.boxPressure?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               boxPressure: {
                 ...prev.pumpInquiries[index].boxPressure,
                 value
               }
             }
           ]
         }));
       }}
       label="Box Pressure"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.boxPressure?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         boxPressure: {
                           ...prev.pumpInquiries[index].boxPressure,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.boxPressure?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
                 {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="dischargePressure"
       value={item?.dischargePressure?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               dischargePressure: {
                 ...prev.pumpInquiries[index].dischargePressure,
                 value
               }
             }
           ]
         }));
       }}
       label="Discharge Pressure"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.dischargePressure?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         dischargePressure: {
                           ...prev.pumpInquiries[index].dischargePressure,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.dischargePressure?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
                 {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="totalHead"
       value={item?.totalHead?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               totalHead: {
                 ...prev.pumpInquiries[index].totalHead,
                 value
               }
             }
           ]
         }));
       }}
       label="Total Head"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.totalHead?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         totalHead: {
                           ...prev.pumpInquiries[index].totalHead,
                           unit: selectedUnit
                         }
                       }
                     ]
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.totalHead?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center"
                   },
                   minWidth: 60
                 }}
               >
                 {!item?.totalHead?.value && <MenuItem>Unit</MenuItem>}
                 {["Meter", "MWC", "MLC", "kg/cm2"].map((unit) => (
                   <MenuItem key={unit} value={unit}>
                     {unit}
                   </MenuItem>
                 ))}
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="directionOfRotation"
       value={item?.directionOfRotation || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               directionOfRotation: value
             }
           ]
         }));
       }}
       label="Direction of Rotation"
       fullWidth
       select
     >
       <MenuItem value="CW">CW</MenuItem>
       <MenuItem value="CCW">CCW</MenuItem>
     </TextField>
   </Grid>
   
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="speed"
       value={item?.speed || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               speed: value
             }
           ]
         }));
       }}
       label="Speed"
       fullWidth
     />
   </Grid>
   
         </Grid>
   
   
         {/* //////////// 5th section start ///////// */}
   
         <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
         <Grid container spacing={2}>
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Fluid"
         name="fluid"
         value={item?.fluid || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [
               {
                 ...prev.pumpInquiries[index],
                 fluid: value,
               },
             ],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Nature */}
     <Grid item xs={4}>
       <Autocomplete
         options={["Option 1", "Option 2", "Option 3"]} // Replace with actual options
         renderInput={(params) => (
           <TextField {...params} label="Nature" size="small" fullWidth className="custom-text-field" />
         )}
         onChange={(event, value) =>
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], nature: value }],
           }))
         }
       />
     </Grid>
   
     {/* Pumping Temperature */}
   {/* Pumping Temperature */}
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="pumpingTemperature"
       value={item?.pumpingTemperature?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               pumpingTemperature: {
                 ...prev.pumpInquiries[index].pumpingTemperature,
                 value,
               },
             },
           ],
         }));
       }}
       label="Pumping Temperature"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.pumpingTemperature?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         pumpingTemperature: {
                           ...prev.pumpInquiries[index].pumpingTemperature,
                           unit: selectedUnit,
                         },
                       },
                     ],
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.pumpingTemperature?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center",
                   },
                   minWidth: 60,
                 }}
               >
                 {!item?.pumpingTemperature?.value && <MenuItem>Unit</MenuItem>}
                 <MenuItem value="℃">℃</MenuItem>
                 <MenuItem value="℉">℉</MenuItem>
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   {/* Maximum Temperature */}
   <Grid item xs={4}>
     <TextField
       size="small"
       className="custom-text-field"
       name="maximumTemperature"
       value={item?.maximumTemperature?.value || ""}
       onChange={(e) => {
         const value = e.target.value;
         setFormData((prev) => ({
           ...prev,
           pumpInquiries: [
             {
               ...prev.pumpInquiries[index],
               maximumTemperature: {
                 ...prev.pumpInquiries[index].maximumTemperature,
                 value,
               },
             },
           ],
         }));
       }}
       label="Maximum Temperature"
       fullWidth
       InputProps={{
         endAdornment: (
           <InputAdornment position="end">
             <FormControl size="small" variant="outlined">
               <Select
                 value={item?.maximumTemperature?.unit || ""}
                 onChange={(e) => {
                   const selectedUnit = e.target.value;
                   setFormData((prev) => ({
                     ...prev,
                     pumpInquiries: [
                       {
                         ...prev.pumpInquiries[index],
                         maximumTemperature: {
                           ...prev.pumpInquiries[index].maximumTemperature,
                           unit: selectedUnit,
                         },
                       },
                     ],
                   }));
                 }}
                 displayEmpty
                 disabled={!item?.maximumTemperature?.value}
                 sx={{
                   height: "100%",
                   borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
                   borderRadius: 0,
                   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                   "& .MuiSelect-select": {
                     padding: "0 8px",
                     outline: "none",
                     border: "none",
                     height: "100%",
                     display: "flex",
                     alignItems: "center",
                   },
                   minWidth: 60,
                 }}
               >
                 {!item?.maximumTemperature?.value && <MenuItem>Unit</MenuItem>}
                 <MenuItem value="℃">℃</MenuItem>
                 <MenuItem value="℉">℉</MenuItem>
               </Select>
             </FormControl>
           </InputAdornment>
         ),
       }}
     />
   </Grid>
   
   
     {/* SP Gravity */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="SP Gravity"
         name="spGravity"
         value={item?.spGravity || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], spGravity: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Freezing Point */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Freezing Point"
         name="freezingPoint"
         value={item?.freezingPoint || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], freezingPoint: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Boiling Point */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Boiling Point"
         name="boilingPoint"
         value={item?.boilingPoint || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], boilingPoint: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Viscosity */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Viscosity"
         name="viscosity"
         value={item?.viscosity || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], viscosity: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Percentage of Solid */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Percentage of Solid"
         name="percentageOfSolid"
         value={item?.percentageOfSolid || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], percentageOfSolid: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Solid Size */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Solid Size"
         name="solidSize"
         value={item?.solidSize || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], solidSize: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
       />
     </Grid>
   
     {/* Special Note */}
     <Grid item xs={4}>
       <TextField
         size="small"
         label="Special Note"
         name="specialNote"
         value={item?.specialNote || ""}
         onChange={(e) => {
           const value = e.target.value;
           setFormData((prev) => ({
             ...prev,
             pumpInquiries: [{ ...prev.pumpInquiries[index], specialNote: value }],
           }));
         }}
         fullWidth
         className="custom-text-field"
         inputProps={{ maxLength: 150 }}
       />
     </Grid>
   </Grid>
   
       </form>

    )}
    {/* {item?.sealType === "ApiPlan" && <ApiPlane index={index} />}
    {item?.sealType === "Rotatoryjoin" && <Rotatoryjoin index={index} />} */}


     {/* Remove Item Button */}
     <IconButton
       variant="contained"
       color="secondary"
       className="deleteIcon"
       onClick={() => removeItem("agitatorInquiries", index)}
       style={{ marginTop: "10px", backgroundColor: "red", color: "white", borderRadius: "5px" }}
     >
       <DeleteIcon />
     </IconButton>
   </div>
 ))}

 {/* Add Item Button */}
 <IconButton
   variant="contained"
   color="primary"
   onClick={() => addItem("agitatorInquiries")}
   style={{ marginTop: "10px", fontSize: "0.8rem", backgroundColor: "black", color: "white", borderRadius: "5px" }}
 >
   <AddIcon /> Add Item
 </IconButton>
  </div>
)}

{sealType === 'apiplane' && (
  <div>
    {formData.apiPlanInquiries.map((item, index) => (
      <div key={index}>
        {console.log("index from item",index)}
       
        <Grid item xs={2}>
       <Autocomplete
         size="small"
         value={item?.sealType || ""}
         onChange={(event, newValue) => {
           setFormData((prevState) => {
             const updatedItems = [...prevState.apiPlanInquiries];
             updatedItems[index] = { ...updatedItems[index], sealType: newValue || "" };
             return { ...prevState, apiPlanInquiries: updatedItems };
           });
         }}
         options={["Agitator", "Pump", "ApiPlan", "Rotatoryjoin"]}
         renderInput={(params) => (
           <TextField
           
             required
             className="custom-text-field"
             {...params}
             size="small"
             label="Seal Type"
             variant="outlined"
             fullWidth
           />
         )}
       />
     </Grid>

     {/* Conditionally Render Inquiry Type Form Based on sealType */}
     {item?.sealType === "Agitator" && (
     <div key={index}>
     <Grid container spacing={2} style={{ marginTop: "10px" }}>
       {/* Sales Inquiry Item Reference No */}
       <Grid item xs={4}>
         <TextField
           label="Sales Inquiry Item Reference No."
           value={item?.agitatorInquiryReferenceNo}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={item?.branch || ''}
    onChange={(event, newValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    inputValue={formData?.agitatorInquiries[index]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newInputValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>


       {/* Created By User */}
       <Grid item xs={4}>
         <TextField
           label="Created By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>



       {/* Created On */}
       <Grid item xs={4}>
         <TextField
           label="Created On"
           value={dateTime}
           InputProps={{ readOnly: true }}
           size="small"
           id="disableItem"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated By User */}
       <Grid item xs={4}>
         <TextField
           label="Updated By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated On */}
       <Grid item xs={4}>
         <TextField
           label="Updated On"
           value={dateTime}
           id="disableItem"
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/* //////// 2nd form ///////////// */}

     <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

     <Grid container spacing={2}>
       {/* Series */}
       <Grid item xs={4}>
      <TextField
         label="Series"
         name="series" // This is used to identify the property dynamically
         value={item?.series || ""}
         onChange={handleChange("agitatorInquiries",index)} // Specify array name and index
         size="small"
         fullWidth
         className="custom-text-field" />
       </Grid>



<Grid item xs={4}>
<Autocomplete
 style={{ width: "100%" }}
 size="small"
 value={formData?.agitatorInquiries[index]?.sealArrangement || ""}
 onChange={(event, newValue) =>
   handleChange("agitatorInquiries", index)({
     target: { name: "sealArrangement", value: newValue || "" },
   })
 }
 options={["Single", "Double"]}
 renderInput={(params) => (
   <TextField
     size="small"
     {...params}
     placeholder="Seal Arrangement"
     variant="outlined"
     className="custom-text-field"
     fullWidth
     label="Seal Arrangement"
   />
 )}
/>

</Grid>


       <Grid item xs={4}>
         <Autocomplete
           style={{ width: '100%' }}
           size="small"
       value={formData?.agitatorInquiries[index]?.performance || ""}
           onChange={(event, newValue) => {
             setFormData({
               ...formData,
               agitatorInquiries: [
                 {
                   ...item,
                   performance: newValue || "", // Update the sealArrangement field
                 },
               ],
             });
           }}
           options={['Satisfactory', 'Unsatisfactory']}
           renderInput={(params) => (
             <TextField
               size="small"
               {...params}
               placeholder="Performance"
               variant="outlined"
               className='custom-text-field'
               fullWidth
               label="Performance"
             />
           )}
         />
       </Grid>


       {/* Make */}
       <Grid item xs={4}>
         <TextField
           label="Make"
           name="existingSealMake"
         value={formData?.agitatorInquiries[index]?.existingSealMake}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* Size */}
       <Grid item xs={4}>
         <TextField
           label="Size"
           name="existingSealSize"
           value={item?.existingSealSize}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* MOC */}
       <Grid item xs={4}>
         <TextField
           label="MOC"
           name="existingSealMOC"
           value={item?.existingSealMOC}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* API Plan */}
       <Grid item xs={4}>
         <TextField
           label="API Plan"
           name="existingSealApiPlan"
           value={item?.existingSealApiPlan}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*///////////////3rd form ////////////// */}

     <h3 style={{ padding: '10px 0' }}>Operating Parameters And Fluid Detail :-</h3>

     <Grid container spacing={2}>
       {/* Vessel Pressure (Operating) */}


<Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="vesselPressureOperating"
   value={item?.vesselPressureOperating}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureOperating: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Operating)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureOperatingUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureOperatingUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureOperating}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
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



       <Grid item xs={4}>
       <TextField
   size="small"
   type="number"
   className="custom-text-field"
   name="vesselPressureDesign"
   value={item?.vesselPressureDesign}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureDesign: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Design)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureDesignUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureDesignUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureDesign}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="MLC">MLC</MenuItem>
             <MenuItem value="MWC">MWC</MenuItem>
             <MenuItem value="Meter">Meter</MenuItem>
             <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>




     




       {/* Direction of Rotation */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.directionOfRotation}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   directionOfRotation: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['CW', 'CCW']}
           renderInput={(params) => (
             <TextField
               {...params}
               label="Direction of Rotation"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Speed */}
       <Grid item xs={4}>
         <TextField
           label="Speed"
           type="number"
           name="speed"
           value={item?.speed}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*/////////////// 4th form /////////////// */}
     <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
     <Grid container spacing={2}>
       {/* Fluid */}
       <Grid item xs={4}>
         <TextField
           label="Fluid"
           name="fluid"
           value={item?.fluid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>


       {/* Nature */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.nature}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   nature: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['Option1', 'Option2']} // Replace with actual nature options
           renderInput={(params) => (
             <TextField
               {...params}
               label="Nature"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Pumping Temperature */}
        <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="pumpingTemperature"
   value={item?.pumpingTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           pumpingTemperature: {
             ...prev.agitatorInquiries[index]?.pumpingTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Pumping Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.pumpingTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     pumpingTemperature: {
                       ...prev.agitatorInquiries[index]?.pumpingTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.pumpingTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>


       {/* Maximum Temperature */}
 <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="maximumTemperature"
   value={item?.maximumTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           maximumTemperature: {
             ...prev.agitatorInquiries[index]?.maximumTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Maximum Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.maximumTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     maximumTemperature: {
                       ...prev.agitatorInquiries[index]?.maximumTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.maximumTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>



       {/* SP Gravity */}
       <Grid item xs={4}>
         <TextField
           label="SP Gravity"
           name="spGravity"
           value={item?.spGravity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Freezing Point */}
       <Grid item xs={4}>
         <TextField
           label="Freezing Point"
           name="freezingPoint"
           value={item?.freezingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Boiling Point */}
       <Grid item xs={4}>
         <TextField
           label="Boiling Point"
           name="boilingPoint"
           value={item?.boilingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Viscosity */}
       <Grid item xs={4}>
         <TextField
           label="Viscosity"
           name="viscosity"
           value={item?.viscosity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Percentage Of Solid */}
       <Grid item xs={4}>
         <TextField
           label="Percentage Of Solid"
           name="percentageOfSolid"
           value={item?.percentageOfSolid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Solid Size */}
       <Grid item xs={4}>
         <TextField
           label="Solid Size"
           name="solidSize"
           value={item?.solidSize}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Special Note */}
       <Grid item xs={4}>
         <TextField
           label="Special Note"
           name="specialNote"
           value={formData.agitatorInquiries?.specialNote}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
           inputProps={{ maxLength: 150 }}
         />
       </Grid>
     </Grid>
     

   </div>
   )}
     {/* {item?.sealType === "Pump" && 
     <PumpData index={index} />}
     {item?.sealType === "ApiPlan" && 
     <ApiPlane index={index} />}
     {item?.sealType === "Rotatoryjoin" && <Rotatoryjoin index={index} />} */}

     {/* Remove Item Button */}
     <IconButton
       variant="contained"
       color="secondary"
       className="deleteIcon"
       onClick={() => removeItem("agitatorInquiries", index)}
       style={{ marginTop: "10px", backgroundColor: "red", color: "white", borderRadius: "5px" }}
     >
       <DeleteIcon />
     </IconButton>
   </div>
 ))}

 {/* Add Item Button */}
 <IconButton
   variant="contained"
   color="primary"
   onClick={() => addItem("agitatorInquiries")}
   style={{ marginTop: "10px", fontSize: "0.8rem", backgroundColor: "black", color: "white", borderRadius: "5px" }}
 >
   <AddIcon /> Add Item
 </IconButton>
  </div>
)}

{sealType === 'rotatoryjoin' && (
  <div>
  {formData.rotaryJointInquiries.map((item, index) => (
      <div key={index}>
        {Rotatoryjoin(index)}
        <Grid item xs={2}>
       <Autocomplete
         size="small"
         value={item?.sealType || ""}
         onChange={(event, newValue) => {
           setFormData((prevState) => {
             const updatedItems = [...prevState.apiPlanInquiries];
             updatedItems[index] = { ...updatedItems[index], sealType: newValue || "" };
             return { ...prevState, apiPlanInquiries: updatedItems };
           });
         }}
         options={["Agitator", "Pump", "ApiPlan", "Rotatoryjoin"]}
         renderInput={(params) => (
           <TextField
           
             required
             className="custom-text-field"
             {...params}
             size="small"
             label="Seal Type"
             variant="outlined"
             fullWidth
           />
         )}
       />
     </Grid>

     {/* Conditionally Render Inquiry Type Form Based on sealType */}
     {item?.sealType === "Agitator" && (
     <div key={index}>
     <Grid container spacing={2} style={{ marginTop: "10px" }}>
       {/* Sales Inquiry Item Reference No */}
       <Grid item xs={4}>
         <TextField
           label="Sales Inquiry Item Reference No."
           value={item?.agitatorInquiryReferenceNo}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={item?.branch || ''}
    onChange={(event, newValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    inputValue={formData?.agitatorInquiries[index]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      const updatedInquiries = [...formData.agitatorInquiries];
      updatedInquiries[index] = {
        ...updatedInquiries[index], // Preserve other fields
        branch: newInputValue || "", // Update only the branch field
      };
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: updatedInquiries,
      }));
    }}
    options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
    renderInput={(params) => (
      <TextField
        required
        className="custom-text-field"
        {...params}
        size="small"
        label="Branch"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>


       {/* Created By User */}
       <Grid item xs={4}>
         <TextField
           label="Created By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>



       {/* Created On */}
       <Grid item xs={4}>
         <TextField
           label="Created On"
           value={dateTime}
           InputProps={{ readOnly: true }}
           size="small"
           id="disableItem"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated By User */}
       <Grid item xs={4}>
         <TextField
           label="Updated By User"
           value={authState?.sub}
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           id="disableItem"
           disabled
           className="custom-text-field"
         />
       </Grid>

       {/* Updated On */}
       <Grid item xs={4}>
         <TextField
           label="Updated On"
           value={dateTime}
           id="disableItem"
           InputProps={{ readOnly: true }}
           size="small"
           fullWidth
           disabled
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/* //////// 2nd form ///////////// */}

     <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

     <Grid container spacing={2}>
       {/* Series */}
       <Grid item xs={4}>
      <TextField
         label="Series"
         name="series" // This is used to identify the property dynamically
         value={item?.series || ""}
         onChange={handleChange("agitatorInquiries",index)} // Specify array name and index
         size="small"
         fullWidth
         className="custom-text-field" />
       </Grid>



<Grid item xs={4}>
<Autocomplete
 style={{ width: "100%" }}
 size="small"
 value={formData?.agitatorInquiries[index]?.sealArrangement || ""}
 onChange={(event, newValue) =>
   handleChange("agitatorInquiries", index)({
     target: { name: "sealArrangement", value: newValue || "" },
   })
 }
 options={["Single", "Double"]}
 renderInput={(params) => (
   <TextField
     size="small"
     {...params}
     placeholder="Seal Arrangement"
     variant="outlined"
     className="custom-text-field"
     fullWidth
     label="Seal Arrangement"
   />
 )}
/>

</Grid>


       <Grid item xs={4}>
         <Autocomplete
           style={{ width: '100%' }}
           size="small"
       value={formData?.agitatorInquiries[index]?.performance || ""}
           onChange={(event, newValue) => {
             setFormData({
               ...formData,
               agitatorInquiries: [
                 {
                   ...item,
                   performance: newValue || "", // Update the sealArrangement field
                 },
               ],
             });
           }}
           options={['Satisfactory', 'Unsatisfactory']}
           renderInput={(params) => (
             <TextField
               size="small"
               {...params}
               placeholder="Performance"
               variant="outlined"
               className='custom-text-field'
               fullWidth
               label="Performance"
             />
           )}
         />
       </Grid>


       {/* Make */}
       <Grid item xs={4}>
         <TextField
           label="Make"
           name="existingSealMake"
         value={formData?.agitatorInquiries[index]?.existingSealMake}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* Size */}
       <Grid item xs={4}>
         <TextField
           label="Size"
           name="existingSealSize"
           value={item?.existingSealSize}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* MOC */}
       <Grid item xs={4}>
         <TextField
           label="MOC"
           name="existingSealMOC"
           value={item?.existingSealMOC}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>

       {/* API Plan */}
       <Grid item xs={4}>
         <TextField
           label="API Plan"
           name="existingSealApiPlan"
           value={item?.existingSealApiPlan}
           onChange={handleChange("agitatorInquiries",index)}
           size="small"
           fullWidth
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*///////////////3rd form ////////////// */}

     <h3 style={{ padding: '10px 0' }}>Operating Parameters And Fluid Detail :-</h3>

     <Grid container spacing={2}>
       {/* Vessel Pressure (Operating) */}


<Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="vesselPressureOperating"
   value={item?.vesselPressureOperating}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureOperating: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Operating)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureOperatingUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureOperatingUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureOperating}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
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



       <Grid item xs={4}>
       <TextField
   size="small"
   type="number"
   className="custom-text-field"
   name="vesselPressureDesign"
   value={item?.vesselPressureDesign}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           vesselPressureDesign: +value
         }
       ]
     }));
   }}
   label="Vessel Pressure (Design)"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.vesselPressureDesignUnit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     vesselPressureDesignUnit: selectedUnit
                   }
                 ]
               }));
         
               
             }}
             displayEmpty
             disabled={!item?.vesselPressureDesign}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="MLC">MLC</MenuItem>
             <MenuItem value="MWC">MWC</MenuItem>
             <MenuItem value="Meter">Meter</MenuItem>
             <MenuItem value="kgf/cm2">kgf/cm2</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>




     




       {/* Direction of Rotation */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.directionOfRotation}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   directionOfRotation: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['CW', 'CCW']}
           renderInput={(params) => (
             <TextField
               {...params}
               label="Direction of Rotation"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Speed */}
       <Grid item xs={4}>
         <TextField
           label="Speed"
           type="number"
           name="speed"
           value={item?.speed}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>
     </Grid>

     {/*/////////////// 4th form /////////////// */}
     <h3 style={{ padding: '10px 0' }}>Fluid :-</h3>
     <Grid container spacing={2}>
       {/* Fluid */}
       <Grid item xs={4}>
         <TextField
           label="Fluid"
           name="fluid"
           value={item?.fluid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>


       {/* Nature */}
       <Grid item xs={4}>
         <Autocomplete
           size="small"
           value={item?.nature}
           onChange={(event, newValue) => {
             setFormData((prevState) => ({
               ...prevState,
               agitatorInquiries: [
                 {
                   ...prevState.agitatorInquiries[index], // Keep the other fields of the first object intact
                   nature: newValue || "", // Update the 'branch' property
                 },
               ],
             }));
           }}
           options={['Option1', 'Option2']} // Replace with actual nature options
           renderInput={(params) => (
             <TextField
               {...params}
               label="Nature"
               variant="outlined"
               size="small"
               fullWidth
               className="custom-text-field"
             />
           )}
         />
       </Grid>

       {/* Pumping Temperature */}
        <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="pumpingTemperature"
   value={item?.pumpingTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           pumpingTemperature: {
             ...prev.agitatorInquiries[index]?.pumpingTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Pumping Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.pumpingTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     pumpingTemperature: {
                       ...prev.agitatorInquiries[index]?.pumpingTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.pumpingTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>


       {/* Maximum Temperature */}
 <Grid item xs={4}>
 <TextField
   size="small"
   className="custom-text-field"
   name="maximumTemperature"
   value={item?.maximumTemperature?.value || ""}
   onChange={(e) => {
     const value = e.target.value;
     setFormData((prev) => ({
       ...prev,
       agitatorInquiries: [
         {
           ...prev.agitatorInquiries[index],
           maximumTemperature: {
             ...prev.agitatorInquiries[index]?.maximumTemperature,
             value
           }
         }
       ]
     }));
   }}
   label="Maximum Temperature"
   fullWidth
   InputProps={{
     endAdornment: (
       <InputAdornment position="end">
         <FormControl size="small" variant="outlined">
           <Select
             value={item?.maximumTemperature?.unit || ""}
             onChange={(e) => {
               const selectedUnit = e.target.value;
               setFormData((prev) => ({
                 ...prev,
                 agitatorInquiries: [
                   {
                     ...prev.agitatorInquiries[index],
                     maximumTemperature: {
                       ...prev.agitatorInquiries[index]?.maximumTemperature,
                       unit: selectedUnit
                     }
                   }
                 ]
               }));
             }}
             displayEmpty
             disabled={!item?.maximumTemperature?.value}
             sx={{
               height: "100%",
               borderLeft: "1px solid rgba(0, 0, 0, 0.23)",
               borderRadius: 0,
               "& .MuiOutlinedInput-notchedOutline": { border: "none" },
               "& .MuiSelect-select": {
                 padding: "0 8px",
                 outline: "none",
                 border: "none",
                 height: "100%",
                 display: "flex",
                 alignItems: "center"
               },
               minWidth: 60
             }}
           >
             <MenuItem value="" disabled>
               Unit
             </MenuItem>
             <MenuItem value="℃">℃ </MenuItem>
             <MenuItem value="℉">℉</MenuItem>
           </Select>
         </FormControl>
       </InputAdornment>
     ),
   }}
 />
</Grid>



       {/* SP Gravity */}
       <Grid item xs={4}>
         <TextField
           label="SP Gravity"
           name="spGravity"
           value={item?.spGravity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Freezing Point */}
       <Grid item xs={4}>
         <TextField
           label="Freezing Point"
           name="freezingPoint"
           value={item?.freezingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Boiling Point */}
       <Grid item xs={4}>
         <TextField
           label="Boiling Point"
           name="boilingPoint"
           value={item?.boilingPoint}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Viscosity */}
       <Grid item xs={4}>
         <TextField
           label="Viscosity"
           name="viscosity"
           value={item?.viscosity}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Percentage Of Solid */}
       <Grid item xs={4}>
         <TextField
           label="Percentage Of Solid"
           name="percentageOfSolid"
           value={item?.percentageOfSolid}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Solid Size */}
       <Grid item xs={4}>
         <TextField
           label="Solid Size"
           name="solidSize"
           value={item?.solidSize}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
         />
       </Grid>

       {/* Special Note */}
       <Grid item xs={4}>
         <TextField
           label="Special Note"
           name="specialNote"
           value={formData.agitatorInquiries?.specialNote}
           onChange={handleChange("agitatorInquiries",index)}
           fullWidth
           size="small"
           variant="outlined"
           className="custom-text-field"
           inputProps={{ maxLength: 150 }}
         />
       </Grid>
     </Grid>
     

   </div>
   )}
     {/* {item?.sealType === "Pump" && 
     <PumpData index={index} />}
     {item?.sealType === "ApiPlan" && 
     <ApiPlane index={index} />}
     {item?.sealType === "Rotatoryjoin" && <Rotatoryjoin index={index} />} */}

     {/* Remove Item Button */}
     <IconButton
       variant="contained"
       color="secondary"
       className="deleteIcon"
       onClick={() => removeItem("agitatorInquiries", index)}
       style={{ marginTop: "10px", backgroundColor: "red", color: "white", borderRadius: "5px" }}
     >
       <DeleteIcon />
     </IconButton>
   </div>
 ))}

 {/* Add Item Button */}
 <IconButton
   variant="contained"
   color="primary"
   onClick={() => addItem("agitatorInquiries")}
   style={{ marginTop: "10px", fontSize: "0.8rem", backgroundColor: "black", color: "white", borderRadius: "5px" }}
 >
   <AddIcon /> Add Item
 </IconButton>
  </div>
)}


              </div>
    
          </div>
        </div>



        {/* Submit/Update Buttons */}
        <Grid item xs={4}>
          <Grid item xs={4}>
            {!pId ? (
              <Button
                className="submit-btn"
                style={{ margin: "2rem 1rem" }}
                onClick={(e) => handleSubmit(e, formData, navigate)}
                type="submit"
                variant="contained">
                Submit
              </Button>
            ) : (
              <>
                <Button
                  className="update-btn"
                  variant="contained"
                  type="submit"
                  onClick={(e) => handleUpdate(e, formData, pId, navigate)}
                >
                  Update
                </Button>
                <Button
                  className="cancel-btn"
                  variant="contained"
                  onClick={cancelUpdate}
                >
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}