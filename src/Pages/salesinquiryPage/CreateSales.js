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


  
  // const [formData, setFormData] = useState({
  //   salesInquiryRef: '',
  //   customerRef: '',
  //   customerName: '',  // Not editable
  //   customerAddress: '', // Editable
  //   contactPerson: '', // Editable
  //   mobileNumber: '', // Editable
  //   sourceOfInquiry: '',
  //   industry: '', // Not editable
  //   branch: '', // Selectable
  //   createdBy: authState?.sub, // Selectable
  //   createdOn: dateTime, // Auto-generated
  //   updatedBy: authState?.sub, // Selectable
  //   updatedOn: dateTime, // Auto-generated
  //   branch: '',
  //   endUser: '',
  //   sealArrangement: "",
  //   costingRequirement: '',
  //   customerAddress: '',
  //   customerName: '',
  //   make: '',
  //   model: '',
  //   impeller: '',
  //   shaft: '',
  //   sealChamber: '',
  //   bearingBracket: '',
  //   tagNumber: '',
  //   arrangement: '',
  //   pumpType: '',
  //   stuffingBox: '',
  //   stage: '',
  //   casting: '',
  //   series: '',
  //   sealType: '',
  //   performance: '',
  //   flushPlan: '',
  //   barrierOrBufferPlan: '',
  //   quenchPlan: '',
  //   barrierOrBufferFluid: '',
  //   designOffered: '',
  //   sizeAvailable: '',
  //   materialCode: '',
  //   sealSeries: '',
  //   shaftSize: '',
  //   boreDia: '',
  //   boreDepth: '',
  //   nearestObstruction: '',
  //   allPressureUnit: '',
  //   totalHeat: '',
  //   suctionPressure: '',
  //   dischargePressure: '',
  //   directionOfRotation: '',
  //   speed: '',
  //   boxPressure: '',
  //   operatingFluid: '',
  //   allTempPressureUnit: '',
  //   nature: '',
  //   operatingTemperature: '',
  //   minOperatingTemperature: '',
  //   spGravity: '',
  //   freezePoint: '',
  //   boilPoint: '',
  //   viscosity: '',
  //   viscosityUnit: '',
  //   percentageOfSolid: '',
  //   grainPoint: '',
  //   description: '',
  //   d1SleeveOd: '',
  //   studHoles: '',
  //   d2StuffingBoxId: '',
  //   d4StuffingBoxBore: '',
  //   d5SpigotDia: '',
  //   d51: '',
  //   d52: '',
  //   d9BoltCircle: '',
  //   boltSize: '',
  //   l11: '',
  //   l12: '',
  //   l1SleeveExten: '',
  //   l2ShaftHub: '',
  //   l3ThreadLength: '',
  //   l8sbDepth: '',
  //   l9NearObstr: '',
  //   alpha: '',
  //   beta: '',
  //   theta: '',
  //   createdByUserGUID: '',
  //   lastEditedByUserGUID: '',
  //   rowguid: '',
  //   region: '',
  //   address: '',
  //   emailId: '',
  //   srNo: '',
  //   dshaftOd: '',
  //   sboxCover: '',
  //   mnumberOfBolts: '',
  //   lraisedCol: '',
  //   existingSeal: {
  //     gaNumber: '',
  //     sealSeries: '',
  //     shaftDia: '',
  //     sealSize: '',
  //     sealType: 'single',
  //     ibMoc: {
  //       face: '',
  //       elastomer: '',
  //       springElement: '',
  //       contactHardware: '',
  //       nonContactHardware: ''
  //     },
  //     obMoc: {
  //       face: '',
  //       elastomer: '',
  //       springElement: '',
  //       contactHardware: '',
  //       nonContactHardware: ''
  //     }
  //   },
  //   newSeal: {
  //     shaftDia: '',
  //     boreDia: '',
  //     boreDepth: '',
  //     nearestObstruction: '',
  //     sealType: 'single',
  //     ibMoc: {
  //       face: '',
  //       elastomer: '',
  //       springElement: '',
  //       contactHardware: '',
  //       nonContactHardware: ''
  //     },
  //     obMoc: {
  //       face: '',
  //       elastomer: '',
  //       springElement: '',
  //       contactHardware: '',
  //       nonContactHardware: ''
  //     },

  //     pump: {
  //       make: '',
  //       model: '',
  //       moc: '',
  //       impellerCasingMoc: '',
  //       shaftMoc: '',
  //       bearingBkt: '',
  //       tagNumber: '',
  //       arrangement: '',
  //       pumpType: '',
  //       stage: '',
  //       casingType: ''
  //     }

  //   }
  // });


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
  pumpInquiries: [
    {
      pumpInquiryReferenceNo: "",
      createdByUser: "",
      updatedByUser: "",
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
    }
  ],
  agitatorInquiries: [
    {
      series: "",
      performance: "",
      sealArrangement: "",
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
    }
  ],
  apiPlanInquiries: [
    {
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
      salesInquiryId: 0
    }
  ],
  rotaryJointInquiries: [
    {
      rotaryJointInquiryId: "",
      rotaryJointInquiryReferenceNo: "",
      createdByUser: "",

      updatedByUser: "",
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
  ]
})

  useEffect(() => {
    if (pId !== undefined) {
      getPumpSeal(pId, setFormData);
    }
  }, [pId]);



  // const handleChange = (field, index = null) => (event) => {
  //   const { value } = event.target;
  
  //     console.log("value is ", value);
      
  //   setFormData((prevState) => {
  //     if (index !== null && Array.isArray(prevState.agitatorInquiries)) {
  //       // Handle updates to nested fields (agitatorInquiries)
  //       return {
  //         ...prevState,
  //         agitatorInquiries: prevState.agitatorInquiries[0]?.map((item, idx) =>
  //           idx === index ? { ...item, [field]: value } : item
  //         ),
  //       };
  //     }
  
  //     // Handle direct updates to formData
  //     return {
  //       ...prevState,
  //       [field]: value,
  //     };
  //   });
  // };
  
  
  const handleChange = (arrayName = null, index = null) => (event) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => {
      if (arrayName) {
        // If the input belongs to an array
        const updatedArray = [...prevState[arrayName]];
        
        // If `index` is provided, update the specific item in the array
        if (index !== null) {
          updatedArray[index] = {
            ...updatedArray[index],
            [name]: value,
          };
        }
  
        return {
          ...prevState,
          [arrayName]: updatedArray,
        };
      } else {
        // If the input belongs to a top-level property
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };
  
  
      console.log("formData after vp is",formData);  
  



  const handleSealTypeChange = (event) => {
    setSealType(event.target.value);
  };


  // const handleSealConfigChange = (event) => {
  //   const newValue = event.target.value;
  //   setSelectedSealType(newValue);

  //   if (sealType === 'existing') {
  //     setFormData(prev => ({
  //       ...prev,
  //       existingSeal: {
  //         ...prev.existingSeal,
  //         sealType: newValue || ""
  //       }
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       newSeal: {
  //         ...prev.newSeal,
  //         sealType: newValue || ""
  //       }
  //     }));
  //   }
  // };




  const handleMocChange = (section, type, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [type]: {
          ...prev[section][type],
          [field]: value
        }
      }
    }));
  };

  const cancelUpdate = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  };


  const PumpData = (section, type) => (

    <form>
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {/* Autogenerated Reference Number */}
        <Grid item xs={4}>
          <TextField
            size="small"
            className="custom-text-field"
            label="Pump Inquiry Reference No."
            value={formData?.pumpInquiries[0]?.pumpInquiryReferenceNo}
            disabled
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
  <Autocomplete
    size="small"
    value={formData?.pumpInquiries[0]?.branch || ''}
    onChange={(event, newValue) => handleChange('pumpInquiries', 0)({ target: { name: 'branch', value: newValue || '' } })}
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
    value={formData.pumpInquiries[0]?.make || ''}
    onChange={handleChange('pumpInquiries', 0)}
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
    value={formData.pumpInquiries[0]?.model || ''}
    onChange={handleChange('pumpInquiries', 0)}
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
    value={formData.pumpInquiries[0]?.impellerCasingMOC || ''}
    onChange={handleChange("pumpInquiries", 0)}
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
    value={formData.pumpInquiries[0]?.shaftMOC || ''}
    onChange={handleChange("pumpInquiries", 0)}
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
    value={formData.pumpInquiries[0]?.bearingBKT || ''}
    onChange={handleChange("pumpInquiries", 0)}
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
    value={formData.pumpInquiries[0]?.tagNumber || ''}
    onChange={handleChange("pumpInquiries", 0)}
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
    value={formData.pumpInquiries?.[0]?.arrangement || null} 
    onChange={(event, newValue) => {
      setFormData((prev) => {
        const updatedPumpInquiry = [...prev.pumpInquiries];
        updatedPumpInquiry[0] = {
          ...updatedPumpInquiry[0],
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
    value={formData.pumpInquiries[0]?.pumpType || ''}
    onChange={(event, newValue) => {
      setFormData((prev) => {
        const updatedPumpInquiries = [...prev.pumpInquiries];
        updatedPumpInquiries[0] = {
          ...updatedPumpInquiries[0],
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
    value={formData.pumpInquiries[0]?.stage || ''}
    onChange={(event, newValue) => {
      setFormData((prev) => {
        const updatedPumpInquiries = [...prev.pumpInquiries];
        updatedPumpInquiries[0] = {
          ...updatedPumpInquiries[0],
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
    value={formData.pumpInquiries[0]?.casingType || ''}
    onChange={(event, newValue) => {
      setFormData((prev) => {
        const updatedPumpInquiries = [...prev.pumpInquiries];
        updatedPumpInquiries[0] = {
          ...updatedPumpInquiries[0],
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
    value={formData.pumpInquiries[0]?.series || ''}
    onChange={handleChange("pumpInquiries", 0)}
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
      value={formData?.pumpInquiries[0]?.performance || ''}
      onChange={(event, newValue) => {
        setFormData((prev) => {
          const updatedPumpInquiry = [...prev.pumpInquiries];
          updatedPumpInquiry[0] = {
            ...updatedPumpInquiry[0],
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
      value={formData.pumpInquiries[0]?.sealArrangement || ''}
      onChange={(event, newValue) => {
        setFormData((prev) => {
          const updatedPumpInquiry = [...prev.pumpInquiries];
          updatedPumpInquiry[0] = {
            ...updatedPumpInquiry[0],
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
    value={formData.pumpInquiries[0].existingSealMake || ""}
    onChange={handleChange("pumpInquiries", 0)}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    label="Size"
    name="existingSealSize"
    value={formData.pumpInquiries[0]?.existingSealSize || ""}
    onChange={handleChange("pumpInquiries", 0)}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    label="MOC"
    name="existingSealMOC"
    value={formData.pumpInquiries[0]?.existingSealMOC || ""}
    onChange={handleChange("pumpInquiries", 0)}
    fullWidth
  />
</Grid>

<Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    label="API Plan"
    name="existingSealApiPlan"
    value={formData.pumpInquiries[0]?.existingSealApiPlan || ""}
    onChange={handleChange("pumpInquiries", 0)}
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
    value={formData.pumpInquiries[0].suctionPressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            suctionPressure: {
              ...prev.pumpInquiries[0].suctionPressure,
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
              value={formData.pumpInquiries[0].suctionPressure?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      suctionPressure: {
                        ...prev.pumpInquiries[0].suctionPressure,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].suctionPressure?.value}
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
              {!formData.pumpInquiries[0].suctionPressure?.value && <MenuItem>Unit</MenuItem>}
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
    value={formData.pumpInquiries[0].boxPressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            boxPressure: {
              ...prev.pumpInquiries[0].boxPressure,
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
              value={formData.pumpInquiries[0].boxPressure?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      boxPressure: {
                        ...prev.pumpInquiries[0].boxPressure,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].boxPressure?.value}
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
              {!formData.pumpInquiries[0].dischargePressure?.value && <MenuItem>Unit</MenuItem>}
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
    value={formData.pumpInquiries[0].dischargePressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            dischargePressure: {
              ...prev.pumpInquiries[0].dischargePressure,
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
              value={formData.pumpInquiries[0].dischargePressure?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      dischargePressure: {
                        ...prev.pumpInquiries[0].dischargePressure,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].dischargePressure?.value}
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
              {!formData.pumpInquiries[0].dischargePressure?.value && <MenuItem>Unit</MenuItem>}
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
    value={formData.pumpInquiries[0].totalHead?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            totalHead: {
              ...prev.pumpInquiries[0].totalHead,
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
              value={formData.pumpInquiries[0].totalHead?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      totalHead: {
                        ...prev.pumpInquiries[0].totalHead,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].totalHead?.value}
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
              {!formData.pumpInquiries[0].totalHead?.value && <MenuItem>Unit</MenuItem>}
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
    value={formData.pumpInquiries[0].directionOfRotation || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
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
    value={formData.pumpInquiries[0].speed || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
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
      value={formData.pumpInquiries[0].fluid || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [
            {
              ...prev.pumpInquiries[0],
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
          pumpInquiries: [{ ...prev.pumpInquiries[0], nature: value }],
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
    value={formData.pumpInquiries[0].pumpingTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            pumpingTemperature: {
              ...prev.pumpInquiries[0].pumpingTemperature,
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
              value={formData.pumpInquiries[0].pumpingTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      pumpingTemperature: {
                        ...prev.pumpInquiries[0].pumpingTemperature,
                        unit: selectedUnit,
                      },
                    },
                  ],
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].pumpingTemperature?.value}
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
              {!formData.pumpInquiries[0].pumpingTemperature?.value && <MenuItem>Unit</MenuItem>}
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
    value={formData.pumpInquiries[0].maximumTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            maximumTemperature: {
              ...prev.pumpInquiries[0].maximumTemperature,
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
              value={formData.pumpInquiries[0].maximumTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      maximumTemperature: {
                        ...prev.pumpInquiries[0].maximumTemperature,
                        unit: selectedUnit,
                      },
                    },
                  ],
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].maximumTemperature?.value}
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
              {!formData.pumpInquiries[0].maximumTemperature?.value && <MenuItem>Unit</MenuItem>}
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
      value={formData.pumpInquiries[0].spGravity || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], spGravity: value }],
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
      value={formData.pumpInquiries[0].freezingPoint || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], freezingPoint: value }],
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
      value={formData.pumpInquiries[0].boilingPoint || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], boilingPoint: value }],
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
      value={formData.pumpInquiries[0].viscosity || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], viscosity: value }],
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
      value={formData.pumpInquiries[0].percentageOfSolid || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], percentageOfSolid: value }],
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
      value={formData.pumpInquiries[0].solidSize || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], solidSize: value }],
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
      value={formData.pumpInquiries[0].specialNote || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData((prev) => ({
          ...prev,
          pumpInquiries: [{ ...prev.pumpInquiries[0], specialNote: value }],
        }));
      }}
      fullWidth
      className="custom-text-field"
      inputProps={{ maxLength: 150 }}
    />
  </Grid>
</Grid>

    </form>
  );



  ///////////////// Agitor from ////////////////////

  const Agitator = (section, type) => (

    <div>
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {/* Sales Inquiry Item Reference No */}
        <Grid item xs={4}>
          <TextField
            label="Sales Inquiry Item Reference No."
            value={formData.agitatorInquiries[0]?.agitatorInquiryReferenceNo}
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
    value={formData.agitatorInquiries[0]?.branch || ''}
    onChange={(event, newValue) => {
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: [
          {
            ...prevState.agitatorInquiries[0], // Keep the other fields of the first object intact
            branch: newValue || "", // Update the 'branch' property
          },
        ],
      }));
    }}
    
    inputValue={formData?.agitatorInquiries[0]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      setFormData((prevState) => ({
        ...prevState,
        agitatorInquiries: [
          {
            ...prevState.agitatorInquiries[0], // Keep the other fields of the first object intact
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

      {/* //////// 2nd form ///////////// */}

      <h3 style={{ padding: '10px 0' }}>Existing Seal :-</h3>

      <Grid container spacing={2}>
        {/* Series */}
        <Grid item xs={4}>
                <TextField
          label="Series"
          name="series" // This is used to identify the property dynamically
          value={formData.agitatorInquiries[0]?.series || ""}
          onChange={handleChange("agitatorInquiries",0)} // Specify array name and index
          size="small"
          fullWidth
          className="custom-text-field" />
        </Grid>



<Grid item xs={4}>
  <Autocomplete
    style={{ width: '100%' }}
    size="small"
    value={formData?.agitatorInquiries[0]?.sealArrangement || ""}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        agitatorInquiries: [
          {
            ...formData.agitatorInquiries[0],
            sealArrangement: newValue || "" , // Update the sealArrangement field
          },
        ],
      });
    }}
    options={['Single', 'Double']}
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
        value={formData?.agitatorInquiries[0]?.performance || ""}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                agitatorInquiries: [
                  {
                    ...formData.agitatorInquiries[0],
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
          value={formData?.agitatorInquiries[0]?.existingSealMake}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.existingSealSize}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.existingSealMOC}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.existingSealApiPlan}
            onChange={handleChange("agitatorInquiries",0)}
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
    value={formData.agitatorInquiries[0].vesselPressureOperating}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: [
          {
            ...prev.agitatorInquiries[0],
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
              value={formData.agitatorInquiries[0].vesselPressureOperatingUnit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  agitatorInquiries: [
                    {
                      ...prev.agitatorInquiries[0],
                      vesselPressureOperatingUnit: selectedUnit
                    }
                  ]
                }));
          
                
              }}
              displayEmpty
              disabled={!formData.agitatorInquiries[0].vesselPressureOperating}
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
    value={formData.agitatorInquiries[0].vesselPressureDesign}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: [
          {
            ...prev.agitatorInquiries[0],
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
              value={formData.agitatorInquiries[0].vesselPressureDesignUnit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  agitatorInquiries: [
                    {
                      ...prev.agitatorInquiries[0],
                      vesselPressureDesignUnit: selectedUnit
                    }
                  ]
                }));
          
                
              }}
              displayEmpty
              disabled={!formData.agitatorInquiries[0].vesselPressureDesign}
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
            value={formData.agitatorInquiries[0]?.directionOfRotation}
            onChange={(event, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                agitatorInquiries: [
                  {
                    ...prevState.agitatorInquiries[0], // Keep the other fields of the first object intact
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
            value={formData.agitatorInquiries[0]?.speed}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.fluid}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.nature}
            onChange={(event, newValue) => {
              setFormData((prevState) => ({
                ...prevState,
                agitatorInquiries: [
                  {
                    ...prevState.agitatorInquiries[0], // Keep the other fields of the first object intact
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
    value={formData.agitatorInquiries[0].pumpingTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: [
          {
            ...prev.agitatorInquiries[0],
            pumpingTemperature: {
              ...prev.agitatorInquiries[0].pumpingTemperature,
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
              value={formData.agitatorInquiries[0].pumpingTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  agitatorInquiries: [
                    {
                      ...prev.agitatorInquiries[0],
                      pumpingTemperature: {
                        ...prev.agitatorInquiries[0].pumpingTemperature,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.agitatorInquiries[0].pumpingTemperature?.value}
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
    value={formData.agitatorInquiries[0].maximumTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        agitatorInquiries: [
          {
            ...prev.agitatorInquiries[0],
            maximumTemperature: {
              ...prev.agitatorInquiries[0].maximumTemperature,
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
              value={formData.agitatorInquiries[0].maximumTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  agitatorInquiries: [
                    {
                      ...prev.agitatorInquiries[0],
                      maximumTemperature: {
                        ...prev.agitatorInquiries[0].maximumTemperature,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.agitatorInquiries[0].maximumTemperature?.value}
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
            value={formData.agitatorInquiries[0]?.spGravity}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.freezingPoint}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.boilingPoint}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.viscosity}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.percentageOfSolid}
            onChange={handleChange("agitatorInquiries",0)}
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
            value={formData.agitatorInquiries[0]?.solidSize}
            onChange={handleChange("agitatorInquiries",0)}
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
            onChange={handleChange("agitatorInquiries",0)}
            fullWidth
            size="small"
            variant="outlined"
            className="custom-text-field"
            inputProps={{ maxLength: 150 }}
          />
        </Grid>
      </Grid>

    </div>
  )

  // Api plane Section

  const ApiPlane = (section, type) => (
    <form>
      <div>
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
          {/* Sales Inquiry Item Reference No. */}
          <Grid item xs={4}>
            <TextField
              label="Sales Inquiry Item Reference No."
              name="salesInquiryRefNo"
              value={formData?.apiPlanInquiries[0]?.salesInquiryRefNo}
              fullWidth
              disabled
              size="small"
              variant="outlined"
              className="custom-text-field"
              id="disableItem"
              InputProps={{ readOnly: true }}
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
      name="make"
      value={formData?.apiPlanInquiries?.[0]?.make || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.model || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      name="type"
      value={formData?.apiPlanInquiries?.[0]?.type || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.arrangement || null}
      onChange={(event, newValue) => {
        setFormData((prev) => {
          const updatedApiPlanInquiry = [...prev.apiPlanInquiries];
          updatedApiPlanInquiry[0] = {
            ...updatedApiPlanInquiry[0],
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
      value={formData?.apiPlanInquiries?.[0]?.tagNumber || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      name="pumpMoc"
      value={formData?.apiPlanInquiries?.[0]?.pumpMoc || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.drawingNumber || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.mechanicalSealMake || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.mechanicalSealSeries || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.connectionSize || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.shaftSize || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
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
          <Grid item xs={4}>
            <TextField
              label="Rotation"
              name="rotation"
              value={formData.apiPlanInquiries[0]?.rotation}
              onChange={handleChange("apiPlanInquiries",0)}
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
    className="custom-text-field"
    name="mawp"
    value={formData.apiPlanInquiries[0].mawp?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            mawp: {
              ...prev.apiPlanInquiries[0].mawp,
              value
            }
          }
        ]
      }));
    }}
    label="MAWP"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData.apiPlanInquiries[0].mawp?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      mawp: {
                        ...prev.apiPlanInquiries[0].mawp,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].mawp?.value}
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
              {!formData.apiPlanInquiries[0].mawp?.value && <MenuItem>Unit</MenuItem>}
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

          {/* MAWT */}
          <Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="mawt"
    value={formData.apiPlanInquiries[0].mawt?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            mawt: {
              ...prev.apiPlanInquiries[0].mawt,
              value
            }
          }
        ]
      }));
    }}
    label="MAWT"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData.apiPlanInquiries[0].mawt?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      mawt: {
                        ...prev.apiPlanInquiries[0].mawt,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].mawt?.value}
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
              {!formData.apiPlanInquiries[0].mawt?.value && <MenuItem>Unit</MenuItem>}
              {["℃","℉"].map((unit) => (
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

          {/* Suction Pressure */}
          <Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="suctionPressure"
    value={formData.pumpInquiries[0].suctionPressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        pumpInquiries: [
          {
            ...prev.pumpInquiries[0],
            suctionPressure: {
              ...prev.pumpInquiries[0].suctionPressure,
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
              value={formData.pumpInquiries[0].suctionPressure?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  pumpInquiries: [
                    {
                      ...prev.pumpInquiries[0],
                      suctionPressure: {
                        ...prev.pumpInquiries[0].suctionPressure,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.pumpInquiries[0].suctionPressure?.value}
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
              {!formData.pumpInquiries[0].suctionPressure?.value && <MenuItem>Unit</MenuItem>}
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
    value={formData.apiPlanInquiries[0].boxPressure?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            boxPressure: {
              ...prev.apiPlanInquiries[0].boxPressure,
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
              value={formData.apiPlanInquiries[0].boxPressure?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      boxPressure: {
                        ...prev.apiPlanInquiries[0].boxPressure,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].boxPressure?.value}
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
              {!formData.pumpInquiries[0].dischargePressure?.value && <MenuItem>Unit</MenuItem>}
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
    name="dischargePressurePump"
    value={formData.apiPlanInquiries[0].dischargePressurePump?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            dischargePressurePump: {
              ...prev.apiPlanInquiries[0].dischargePressurePump,
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
              value={formData.apiPlanInquiries[0].dischargePressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      dischargePressurePump: {
                        ...prev.apiPlanInquiries[0].dischargePressurePump,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].dischargePressurePump?.value}
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
              {!formData.pumpInquiries[0].dischargePressurePump?.value && <MenuItem>Unit</MenuItem>}
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

          {/* Speed */}
          <Grid item xs={4}>
            <TextField
              label="Speed"
              name="speed"
              value={formData?.apiPlanInquiries[0]?.speed}
              onChange={handleChange("apiPlanInquiries",0)}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Vessel Pressure */}
          <Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="vesselPressureAgitator"
    value={formData.apiPlanInquiries[0].vesselPressureAgitator?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            vesselPressureAgitator: {
              ...prev.apiPlanInquiries[0].vesselPressureAgitator,
              value
            }
          }
        ]
      }));
    }}
    label="Vessel Pressure(Agitator)"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData.apiPlanInquiries[0].vesselPressureAgitator?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      vesselPressureAgitator: {
                        ...prev.apiPlanInquiries[0].vesselPressureAgitator,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].vesselPressureAgitator?.value}
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
              {!formData.apiPlanInquiries[0].vesselPressureAgitator?.value && <MenuItem>Unit</MenuItem>}
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

        </Grid>

        {/*/////////// 5th from/////////////////// */}
        <h3 style={{ padding: '10px 0' }}>Fluid Details :-</h3>
        <Grid container spacing={2}>
          {/* Fluid */}
          <Grid item xs={4}>
            <TextField
              label="Fluid"
              name="fluid"
              value={formData?.apiPlanInquiries[0]?.fluid}
              onChange={handleChange("apiPlanInquiries",0)}
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
    className="custom-text-field"
    name="operatingTemperature"
    value={formData.apiPlanInquiries[0].operatingTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            operatingTemperature: {
              ...prev.apiPlanInquiries[0].operatingTemperature,
              value
            }
          }
        ]
      }));
    }}
    label="OP.Temprature"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData.apiPlanInquiries[0].operatingTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      operatingTemperature: {
                        ...prev.apiPlanInquiries[0].operatingTemperature,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].operatingTemperature?.value}
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
              {!formData.apiPlanInquiries[0].operatingTemperature?.value && <MenuItem>Unit</MenuItem>}
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

          {/* Max Temperature */}
          <Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    name="maxTemperature"
    value={formData.apiPlanInquiries[0].maxTemperature?.value || ""}
    onChange={(e) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiries: [
          {
            ...prev.apiPlanInquiries[0],
            maxTemperature: {
              ...prev.apiPlanInquiries[0].maxTemperature,
              value
            }
          }
        ]
      }));
    }}
    label="Max Temprature"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small" variant="outlined">
            <Select
              value={formData.apiPlanInquiries[0].maxTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiries: [
                    {
                      ...prev.apiPlanInquiries[0],
                      maxTemperature: {
                        ...prev.apiPlanInquiries[0].maxTemperature,
                        unit: selectedUnit
                      }
                    }
                  ]
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiries[0].maxTemperature?.value}
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
              {!formData.apiPlanInquiries[0].maxTemperature?.value && <MenuItem>Unit</MenuItem>}
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

          {/* Viscosity */}
          <Grid item xs={4}>
            <TextField
              label="Viscosity"
              name="viscosity"
              value={formData?.apiPlanInquiries?.[0]?.viscosity || ""}
              onChange={handleChange("apiPlanInquiries", 0)}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Specific Gravity */}
          <Grid item xs={4}>
            <TextField
              label="Sp. Gravity"
              name="specificGravity"
              value={formData?.apiPlanInquiries?.[0]?.specificGravity || ""}
              onChange={handleChange("apiPlanInquiries", 0)}
              fullWidth
              size="small"
              variant="outlined"
              className="custom-text-field"
            />
          </Grid>

          {/* Percentage of Solid */}
          <Grid item xs={4}>
            <TextField
              label="Percentage of Solid"
              name="percentageSolid"
              value={formData?.apiPlanInquiries?.[0]?.percentageSolid || ""}
              onChange={handleChange("apiPlanInquiries", 0)}
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
              name="solidParticleSize"
              value={formData?.apiPlanInquiries?.[0]?.solidParticleSize || ""}
              onChange={handleChange("apiPlanInquiries", 0)}
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
              value={formData?.apiPlanInquiries?.[0]?.freezingPoint || ""}
              onChange={handleChange("apiPlanInquiries", 0)}
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
              value={formData?.apiPlanInquiries?.[0]?.boilingPoint || ""}
              onChange={handleChange("apiPlanInquiries", 0)}
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
      value={formData?.apiPlanInquiries?.[0]?.leakProofProposalApiPlan || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Capacity */}
  <Grid item xs={4}>
    <TextField
      label="Capacity"
      name="capacity"
      value={formData?.apiPlanInquiries?.[0]?.capacity || ""}
      onChange={handleChange("apiPlanInquiries", 0)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Heat Exchange Type */}
  <Grid item xs={4}>
    <TextField
      label="Heat Exchange Type"
      name="heatExchangeType"
      value={formData?.apiPlanInquiries?.[0]?.heatExchangeType || ""}
      onChange={ handleChange("apiPlanInquiries", 0)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Heat Exchange Area */}
  <Grid item xs={4}>
    <TextField
      label="Heat Exchange Area"
      name="heatExchangeArea"
      value={formData?.apiPlanInquiries?.[0]?.heatExchangeArea || ""}
      onChange={handleChange("apiPlanInquiries",0)}
      fullWidth
      size="small"
      variant="outlined"
      className="custom-text-field"
    />
  </Grid>

  {/* Standard */}
  <Grid item xs={4}>
          <Autocomplete
            style={{ width: '100%' }}
            size="small"
        value={formData?.apiPlanInquiries[0]?.standard || ""}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                apiPlanInquiries: [
                  {
                    ...formData.apiPlanInquiries[0],
                    standard: newValue || "", // Update the sealArrangement field
                  },
                ],
              });
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
  );

  const Rotatoryjoin = (section, type) => (
    <form>
      <div>
        
        <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {/* Sales Inquiry Item Reference No */}
        <Grid item xs={4}>
          <TextField
            label="Sales Inquiry Item Reference No."
            value={formData.rotaryJointInquiries[0]?.rotaryJointInquiryReferenceNo}
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
    value={formData.rotaryJointInquiries[0]?.branch || ''}
    onChange={(event, newValue) => {
      setFormData((prevState) => ({
        ...prevState,
        rotaryJointInquiries: [
          {
            ...prevState.rotaryJointInquiries[0], // Keep the other fields of the first object intact
            branch: newValue || "", // Update the 'branch' property
          },
        ],
      }));
    }}
    
    inputValue={formData?.rotaryJointInquiries[0]?.branch || ''}
    onInputChange={(event, newInputValue) => {
      setFormData((prevState) => ({
        ...prevState,
        rotaryJointInquiries: [
          {
            ...prevState.rotaryJointInquiries[0], // Keep the other fields of the first object intact
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
                onChange={
                  // (e)=>{
                  // setFormData({...formData,customerRef:e.target.value})  }
                  handleChange
              }
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
                onChange={handleChange()}
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
          <div style={{ minHeight: '200px' }}>
              <div>
                <Grid container spacing={2}>
                  {/* Option selector */}
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel>Seal Type</InputLabel>
                      <Select
                        size="small"
                        value={sealType}
                        onChange={(e)=>setSealType(e.target.value)}
                        label="Seal Type" >
                        <MenuItem value="agitator">Agitator</MenuItem>
                        <MenuItem value="Pump">Pump</MenuItem>
                        <MenuItem value="apiplane">API Plan</MenuItem>
                        <MenuItem value="rotatoryjoin">Rotatory join</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>


                {/* Conditionally render fields based on seal type */}
                {sealType === 'agitator' && (
                  <div>
                    {Agitator()}
                    {/* Add more fields/components for single seal if needed */}
                  </div>
                )}

                {sealType === 'Pump' && (
                  <div>
                    {PumpData()}
                    {/* Add more fields/components for double seal if needed */}
                  </div>
                )}

                {sealType === 'apiplane' && (
                  <div>
                    {ApiPlane()}
                    {/* Add more fields/components for double seal if needed */}
                  </div>
                )}

                {sealType === 'rotatoryjoin' && (
                  <div>
                    {Rotatoryjoin()}
                    {/* Add more fields/components for double seal if needed */}
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