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
import {getSales, handleSubmit} from '../../apis/SalesInquiryApi'

import {handleUpdate} from '../../apis/SalesInquiryApi'

import { getColumnData } from '../../apis/PumpSealApi';
import dayjs from "dayjs";
import moment from "moment";
import { useAuth } from "../../contextApi/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef } from "react";
import axiosInstance from "../../axios/axiosInstance";
import DownloadIcon from '@mui/icons-material/Download';
import AttachFileIcon from '@mui/icons-material/AttachFile';


export default function CreateSales() {
  const navigate = useNavigate();
  let { sId } = useParams();
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



  // Add new state for mechanical seal section
  const [newSealType, setNewSealType] = useState(""); // Tracks the new dropdown selection



const latestItemRef = useRef(null); 
const fileInputRef = useRef();
const [uploadedFileNames, setUploadedFileNames] = useState([])


const defaultFormData = {
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
};

const [formData, setFormData] = useState(defaultFormData)

  useEffect(() => {
    if (sId !== undefined) {
      getSales(sId, setFormData,defaultFormData);
    }
    else{
      setFormData(defaultFormData)
    }
  }, [sId]);

  console.log("Updated FormData ",formData)
  
const handleFileDelete = (index) => {
    const newFileNames = [...uploadedFileNames]; // Copy existing state
    newFileNames[index] = ""; // Remove file at the correct index
    setUploadedFileNames(newFileNames); // Update state
};


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




  const handleFetch=async(custId)=>{
    try{
      const {data} = await axiosInstance.get(`/lens/customer/get?customerRefrenceNumber=${custId}`)
      console.log("getCustomer is ",data)

      setFormData((prev)=>({
        ...prev,
        customerName:data.customerName,
        customerAddress:data.contactDetail[0].customerAddress,
        contactPerson:data.contactDetail[0]?.contactPerson,
        mobileNumber:data.contactDetail[0].mobileNumber,
        industry:data.contactDetail[0]?.industryType
      }))

    }
    catch(err){
      console.log(err);
    }

  }


  const getDefaultInquiryData = (sealType) => {
    const defaultData = {
      Agitator: {
        series: "",
        performance: "",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        sealArrangement: "",
        sealType: sealType, 
        branch: "",
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
        pumpingTemperature: { value: "", unit: "" },
        maximumTemperature: { value: "", unit: "" },
        spGravity: "",
        freezingPoint: "",
        boilingPoint: "",
        viscosity: "",
        percentageOfSolid: "",
        solidSize: "",
        specialNote: "",
        salesInquiryId: 0
      },
      Pump: {
        pumpInquiryReferenceNo: "",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        sealType: sealType, 
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
        suctionPressure: { value: "", unit: "" },
        dischargePressure: { value: "", unit: "" },
        boxPressure: { value: "", unit: "" },
        totalHead: { value: "", unit: "" },
        pumpingTemperature: { value: "", unit: "" },
        maximumTemperature: { value: "", unit: "" },
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
      ApiPlan: {
        apiPlanInquiryId: "",
        apiPlanInquiryReferenceNo: "",
        equipmentMake: "",
        createdByUser: authState?.sub,
        updatedByUser: authState?.sub,
        sealType:sealType,
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
        salesInquiryId: ""
      },
      RotaryJoin: {
        rotaryJointInquiryId: "",
        rotaryJointInquiryReferenceNo: "",
        sealType: sealType, 
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
  
    return defaultData[sealType] || {};
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
  


// const handleChange = (arrayName = null, index = null) => (event) => {
//   const { name, value } = event.target;

//   const updatedInquiries = [...formData[arrayName]];
//   updatedInquiries[index] = {
//     ...updatedInquiries[index],
//     [name]: value
//   };
//   setFormData({
//     ...formData,
//     [arrayName]: updatedInquiries
//   });
// };


const handleChange = (arrayName = null, index = null) => (event) => {
  const { name, value } = event.target;

  setFormData((prev) => {
    // Get existing array reference
    const updatedInquiries = prev[arrayName];

    // Prevent unnecessary re-renders (update only if value actually changes)
    if (updatedInquiries[index][name] === value) return prev;

    // Create a new updated object
    const updatedItem = { ...updatedInquiries[index], [name]: value };

    // Use map to create a new array while updating only the specific index
    const newInquiries = updatedInquiries.map((item, idx) =>
      idx === index ? updatedItem : item
    );

    return { ...prev, [arrayName]: newInquiries };
  });
};


      console.log("formData after vp is",formData);  
  



      const inquiryTypes = {
        Agitator: "agitatorInquiries",
        Pump: "pumpInquiries",
        ApiPlan: "apiPlanInquiries",
        RotaryJoin: "rotaryJointInquiries"
      };




  const cancelUpdate = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  };


  return (

    <Container className="container">
      <form>
        {/* Existing Drawing Requisition Section */}
        <div className='card'>
          {!sId ? <h1>New Sales Inquiry :</h1> : <h1>Update Sales Inquiry :</h1>}

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
                value={formData.salesInquiryReferenceNo}
                id="disableItem"
                InputLabelProps={{
                  shrink: Boolean(formData.salesInquiryReferenceNo),
                }}
                autoFocus={formData.salesInquiryReferenceNo} 
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
    name="customerReferenceNo"
    value={formData.customerReferenceNo}
    onChange={handleFieldChange}
    required
    fullWidth
    InputProps={{
      endAdornment: (
        <Button
          variant="contained"
          size="small"
          style={{
            backgroundColor: "#38c0d0",
            color: "white",
            padding: "3px 10px",
            minWidth: "auto",
            height: "24px", // Adjust to fit inside the field
            fontSize: "0.75rem", // Smaller text
            borderRadius: "5px",
            marginRight: "-8px", // Keeps button inside the border
            cursor:"pointer"
          }}
          disabled={!formData.customerReferenceNo}
          onClick={()=>handleFetch(formData?.customerReferenceNo)} // Your function here
        >
          Fetch
        </Button>
      )
    }}
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
            <Grid container sx={{ my: 1 }} spacing={2}>
  {/* Customer Address */}
  <Grid item xs={6} sx={{ ml: 2 }}>
    <TextField
      size="small"
      className="custom-text-field"
      label="Customer Address"
      name="customerAddress"
      value={formData.customerAddress}
      onChange={handleChange}
      id="disableItem"
      disabled
      multiline
      rows={4}
      InputLabelProps={{
        shrink: Boolean(formData.customerAddress),
      }}
      autoFocus={formData.customerAddress}
      required
      fullWidth
    />
  </Grid>


  {/* Contact Person & Mobile Number (Same Row, Equal Width) */}
  <Grid item xs={5} container  spacing={1}>
    {/* Contact Person */}
    <Grid item xs={12}>
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
    

    {/* Mobile Number */}
    <Grid item xs={12}>
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
  </Grid>
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

        <div className='card'  style={{ maxHeight: "80vh", overflowY: "auto", padding:"5px" }}>
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

<div >
  <Grid item xs={2} style={{ marginBottom: "10px" }}>
     
  {Object.keys(inquiryTypes).map((typeKey) => {
    const inquiryKey = inquiryTypes[typeKey]; // Define inquiryKey properly
    if (Array.isArray(formData[inquiryKey]) && formData[inquiryKey].length > 0){
    return formData[inquiryKey]?.map((item, index) => (
  
        <div 
          key={`${typeKey}-${index}`} 
          style={{ 
            border: "1px solid #ccc", 
            padding: "10px", 
            marginBottom: "15px", 
            borderRadius: "5px" 
          }} 
          ref={index === formData[inquiryKey].length - 1 ? latestItemRef : null} // Corrected reference usage
        >

              {/* Display Form Based on Selected Seal Type */}
              {{
            Agitator:(
              <div key={index }>
              <h3>Agitator Seal Item: {index +1}</h3>
              <Grid container spacing={2} style={{ marginTop: "10px" }}>
                {/* Sales Inquiry Item Reference No */}
                <Grid item xs={4}>
                  <TextField
                    label="Sales Inquiry Item Reference No."
                    value={item?.agitatorInquiryReferenceNo}
                    InputProps={{ readOnly: true }}
                    InputLabelProps={{
                      shrink: Boolean(item?.agitatorInquiryReferenceNo),
                    }}
                    autoFocus={item?.agitatorInquiryReferenceNo}
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
         
         
               {/* Performance */}
<Grid item xs={4}>
  <Autocomplete
    style={{ width: "100%" }}
    size="small"
    value={formData?.agitatorInquiries[index]?.performance || ""}
    onChange={(event, newValue) => {
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index ? { ...inq, performance: newValue || "" } : inq
        ),
      }));
    }}
    options={["Satisfactory", "Unsatisfactory"]}
    renderInput={(params) => (
      <TextField
        size="small"
        {...params}
        placeholder="Performance"
        variant="outlined"
        className="custom-text-field"
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
    value={formData?.agitatorInquiries[index]?.existingSealMake || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index ? { ...inq, existingSealMake: value } : inq
        ),
      }));
    }}
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
    value={formData?.agitatorInquiries[index]?.existingSealSize || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index ? { ...inq, existingSealSize: value } : inq
        ),
      }));
    }}
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
    value={formData?.agitatorInquiries[index]?.existingSealMOC || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index ? { ...inq, existingSealMOC: value } : inq
        ),
      }));
    }}
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
    value={formData?.agitatorInquiries[index]?.existingSealApiPlan || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index ? { ...inq, existingSealApiPlan: value } : inq
        ),
      }));
    }}
    size="small"
    fullWidth
    className="custom-text-field"
  />
</Grid>

{/* Vessel Pressure (Operating) */}
<Grid item xs={4}>
  <TextField
    size="small"
    type="number"
    className="custom-text-field"
    name="vesselPressureOperating"
    value={formData?.agitatorInquiries[index]?.vesselPressureOperating || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index
            ? { ...inq, vesselPressureOperating: value }
            : inq
        ),
      }));
    }}
    label="Vessel Pressure (Operating)"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData?.agitatorInquiries[index]?.vesselPressureOperatingUnit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
                    i === index
                      ? { ...inq, vesselPressureOperatingUnit: selectedUnit }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!formData?.agitatorInquiries[index]?.vesselPressureOperating}
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
              <MenuItem value="" disabled>Unit</MenuItem>
              <MenuItem value="kg/cm2">kg/cm²</MenuItem>
              <MenuItem value="bar">bar</MenuItem>
              <MenuItem value="MPa">MPa</MenuItem>
              <MenuItem value="PSI">PSI</MenuItem>
              <MenuItem value="Meter">Meter</MenuItem>
            </Select>
          </FormControl>
        </InputAdornment>
      ),
    }}
  />
</Grid>

{/* Vessel Pressure (Design) */}
<Grid item xs={4}>
  <TextField
    size="small"
    type="number"
    className="custom-text-field"
    name="vesselPressureDesign"
    value={formData?.agitatorInquiries[index]?.vesselPressureDesign || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
          i === index ? { ...inq, vesselPressureDesign: value } : inq
        ),
      }));
    }}
    label="Vessel Pressure (Design)"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData?.agitatorInquiries[index]?.vesselPressureDesignUnit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  agitatorInquiries: prev.agitatorInquiries.map((inq, i) =>
                    i === index
                      ? { ...inq, vesselPressureDesignUnit: selectedUnit }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!formData?.agitatorInquiries[index]?.vesselPressureDesign}
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
              <MenuItem value="" disabled>Unit</MenuItem>
              <MenuItem value="MLC">MLC</MenuItem>
              <MenuItem value="MWC">MWC</MenuItem>
              <MenuItem value="Meter">Meter</MenuItem>
              <MenuItem value="kgf/cm2">kgf/cm²</MenuItem>
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
    value={item?.directionOfRotation || ""}
    onChange={(event, newValue) => {
      setFormData((prevState) => {
        const updatedInquiries = [...prevState.agitatorInquiries];
        updatedInquiries[index] = {
          ...updatedInquiries[index],
          directionOfRotation: newValue || "",
        };
        return { ...prevState, agitatorInquiries: updatedInquiries };
      });
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
    value={item?.speed || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => {
        const updatedInquiries = [...prev.agitatorInquiries];
        updatedInquiries[index] = {
          ...updatedInquiries[index],
          speed: value,
        };
        return { ...prev, agitatorInquiries: updatedInquiries };
      });
    }}
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
    value={item?.fluid || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => {
        const updatedInquiries = [...prev.agitatorInquiries];
        updatedInquiries[index] = {
          ...updatedInquiries[index],
          fluid: value,
        };
        return { ...prev, agitatorInquiries: updatedInquiries };
      });
    }}
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
    value={item?.nature || ""}
    onChange={(event, newValue) => {
      setFormData((prev) => {
        const updatedInquiries = [...prev.agitatorInquiries];
        updatedInquiries[index] = {
          ...updatedInquiries[index],
          nature: newValue || "",
        };
        return { ...prev, agitatorInquiries: updatedInquiries };
      });
    }}
    options={['Option1', 'Option2']}
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
    type="number"
    value={item?.pumpingTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => {
        const updatedInquiries = [...prev.agitatorInquiries];
        updatedInquiries[index] = {
          ...updatedInquiries[index],
          pumpingTemperature: {
            ...updatedInquiries[index]?.pumpingTemperature,
            value,
          },
        };
        return { ...prev, agitatorInquiries: updatedInquiries };
      });
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
                const unit = e.target.value;
                setFormData((prev) => {
                  const updatedInquiries = [...prev.agitatorInquiries];
                  updatedInquiries[index] = {
                    ...updatedInquiries[index],
                    pumpingTemperature: {
                      ...updatedInquiries[index]?.pumpingTemperature,
                      unit,
                    },
                  };
                  return { ...prev, agitatorInquiries: updatedInquiries };
                });
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
              <MenuItem value="" disabled>Unit</MenuItem>
              <MenuItem value="C">℃</MenuItem>
              <MenuItem value="F">℉</MenuItem>
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
    type="number"
    value={item?.maximumTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => {
        const updatedInquiries = [...prev.agitatorInquiries];
        updatedInquiries[index] = {
          ...updatedInquiries[index],
          maximumTemperature: {
            ...updatedInquiries[index]?.maximumTemperature,
            value,
          },
        };
        return { ...prev, agitatorInquiries: updatedInquiries };
      });
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
                const unit = e.target.value;
                setFormData((prev) => {
                  const updatedInquiries = [...prev.agitatorInquiries];
                  updatedInquiries[index] = {
                    ...updatedInquiries[index],
                    maximumTemperature: {
                      ...updatedInquiries[index]?.maximumTemperature,
                      unit,
                    },
                  };
                  return { ...prev, agitatorInquiries: updatedInquiries };
                });
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
              <MenuItem value="" disabled>Unit</MenuItem>
              <MenuItem value="C">℃</MenuItem>
              <MenuItem value="F">℉</MenuItem>
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    type="number"
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
                    value={item?.specialNote}
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
            ),
            Pump: (
              <form>
                <h3>Pump Seal Item: {index +1}</h3>
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
         
  
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Pump MOC"
            name="pumpMOC"
            value={item?.pumpMOC
              || ''}
            onChange={handleChange("pumpInquiries", index)}
            fullWidth
            variant="outlined"
            className="custom-text-field"
          />
        </Grid>

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
            type="number"
            className="custom-text-field"
            name="suctionPressure"
            value={item?.suctionPressure?.value || ""}
            onChange={(e) => {
              const value = e.target.value;
              setFormData((prev) => ({
                ...prev,
                pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                  i === index
                    ? {
                        ...inquiry,
                        suctionPressure: {
                          ...inquiry.suctionPressure,
                          value,
                        },
                      }
                    : inquiry
                ),
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
                          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                            i === index
                              ? {
                                  ...inquiry,
                                  suctionPressure: {
                                    ...inquiry.suctionPressure,
                                    unit: selectedUnit,
                                  },
                                }
                              : inquiry
                          ),
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
    type="number"
    value={item?.boxPressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
          i === index
            ? {
                ...inquiry,
                boxPressure: {
                  ...inquiry.boxPressure,
                  value,
                },
              }
            : inquiry
        ),
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
                  pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                    i === index
                      ? {
                          ...inquiry,
                          boxPressure: {
                            ...inquiry.boxPressure,
                            unit: selectedUnit,
                          },
                        }
                      : inquiry
                  ),
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
                  alignItems: "center",
                },
                minWidth: 60,
              }}
            >
              {!item?.boxPressure?.value && <MenuItem>Unit</MenuItem>}
              {[
                "kg/cm2",
                "kg/cm2 a",
                "kg/cm2 g",
                "bar",
                "bar (a)",
                "bar (g)",
                "Mpa",
                "Mpa (a)",
                "Mpa (g)",
                "Kpa",
                "Kpa (g)",
                "PSI",
                "PSIG",
                "MLC",
                "MWC",
                "Meter",
                "kgf/cm2",
              ].map((unit) => (
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
    type="number"
    value={item?.dischargePressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
          i === index
            ? {
                ...inquiry,
                dischargePressure: {
                  ...inquiry.dischargePressure,
                  value,
                },
              }
            : inquiry
        ),
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
                  pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                    i === index
                      ? {
                          ...inquiry,
                          dischargePressure: {
                            ...inquiry.dischargePressure,
                            unit: selectedUnit,
                          },
                        }
                      : inquiry
                  ),
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
                  alignItems: "center",
                },
                minWidth: 60,
              }}
            >
              {!item?.dischargePressure?.value && <MenuItem>Unit</MenuItem>}
              {[
                "kg/cm2",
                "kg/cm2 a",
                "kg/cm2 g",
                "bar",
                "bar (a)",
                "bar (g)",
                "Mpa",
                "Mpa (a)",
                "Mpa (g)",
                "Kpa",
                "Kpa (g)",
                "PSI",
                "PSIG",
                "MLC",
                "MWC",
                "Meter",
                "kgf/cm2",
              ].map((unit) => (
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
    type="number"
    value={item?.totalHead?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
          i === index
            ? {
                ...inquiry,
                totalHead: {
                  ...inquiry.totalHead,
                  value,
                },
              }
            : inquiry
        ),
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
                  pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                    i === index
                      ? {
                          ...inquiry,
                          totalHead: {
                            ...inquiry.totalHead,
                            unit: selectedUnit,
                          },
                        }
                      : inquiry
                  ),
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
                  alignItems: "center",
                },
                minWidth: 60,
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
        pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
          i === index
            ? {
                ...inquiry,
                directionOfRotation: value,
              }
            : inquiry
        ),
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
    type="number"
    className="custom-text-field"
    name="speed"
    value={item?.speed || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
          i === index
            ? {
                ...inquiry,
                speed: value,
              }
            : inquiry
        ),
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
  {/* Fluid */}
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
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, fluid: value } : inquiry
          ),
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
        <TextField
          {...params}
          label="Nature"
          size="small"
          fullWidth
          className="custom-text-field"
        />
      )}
      value={item?.nature || ""}
      onChange={(event, value) =>
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, nature: value } : inquiry
          ),
        }))
      }
    />
  </Grid>

  {/* Pumping Temperature */}
  <Grid item xs={4}>
    <TextField
      size="small"
      className="custom-text-field"
      name="pumpingTemperature"
      type="number"
      value={item?.pumpingTemperature?.value || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index
              ? {
                  ...inquiry,
                  pumpingTemperature: {
                    ...inquiry.pumpingTemperature,
                    value,
                  },
                }
              : inquiry
          ),
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
                    pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                      i === index
                        ? {
                            ...inquiry,
                            pumpingTemperature: {
                              ...inquiry.pumpingTemperature,
                              unit: selectedUnit,
                            },
                          }
                        : inquiry
                    ),
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
                <MenuItem value="C">℃</MenuItem>
                <MenuItem value="F">℉</MenuItem>
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
      type="number"
      value={item?.maximumTemperature?.value || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index
              ? {
                  ...inquiry,
                  maximumTemperature: {
                    ...inquiry.maximumTemperature,
                    value,
                  },
                }
              : inquiry
          ),
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
                    pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
                      i === index
                        ? {
                            ...inquiry,
                            maximumTemperature: {
                              ...inquiry.maximumTemperature,
                              unit: selectedUnit,
                            },
                          }
                        : inquiry
                    ),
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
                <MenuItem value="C">℃</MenuItem>
                <MenuItem value="F">℉</MenuItem>
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
      type="number"
      name="spGravity"
      value={item?.spGravity || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, spGravity: value } : inquiry
          ),
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
      type="number"
      value={item?.freezingPoint || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, freezingPoint: value } : inquiry
          ),
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
      type="number"
      value={item?.boilingPoint || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, boilingPoint: value } : inquiry
          ),
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
      type="number"
      name="viscosity"
      value={item?.viscosity || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, viscosity: value } : inquiry
          ),
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
      type="number"
      value={item?.percentageOfSolid || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, percentageOfSolid: value } : inquiry
          ),
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
      type="number"
      label="Solid Size"
      name="solidSize"
      value={item?.solidSize || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, solidSize: value } : inquiry
          ),
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
          pumpInquiries: prev.pumpInquiries.map((inquiry, i) =>
            i === index ? { ...inquiry, specialNote: value } : inquiry
          ),
        }));
      }}
      fullWidth
      className="custom-text-field"
      inputProps={{ maxLength: 150 }}
    />
  </Grid>
        </Grid>
        
            </form>
            ),
            ApiPlan: (
              <form>
      <div>
                <h3>Api Plan Inquiry Item : {index+1}</h3>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          {/* Sales Inquiry Item Reference No. */}
          <Grid item xs={4}>
            <TextField
              label="Sales Inquiry Item Reference No."
              name="salesInquiryRefNo"
              value={item?.apiPlanInquiryReferenceNo}
              fullWidth
              disabled
              size="small"
              variant="outlined"
              className="custom-text-field"
              id="disableItem"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
           <Autocomplete
             size="small"
             value={item?.branch || ''}
             onChange={(event, newValue) => {
               const updatedInquiries = [...formData.apiPlanInquiries];
               updatedInquiries[index] = {
                 ...updatedInquiries[index], // Preserve other fields
                 branch: newValue || "", // Update only the branch field
               };
               setFormData((prevState) => ({
                 ...prevState,
                 apiPlanInquiries: updatedInquiries,
               }));
             }}
             inputValue={formData?.apiPlanInquiries[index]?.branch || ''}
             onInputChange={(event, newInputValue) => {
               const updatedInquiries = [...formData.apiPlanInquiries];
               updatedInquiries[index] = {
                 ...updatedInquiries[index], // Preserve other fields
                 branch: newInputValue || "", // Update only the branch field
               };
               setFormData((prevState) => ({
                 ...prevState,
                 apiPlanInquiries: updatedInquiries,
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


          {/* Created On */}
          <Grid item xs={4}>
            <TextField
              label="Created On *"
              name="createdOn"
              value={dateTime}
              fullWidth
              id="disableItem"
              size="small"
              variant="outlined"
              className="custom-text-field"
              InputProps={{ readOnly: true }}
            />
          </Grid>


          {/* Updated On */}
          <Grid item xs={4}>
            <TextField
              label="Updated On"
              name="updatedOn"
              value={dateTime}
              id="disableItem"
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Created By"
              value={authState?.sub}
              id="disableItem"
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              label="Updated By"
              value={authState?.sub}
              id="disableItem"
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
              InputProps={{ readOnly: true }}
            />
          </Grid>


        </Grid>

        {/* 1st Form ll */}
        <h3 style={{ padding: '10px 0' }}>Equipment Detail :-</h3>
<Grid container spacing={2}>
  {/* Make */}
  <Grid item xs={4}>
    <TextField
      label="Make"
      name="equipmentMake"
      value={item.equipmentMake || ""}
      onChange={handleChange("apiPlanInquiries", index)}
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
      name="equipmentModel"
      value={item.equipmentModel || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Type */}
  <Grid item xs={4}>
    <TextField
      label="Type"
      name="equipmentType"
      value={item.equipmentType || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Arrangement */}
  <Grid item xs={4}>
    <Autocomplete
      size="small"
      options={["Horizontal", "Vertical"]}
      getOptionLabel={(option) => option}
      value={item.arrangement || null}
      onChange={(event, newValue) => {
        setFormData((prev) => {
          const updatedApiPlanInquiry = [...prev.apiPlanInquiries];
          updatedApiPlanInquiry[index] = {
            ...updatedApiPlanInquiry[index],
            arrangement: newValue || "",
          };
          return { ...prev, apiPlanInquiries: updatedApiPlanInquiry };
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Arrangement"
          variant="outlined"
          className="custom-text-field"
          fullWidth
        />
      )}
    />
  </Grid>

  {/* Tag Number */}
  <Grid item xs={4}>
    <TextField
      label="Tag Number"
      name="tagNumber"
      value={item.tagNumber || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Pump MOC */}
  <Grid item xs={4}>
    <TextField
      label="Pump MOC"
      name="pumpMOC"
      value={item.pumpMOC || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>
</Grid>


        {/*////////////// 3rd from //////////////// */}

        <h3 style={{ padding: '10px 0' }}>Mechanical Seal Data :-</h3>
        <Grid container spacing={2}>
  {/* Drawing Number */}
  <Grid item xs={4}>
    <TextField
      label="Drawing Number"
      name="drawingNumber"
      value={item.drawingNumber || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Mechanical Seal Make */}
  <Grid item xs={4}>
    <TextField
      label="Mechanical Seal Make"
      name="mechanicalSealMake"
      value={item.mechanicalSealMake || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Mechanical Seal Series */}
  <Grid item xs={4}>
    <TextField
      label="Mechanical Seal Series"
      name="mechanicalSealSeries"
      value={item.mechanicalSealSeries || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Connection Size */}
  <Grid item xs={4}>
    <TextField
      label="Connection Size"
      name="connectionSize"
      value={item.connectionSize || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Shaft Size */}
  <Grid item xs={4}>
    <TextField
      label="Shaft Size"
      name="shaftSize"
      value={item.shaftSize || ""}
      onChange={handleChange("apiPlanInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>
</Grid>


        {/*//////////// 4th From section /////////////// */}

        <h3 style={{ padding: '10px 0' }}>Operating Parameters :-</h3>
        <Grid container spacing={2}>
          {/* Rotation */}
      {/* Rotation */}
<Grid item xs={4}>
  <TextField
    label="Rotation"
    name="rotation"
    value={item?.rotation || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, rotation: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>

{/* MAWP */}
<Grid item xs={4}>
  <TextField
    size="small"
    type="number"
    className="custom-text-field"
    name="mawp"
    value={item?.mawp?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? { ...inq, mawp: { ...inq.mawp, value } }
            : inq
        ),
      }));
    }}
    label="MAWP"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item?.mawp?.unit || ""}
              onChange={(e) => {
                const unit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? { ...inq, mawp: { ...inq.mawp, unit } }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item?.mawp?.value}
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
              {!item?.mawp?.value && <MenuItem>Unit</MenuItem>}
              {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map(
                (unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </InputAdornment>
      ),
    }}
  />
</Grid>

{/* MAWT */}
<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="mawt"
    type="number"
    value={item?.mawt?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? { ...inq, mawt: { ...inq.mawt, value } }
            : inq
        ),
      }));
    }}
    label="MAWT"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item?.mawt?.unit || ""}
              onChange={(e) => {
                const unit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? { ...inq, mawt: { ...inq.mawt, unit } }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item?.mawt?.value}
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
              {!item?.mawt?.value && <MenuItem>Unit</MenuItem>}
              <MenuItem value="C">℃</MenuItem>
              <MenuItem value="F">℉</MenuItem>
            </Select>
          </FormControl>
        </InputAdornment>
      ),
    }}
  />
</Grid>

{/* Suction Pressure */}
<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="suctionPressurePump"
    type="number"
    value={item?.suctionPressurePump?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? {
                ...inq,
                suctionPressurePump: {
                  ...inq.suctionPressurePump,
                  value,
                },
              }
            : inq
        ),
      }));
    }}
    label="Suction Pressure"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item?.suctionPressurePump?.unit || ""}
              onChange={(e) => {
                const unit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? {
                          ...inq,
                          suctionPressurePump: {
                            ...inq.suctionPressurePump,
                            unit,
                          },
                        }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item?.suctionPressurePump?.value}
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
              {!item?.suctionPressurePump?.value && <MenuItem>Unit</MenuItem>}
              {["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map(
                (unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                )
              )}
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
    name="boxPressurePump"
    type="number"
    value={item.boxPressurePump?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? {
                ...inq,
                boxPressurePump: {
                  ...inq.boxPressurePump,
                  value,
                },
              }
            : inq
        ),
      }));
    }}
    label="Box Pressure"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item.boxPressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? {
                          ...inq,
                          boxPressurePump: {
                            ...inq.boxPressurePump,
                            unit: selectedUnit,
                          },
                        }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item.boxPressurePump?.value}
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
              {!item?.boxPressurePump?.value && <MenuItem>Unit</MenuItem>}
              {["kg/cm2","kg/cm2 a","kg/cm2 g","bar","bar (a)","bar (g)","Mpa","Mpa (a)","Mpa (g)","Kpa","Kpa (g)","PSI","PSIG","MLC","MWC","Meter","kgf/cm2"].map((unit) => (
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
    name="dischargePressurePump"
    type="number"
    value={item.dischargePressurePump?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? {
                ...inq,
                dischargePressurePump: {
                  ...inq.dischargePressurePump,
                  value,
                },
              }
            : inq
        ),
      }));
    }}
    label="Discharge Pressure"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item.dischargePressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? {
                          ...inq,
                          dischargePressurePump: {
                            ...inq.dischargePressurePump,
                            unit: selectedUnit,
                          },
                        }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item.dischargePressurePump?.value}
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
              {!item?.dischargePressurePump?.value && <MenuItem>Unit</MenuItem>}
              {["kg/cm2","kg/cm2 a","kg/cm2 g","bar","bar (a)","bar (g)","Mpa","Mpa (a)","Mpa (g)","Kpa","Kpa (g)","PSI","PSIG","MLC","MWC","Meter","kgf/cm2"].map((unit) => (
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
    label="Speed"
    type="number"
    name="speed"
    value={item.speed || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, speed: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="vesselPressureAgitator"
    type="number"
    value={item.vesselPressureAgitator?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? {
                ...inq,
                vesselPressureAgitator: {
                  ...inq.vesselPressureAgitator,
                  value,
                },
              }
            : inq
        ),
      }));
    }}
    label="Vessel Pressure (Agitator)"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item.vesselPressureAgitator?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? {
                          ...inq,
                          vesselPressureAgitator: {
                            ...inq.vesselPressureAgitator,
                            unit: selectedUnit,
                          },
                        }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item.vesselPressureAgitator?.value}
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
              {!item.vesselPressureAgitator?.value && <MenuItem>Unit</MenuItem>}
              {["kg/cm2","kg/cm2 a","kg/cm2 g","bar","bar (a)","bar (g)","Mpa","Mpa (a)","Mpa (g)","Kpa","Kpa (g)","PSI","PSIG","MLC","MWC","Meter","kgf/cm2"].map((unit) => (
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
    label="Fluid"
    name="fluid"
    value={item.fluid || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, fluid: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="operatingTemperature"
    type="number"
    value={item.operatingTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? {
                ...inq,
                operatingTemperature: {
                  ...inq.operatingTemperature,
                  value,
                },
              }
            : inq
        ),
      }));
    }}
    label="Operating Temperature"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item.operatingTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? {
                          ...inq,
                          operatingTemperature: {
                            ...inq.operatingTemperature,
                            unit: selectedUnit,
                          },
                        }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item.operatingTemperature?.value}
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
              {!item.operatingTemperature?.value && <MenuItem>Unit</MenuItem>}
              {["°C", "°F"].map((unit) => (
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
    name="maxTemperature"
    type="number"
    value={item.maxTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index
            ? {
                ...inq,
                maxTemperature: {
                  ...inq.maxTemperature,
                  value,
                },
              }
            : inq
        ),
      }));
    }}
    label="Max Temperature"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={item.maxTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
                    i === index
                      ? {
                          ...inq,
                          maxTemperature: {
                            ...inq.maxTemperature,
                            unit: selectedUnit,
                          },
                        }
                      : inq
                  ),
                }));
              }}
              displayEmpty
              disabled={!item.maxTemperature?.value}
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
              {!item.maxTemperature?.value && <MenuItem>Unit</MenuItem>}
              {["°C", "°F"].map((unit) => (
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
    label="Viscosity"
    name="viscosity"
    type="number"
    value={item.viscosity || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, viscosity: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>


<Grid item xs={4}>
  <TextField
    label="Sp. Gravity"
    name="spGravity"
    type="number"
    value={item.spGravity || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, spGravity: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="Percentage of Solid"
    name="percentageOfSolid"
    type="number"
    value={item.percentageOfSolid || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, percentageOfSolid: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>


          {/* Size of Solid Particles */}
          <Grid item xs={4}>
            <TextField
              label="Size of Solid Particles"
              name="solidSize"
              type="number"
              value={item.solidSize || ""}
              onChange={handleChange("apiPlanInquiries", index)}
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
              type="number"
              value={item.freezingPoint || ""}
              onChange={handleChange("apiPlanInquiries", index)}
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
              type="number"
              value={item.boilingPoint || ""}
              onChange={handleChange("apiPlanInquiries", index)}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

        </Grid>

        {/*//////////// 6th form //////////////////// */}

        <h3 style={{ padding: '10px 0' }}>Leak Proof Proposal :-</h3>
        <Grid container spacing={2}>
  {/* API Plan */}
  <Grid item xs={4}>
  <TextField
    label="API Plan"
    name="leakProofProposalApiPlan"
    value={item.leakProofProposalApiPlan || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, leakProofProposalApiPlan: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="Capacity"
    name="capacity"
    type="number"
    value={item.capacity || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, capacity: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="Heat Exchange Type"
    name="heatExchangeType"
    value={item.heatExchangeType || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, heatExchangeType: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <TextField
    label="Heat Exchange Area"
    name="heatExchangeArea"
    type="number"
    value={item.heatExchangeArea || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, heatExchangeArea: value } : inq
        ),
      }));
    }}
    fullWidth
    size="small"
    variant="outlined"
    className="custom-text-field"
  />
</Grid>
<Grid item xs={4}>
  <Autocomplete
    style={{ width: '100%' }}
    size="small"
    value={item.standard || ""}
    onChange={(event, newValue) => {
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: prev.apiPlanInquiries.map((inq, i) =>
          i === index ? { ...inq, standard: newValue || "" } : inq
        ),
      }));
    }}
    options={['API', 'Non-API']}
    renderInput={(params) => (
      <TextField
        size="small"
        {...params}
        placeholder="Standard"
        variant="outlined"
        className='custom-text-field'
        fullWidth
        label="Standard"
      />
    )}
  />
</Grid>



</Grid>



      </div>
    </form>
            ),
            RotaryJoin: (  
              <form>
              <div>
                <h3>Rotaryjoin Item : {index+1}</h3>
                <Grid container spacing={2} style={{ marginTop: "10px" }}>
  {/* Sales Inquiry Item Reference No */}
  <Grid item xs={4}>
    <TextField
      label="Sales Inquiry Item Reference No."
      value={item.rotaryJointInquiryReferenceNo || ""}
      InputProps={{ readOnly: true }}
      size="small"
      fullWidth
      disabled
      className="custom-text-field"
    />
  </Grid>

  {/* Branch */}
  <Grid item xs={12} sm={4}>
    <Autocomplete
      size="small"
      value={item.branch || ''}
      onChange={(event, newValue) => {
        setFormData((prevState) => ({
          ...prevState,
          rotaryJointInquiries: prevState.rotaryJointInquiries.map((inq, i) =>
            i === index ? { ...inq, branch: newValue || "" } : inq
          ),
        }));
      }}
      inputValue={formData?.rotaryJointInquiries[index]?.branch || ''}
      onInputChange={(event, newInputValue) => {
        setFormData((prevState) => ({
          ...prevState,
          rotaryJointInquiries: prevState.rotaryJointInquiries.map((inq, i) =>
            i === index ? { ...inq, branch: newInputValue || "" } : inq
          ),
        }));
      }}
      options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label="Branch"
          variant="outlined"
          fullWidth
          required
          className="custom-text-field"
        />
      )}
    />
  </Grid>

  {/* Created By User */}
  <Grid item xs={4}>
    <TextField
      label="Created By User"
      value={item.createdByUser || ""}
      InputProps={{ readOnly: true }}
      size="small"
      fullWidth
      disabled
      className="custom-text-field"
    />
  </Grid>

  {/* Created On */}
  <Grid item xs={4}>
    <TextField
      label="Created On"
      value={dateTime || ""}
      InputProps={{ readOnly: true }}
      size="small"
      fullWidth
      disabled
      className="custom-text-field"
    />
  </Grid>

  {/* Updated By User */}
  <Grid item xs={4}>
    <TextField
      label="Updated By User"
      value={item.updatedByUser || ""}
      InputProps={{ readOnly: true }}
      size="small"
      fullWidth
      disabled
      className="custom-text-field"
    />
  </Grid>

  {/* Updated On */}
  <Grid item xs={4}>
    <TextField
      label="Updated On"
      value={dateTime || ""}
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
      value={item.equipment || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      value={item.make || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      value={item.model || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      value={item.fluid || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Operating Temperature */}
  <Grid item xs={4}>
    <TextField
      size="small"
      type="number"
      className="custom-text-field"
      name="operatingTemperature"
      value={item.operatingTemperature || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          rotaryJointInquiries: prev.rotaryJointInquiries.map((inq, i) =>
            i === index ? { ...inq, operatingTemperature: +value } : inq
          ),
        }));
      }}
      label="Operating Temperature"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <FormControl size="small" variant="outlined">
              <Select
                value={item.operatingTemperatureUnit || ""}
                onChange={(e) => {
                  const selectedUnit = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    rotaryJointInquiries: prev.rotaryJointInquiries.map((inq, i) =>
                      i === index ? { ...inq, operatingTemperatureUnit: selectedUnit } : inq
                    ),
                  }));
                }}
                displayEmpty
                disabled={!item.operatingTemperature}
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
                <MenuItem value="" disabled>Unit</MenuItem>
                <MenuItem value="C">℃</MenuItem>
                <MenuItem value="F">℉</MenuItem>
              </Select>
            </FormControl>
          </InputAdornment>
        ),
      }}
    />
  </Grid>

  {/* Flow Rate */}
  <Grid item xs={4}>
    <TextField
      label="Flow Rate"
      name="flowRate"
      type="number"
      value={item.flowRate || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      type="number"
      value={item.speed || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Operating Pressure */}
  <Grid item xs={4}>
    <TextField
      size="small"
      className="custom-text-field"
      name="operatingPressure"
      type="number"
      value={item.operatingPressure || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          rotaryJointInquiries: prev.rotaryJointInquiries.map((inq, i) =>
            i === index ? { ...inq, operatingPressure: +value } : inq
          ),
        }));
      }}
      label="Operating Pressure"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <FormControl size="small" variant="outlined">
              <Select
                value={item.operatingPressureUnit || ""}
                onChange={(e) => {
                  const selectedUnit = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    rotaryJointInquiries: prev.rotaryJointInquiries.map((inq, i) =>
                      i === index ? { ...inq, operatingPressureUnit: selectedUnit } : inq
                    ),
                  }));
                }}
                displayEmpty
                disabled={!item.operatingPressure}
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
                {!item.operatingPressure && <MenuItem>Unit</MenuItem>}
                {[
                  "kg/cm2","kg/cm2 a","kg/cm2 g","bar","bar (a)","bar (g)",
                  "Mpa","Mpa (a)","Mpa (g)","Kpa","Kpa (g)","PSI","PSIG",
                  "MLC","MWC","Meter","kgf/cm2"
                ].map((unit) => (
                  <MenuItem key={unit} value={unit}>{unit}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </InputAdornment>
        ),
      }}
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
      name="existingRotaryJointMake"
      value={item.existingRotaryJointMake || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      value={item.existingRotaryJointModelType || ""}
      onChange={(event, newValue) => {
        setFormData((prev) => ({
          ...prev,
          rotaryJointInquiries: prev.rotaryJointInquiries.map((inq, i) =>
            i === index ? { ...inq, existingRotaryJointModelType: newValue || "" } : inq
          ),
        }));
      }}
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
      name="existingRotaryJointConnectionSize"
      value={item.existingRotaryJointConnectionSize || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      name="existingRotaryJointConnectionType"
      value={item.existingRotaryJointConnectionType || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Joint Type Dropdown */}
  <Grid item xs={4}>
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend">Joint Type</FormLabel>
      <RadioGroup
        row
        name="jointType"
        value={item.jointType || ""}
        onChange={handleChange("rotaryJointInquiries", index)}
      >
        <FormControlLabel
          value="Threaded"
          control={<Radio size="small" />}
          label="Threaded"
        />
        <FormControlLabel
          value="Flanged"
          control={<Radio size="small" />}
          label="Flanged"
        />
      </RadioGroup>
    </FormControl>
  </Grid>
</Grid>

                {/*//////////////// 3rd Form ////////////// */}
        
                <h3 style={{ padding: '10px 0' }}>Proposed Rotary Joint Detail :-</h3>
                <Grid container spacing={2}>
  {/* Make */}
  <Grid item xs={4}>
    <TextField
      label="Make"
      name="proposedRotaryJointMake"
      value={item.proposedRotaryJointMake || ""}
      onChange={handleChange("rotaryJointInquiries", index)}
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
      value={item.proposedRotaryJointModelType || ""}
      onChange={(event, newValue) => {
        setFormData((prev) => ({
          ...prev,
          rotaryJointInquiries: prev.rotaryJointInquiries.map((inq, i) =>
            i === index
              ? { ...inq, proposedRotaryJointModelType: newValue || "" }
              : inq
          ),
        }));
      }}
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

  {/* Conditional Fields Based on Joint Type */}
  {item.jointType === "Threaded" && (
    <>
      <Grid item xs={4}>
        <TextField
          label="Inlet Connection Size"
          name="inletConnectionSize"
          value={item.inletConnectionSize || ""}
          onChange={handleChange("rotaryJointInquiries", index)}
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
          value={item.outletConnectionSize || ""}
          onChange={handleChange("rotaryJointInquiries", index)}
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
          value={item.connectionType || ""}
          onChange={handleChange("rotaryJointInquiries", index)}
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
          value={item.handing || ""}
          onChange={handleChange("rotaryJointInquiries", index)}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>
    </>
  )}

  {item.jointType === "Flanged" && (
    <>
      <Grid item xs={4}>
        <TextField
          label="Inlet Flanged Size"
          name="inletFlangedSize"
          value={item.inletFlangedSize || ""}
          onChange={handleChange("rotaryJointInquiries", index)}
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
          value={item.outletFlangedSize || ""}
          onChange={handleChange("rotaryJointInquiries", index)}
          fullWidth
          size="small"
          variant="outlined"
          className="custom-text-field"
        />
      </Grid>
    </>
  )}

  {/* Attachments */}
  <Grid item xs={6}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="*"
        style={{ display: "none" }}
        onChange={async (event) => {
          const file = event.target.files[0];
          if (!file) return;

          const tempFileURL = URL.createObjectURL(file);

          const formData = new FormData();
          formData.append("file", file);

          try {
            const { data } = await axiosInstance.post(
              `/lens/fileUpload/file?filelocation=${encodeURIComponent(
                file.name.substring(0, 50)
              )}&&filetype=rotary`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            setUploadedFileNames((prev) => {
              const updatedFileNames = [...prev];
              updatedFileNames[index] = data;
              return updatedFileNames;
            });

            setFormData((prev) => ({
              ...prev,
              rotaryJointInquiries: prev.rotaryJointInquiries.map((inquiry, idx) =>
                idx === index
                  ? { ...inquiry, fileName: data, referenceDrawing: data }
                  : inquiry
              ),
            }));
          } catch (err) {
            console.error("File Upload Error:", err);
          }
        }}
      />

      {/* Upload Button */}
      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1px",
          backgroundColor: "black",
          color: "white",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          border: "none",
          fontSize: "14px",
          fontWeight: "bold",
          width: "100%",
        }}
        onClick={() => fileInputRef.current.click()}
      >
        <AttachFileIcon style={{ fontSize: "16px" }} /> Reference Drawing
      </button>

      {formData.rotaryJointInquiries[index]?.referenceDrawing &&
      uploadedFileNames[index] ||formData.rotaryJointInquiries[index]?.fileName  ? (
        <button
          type="button"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#1976d2",
            color: "white",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          onClick={async () => {
            try {
              let fileName = formData.rotaryJointInquiries[index]?.referenceDrawing;
              const res = await axiosInstance.get(
                `lens/file/download/?fileName=${encodeURIComponent(fileName)}`,
                { responseType: "blob" }
              );

              const contentType = res.headers["content-type"];
              const url = window.URL.createObjectURL(
                new Blob([res.data], { type: contentType })
              );

              const parts = fileName.split(".");
              const second = parts[1].split("-");
              const extension = second.shift();
              second.push(`.${extension}`);
              const formattedFileName = parts[0] + "-" + second.join("-");

              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", formattedFileName);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            } catch (error) {
              console.error("File download failed:", error);
            }
          }}
        >
          <DownloadIcon style={{ fontSize: "16px" }} /> Download
        </button>
      ) : null}
    </div>

    {uploadedFileNames[index] ||  formData.rotaryJointInquiries[index]?.fileName&& (
      <p
        style={{
          marginTop: "8px",
          fontSize: "11px",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Uploaded File: {uploadedFileNames[index] || formData.rotaryJointInquiries[index]?.fileName}
        <button
          style={{
            marginLeft: "7px",
            background: "transparent",
            color: "red",
            border: "none",
            cursor: "pointer",
            padding: "5px",
            borderRadius: "3px",
            fontSize: "11px",
          }}
          onClick={() => handleFileDelete(index)}
        >
          X
        </button>
      </p>
    )}
  </Grid>
</Grid>


        </div>
        </form>)
          }[item?.sealType]}
           {/* Remove Button */}
           <IconButton
            color="secondary"
            onClick={() => {
              const inquiryKey = inquiryTypes[item.sealType];
              setFormData(prev => ({
                ...prev,
                [inquiryKey]: prev[inquiryKey]?.filter((_, i) => i !== index)
              }));
            }}
            style={{ marginTop: "10px", backgroundColor: "red", color: "white", borderRadius: "5px" }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        
        ));}
      })}
    
     <Autocomplete
        size="small"
        value={newSealType}
        onChange={(event, newValue) => setNewSealType(newValue || "")}
        options={Object.keys(inquiryTypes)}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Select Seal Type" variant="outlined" fullWidth />
        )}
      />
    </Grid>

    {/* Add Item Button (Only Enabled When a Seal Type is Selected) */}
    <IconButton
  color="primary"
  size="small"
  disabled={!authState?.authorities.includes("SalesInquiry_Write") &&!newSealType}
  onClick={() => {
    if (!newSealType) return;

    const inquiryKey = inquiryTypes[newSealType];
  console.log("new sealType is ",inquiryTypes[newSealType])

    setFormData(prev => {
      const updatedData = {
        ...prev,
        [inquiryKey]: [
          ...(prev[inquiryKey] || []), 
          { ...getDefaultInquiryData(newSealType), sealType: newSealType }
        ]
      };

      // Use setTimeout to ensure DOM is updated before scrolling
      setTimeout(() => {
        if (latestItemRef.current) {
          latestItemRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
        console.log("updated Data is ",updatedData)
      return updatedData;
    });

    setNewSealType(""); // Reset Dropdown
  }}
  
  style={{
    backgroundColor: newSealType ? "black" : "gray",
    color: "white",
    borderRadius: "5px",
    marginBottom: "15px"
  }}
>
  <AddIcon fontSize="small" /> Add Item
</IconButton>




  </div>
     </div>
        </div>



        {/* Submit/Update Buttons */}
        <Grid item xs={4}>
          <Grid item xs={4}>
            {!sId ? (
              <Button
                className="submit-btn"
                style={{ margin: "2rem 1rem" }}
                onClick={(e) => handleSubmit(e, formData, navigate)}
                type="submit"
                disabled={!authState?.authorities.includes("SalesInquiry_Write")}
                variant="contained">
                Submit
              </Button>
            ) : (
              <>
                <Button
                  className="update-btn"
                  variant="contained"
                  disabled={!authState?.authorities.includes("SalesInquiry_Write")}
                  type="submit"
                  onClick={(e) => handleUpdate(e, formData, sId, navigate)}
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