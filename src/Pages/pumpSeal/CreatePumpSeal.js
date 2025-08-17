import React, { useState, useRef,  useEffect } from 'react';
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
  MenuItem
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getPumpSeal, handleSubmit } from '../../apis/PumpSealApi';
import { handleUpdatePumpSeal } from '../../apis/PumpSealApi';
import { getColumnData } from '../../apis/PumpSealApi';
import { useAuth } from '../../contextApi/AuthContext';
import moment from 'moment';
import axiosInstance from '../../axios/axiosInstance';
import DownloadIcon from '@mui/icons-material/Download';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { PDFDownloadLink,Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import SaveIcon from '@mui/icons-material/Save';
import Logo from '../../assets/Picture1.png'



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
  const [fnOption, setfnOption]  = useState([]);

  const atRefmSeal = useRef(null);
  const atStuffBoxRef = useRef(null);


  const [atmSeal, setAtmSeal] = useState("")
  const [atStuff, setAtStuff] = useState("")



const handleFileDelete = (fieldName)=>{

    setFormData({
      ...formData,
      [fieldName]:""
    })


  switch(fieldName){

   case "attachmentReferenceMechanicalSealDrawing":
        setAtmSeal("");
        break;

      case "attachmentStuffingBoxDetails":
        setAtStuff("");
        break;

        default:
          break 
};
}
  // Add new state for mechanical seal section
  const [sealType, setSealType] = useState('existing');
  const [selectedSealType, setSelectedSealType] = useState('single');

  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const { authState } = useAuth();


  const [formData, setFormData] = useState(
    {
      pumpSealId: "",
      drfNumber: "",
      branch: "",
      salesInquiryItemReferenceNo: "",
      createdOn: dateTime,
      updatedOn: dateTime,
      createdByUser: authState?.sub,
      updatedByUser: authState?.sub,
      customerName: "",
      endUser: "",
      costingRequirement: "",
      proposedMechanicalSeal: "",
      sealType: "",
      existingSealGA: "",
      existingSealSeries: "",
      existingSealShaftDia: "",
      existingSealSize: "",
      existingSealType: "",
      existingSealIBFace: "",
      existingSealIBElastomer: "",
      existingSealIBSpringElement: "",
      existingSealIBContactHardware: "",
      existingSealIBNonContactHardware: "",
      existingSealOBFace: "",
      existingSealOBElastomer: "",
      existingSealOBSpringElement: "",
      existingSealOBContactHardware: "",
      existingSealOBNonContactHardware: "",
      newSealShaftDia: "",
      newSealBoreDia: "",
      newSealBoreDepth: "",
      newSealNearestObstruction: "",
      newSealType: "",
      newSealIBFace: "",
      newSealIBElastomer: "",
      newSealIBSpringElement: "",
      newSealIBContactHardware: "",
      newSealIBNonContactHardware: "",
      newSealOBFace: "",
      newSealOBElastomer: "",
      newSealOBSpringElement: "",
      newSealOBContactHardware: "",
      newSealOBNonContactHardware: "",
      apiFlushingPlans: "",
      apiBarrierBufferPlans: "",
      apiAtmosphericPlans: "",
      apiCollectionPlans: "",
      measurementTypeOfStuffingBox: "",
      measurementShaftOd: "",
      measurementStuffingBoxId: "",
      measurementStuffingBoxDepth: "",
      measurementNearestObstruction: "",
      measurementSpigotDia: "",
      measurementSocketDepth: "",
      measurementShaftSleeveAvailable: "",
      measurementSleeveOd: "",
      measurementStuffingBoxThroatDia: "",
      measurementSleeveShoulderLength: "",
      measurementSleeveExtensionLength: "",
      measurementShaftHubDistance: "",
      measurementNumberOfStuds: "",
      measurementStudSize: "",
      measurementBoltCircleDiameter: "",
      measurementStartAngle: "",
      measurementFlushSize: "",
      measurementFlushAngle: "",
      measurementQuenchSize: "",
      measurementQuenchAngle: "",
      measurementDrainSize: "",
      measurementDrainAngle: "",
      measurementStuffingBox: "",
      otherDetailsAccessories: "",
      otherDetailsRemarks: "",
      attachmentReferenceMechanicalSealDrawing: "",
      attachmentStuffingBoxDetails: "",
      pumpInquiryItem: {
        pumpInquiryId: "",
        pumpInquiryReferenceNo: "",
        createdByUser: "",
        createdOn: "",
        updatedByUser: "",
        updatedOn: "",
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
          id: "",
          value: "",
          unit: ""
        },
        dischargePressure: {
          id: "",
          value: "",
          unit: ""
        },
        boxPressure: {
          id: "",
          value: "",
          unit: ""
        },
        totalHead: {
          id: "",
          value: "",
          unit: ""
        },
        pumpingTemperature: {
          id: "",
          value: "",
          unit: ""
        },
        maximumTemperature: {
          id: "",
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
        salesInquiryId: ""
      }
    }
  );


  useEffect(() => {
    if (pId !== undefined) {
      getPumpSeal(pId, setFormData);
    }
  }, [pId]);


  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: 'Helvetica',
      fontSize: 10,
      lineHeight: 1.5,
      borderWidth: 2,
      borderColor: '#000',
      borderStyle: 'solid',
    },

    compDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      borderBottom: 1,
      paddingBottom: 10
    },

    logoImg: {
      width: 50,
      height: 50,
      marginRight: 14
    },

    compSec: {
      flexDirection: 'column'
    },
    
    title: {
      fontSize: 14,
      fontWeight: 'bold',
    },

    subHeading:{
      fontSize: 10,
      borderTop:1,
      borderBottom:1,
      fontWeight: 'bold',
      paddingTop:5,
      paddingLeft:5,
      marginBottom:3
    },

    compDesc: {
      fontSize: 9,
      color: '#333',
      width:"100%"
    },

    section: {
      marginBottom: 3,
      flexDirection: 'column',
      flexWrap: 'wrap',
      wordBreak: 'break-word',
    },

    header: {
      fontSize: 10,
      fontWeight: "bold",
      marginBottom: 5,
      borderBottom: 1,
      paddingBottom: 3,
      paddingTop: 4,

    },
    table: {
      display: 'table',
      width: '100%',
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
      marginBottom: 8,
      
    },
    tableRow: {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      padding:4,
      marginBottom: 1
    },

    tableCellHeader: {
      width: '40%',
      // padding: 4,
      fontWeight: 'bold',
      flexWrap: 'wrap',
      wordBreak: 'break-word'
    },
     

    tableCell: {
      width: '60%',
      padding: 4,
      fontSize: 8,
      // marginLeft:40,
      flexShrink: 1,        
      minWidth: 0,          
      flexWrap: 'wrap',     
      wordBreak: 'break-word',
      textOverflow: 'clip'  
    },

    subHeader: {
      fontSize: 10,
      fontWeight: 'bold',
      marginTop: 8,
      marginBottom: 4,
      textDecoration: 'underline'
    },

    sharedSplitBoxContainer: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
      width: '100%',
      maxWidth: '100%',  
      marginBottom: 10,
      alignItems: 'flex-start !important', 

    },
    
    leftSplitBox: {
      width: '50%',
      borderRightWidth: 1,
      borderColor: '#000',
      // padding: 4,
      flexShrink: 1,
      flexDirection: 'column',
      flexWrap: 'nowrap',       
    },
    
    rightSplitBox: {
      width: '50%',
      // padding: 4,
      flexDirection: 'column',
      flexWrap: 'nowrap',
      gap: 2,
      boxSizing: 'border-box',
    },
    
    rightTopHeading: {
      fontSize: 12,
      fontWeight: 'bold',
    }

  });



  const Row = ({ label, value }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCellHeader}>{label}</Text>
      <Text style={styles.tableCell}>{value || "-"}</Text>
    </View>
  );


  
  const PDFFile = ({ formData }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.compDetails}>
          <Image src={Logo} style={styles.logoImg} />
          <View style={styles.compSec}>
            <Text style={styles.title}>Mechanical Seal DRF</Text>
            <Text style={styles.compDesc}>Generated Report</Text>
          </View>
        </View>
  
  
        <View style={styles.section}>
        
          <View style={styles.table}>
            <Row label="DRF Number" value={formData.drfNumber} />
            <Row label="Branch" value={formData.branch} />
            <Row label="Sales Inquiry Ref No" value={formData.salesInquiryItemReferenceNo} />
            <Row label="Created By" value={formData.createdByUser} />
            <Row label="Created On" value={formData.createdOn} />
            <Row label="Updated By" value={formData.updatedByUser} />
            <Row label="Updated On" value={formData.updatedOn} />
            <Row label="Customer Name" value={formData.customerName} />
            <Row label="End User" value={formData.endUser} />
            <Row label="Costing Requirement" value={formData.costingRequirement} />
          </View>
        </View>

        <View style={styles.sharedSplitBoxContainer}>
          <View style={styles.leftSplitBox}>
            <Text style={styles.subHeading}>Pump Data</Text>
            <Row label="Make" value={formData.pumpInquiryItem.make} />
            <Row label="Model" value={formData.pumpInquiryItem.model} />
            <Row label="Pump MOC" value={formData.pumpInquiryItem.pumpMOC} />
            <Row label="Impeller/Casing MOC" value={formData.pumpInquiryItem.impellerCasingMOC} />
            <Row label="Shaft MOC" value={formData.pumpInquiryItem.shaftMOC} />
            <Row label="Bearing BKT" value={formData.pumpInquiryItem.bearingBKT} />
            <Row label="Tag Number" value={formData.pumpInquiryItem.tagNumber} />
            <Row label="Arrangement" value={formData.pumpInquiryItem.arrangement} />
            <Row label="Pump Type" value={formData.pumpInquiryItem.pumpType} />
            <Row label="Stage" value={formData.pumpInquiryItem.stage} />
            <Row label="Casing Type" value={formData.pumpInquiryItem.casingType} />
          </View>
  
          <View style={styles.rightSplitBox}>
            <Text style={styles.subHeading}>Existing Seal</Text>
            <Row label="Series" value={formData.existingSealSeries} />
            <Row label="Performance" value={formData.pumpInquiryItem.performance} />
            <Row label="Seal Arrangement" value={formData.pumpInquiryItem.sealArrangement} />
            <Row label="Make" value={formData.pumpInquiryItem.existingSealMake} />
            <Row label="Size" value={formData.pumpInquiryItem.existingSealSize} />
            <Row label="MOC" value={formData.pumpInquiryItem.existingSealMOC} />
            <Row label="API Plan" value={formData.pumpInquiryItem.existingSealApiPlan} />
          </View>
        </View>
  
       <View style={styles.sharedSplitBoxContainer}>
          <View style={styles.leftSplitBox}>
            <Text style={styles.sectionHeader}>Operating Parameters & Fluid</Text>
            <Text>Pressure: {formData.pressure}</Text>
            <Text>Temperature: {formData.temperature}</Text>
            <Text>Fluid: {formData.fluid}</Text>
          </View>
          <View style={styles.rightSplitBox}>
            <Text style={styles.sectionHeader}>Proposed Mechanical Seal</Text>
            <Text>Seal Type: {formData.sealType}</Text>
            <Text>Material: {formData.material}</Text>
            <Text>Size: {formData.size}</Text>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: "#000", marginBottom: 6 }}>
          <Text style={styles.sectionHeader}>API Plan</Text>
          <Text style={{ padding: 4 }}>{formData.apiPlan}</Text>
        </View>

        <View style={{ borderWidth: 1, borderColor: "#000" }}>
          <Text style={styles.sectionHeader}>Measurement</Text>

          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Parameter</Text>
            <Text style={styles.tableHeaderLastCell}>Value</Text>
          </View>

          {formData?.measurements?.map((m, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cell}>{m.parameter}</Text>
              <Text style={styles.lastCell}>{m.value}</Text>
            </View>
          ))}
        </View>

  
        <View style={styles.section}>
          <Text style={styles.subHeading}>Other Details</Text>
          <View style={styles.table}>
            <Row label="Accessories" value={formData.otherDetailsAccessories} />
            <Row label="Remarks" value={formData.otherDetailsRemarks} />
          </View>
        </View>
      </Page>
    </Document>
  );
  




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


console.log("FormData is ",formData);


  const handleFetch = async (apiItem) => {

    try {
      const { data } = await axiosInstance(`lens/salesInquiry/get?itemReferenceNo=${apiItem}`)

      console.log("response is ", data)
      setFormData({
        ...formData,
        pumpInquiryItem: { ...data?.pumpInquiry }
      })

    } catch (err) {
      console.log(err)
    }

  }

  const handleSealTypeChange = (event) => {
    setSealType(event.target.value);
    setFormData((prev)=>({
      ...prev,
      sealType:event.target.value
    }))
  };

  const handleSealConfigChange = (event) => {
    const newValue = event.target.value;
    setSelectedSealType(newValue);

    if (sealType === 'existing') {
      setFormData(prev => ({
        ...prev,
        existingSealType: newValue,
        sealType:"existing"

      }));
    } else {
      setFormData(prev => ({
        ...prev,
        newSealType: newValue,
        sealType:"new"
      }));
    }
  };

  // const handleMocChange = (section, type, field, value) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [section]: {
  //       ...prev[section],
  //       [type]: {
  //         ...prev[section][type],
  //         [field]: value
  //       }
  //     }
  //   }));
  // };

  const cancelUpdate = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  };

  const renderMocFields = (section, type) => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h3 style={{ paddingTop: "12px" }}>
          {type === "IB" ? "IB MOC" : "OB MOC"}
        </h3>
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Face"
          name={`${section}${type}Face`}
          value={formData[`${section}${type}Face`] || ""}
          onChange={(e) => handleChange(e)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Elastomer"
          name={`${section}${type}Elastomer`}
          value={formData[`${section}${type}Elastomer`] || ""}
          onChange={(e) => handleChange(e)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Spring Element"
          name={`${section}${type}SpringElement`}
          value={formData[`${section}${type}SpringElement`] || ""}
          onChange={(e) => handleChange(e)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Contact Hardware"
          name={`${section}${type}ContactHardware`}
          value={formData[`${section}${type}ContactHardware`] || ""}
          onChange={(e) => handleChange(e)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          label="Non-Contact Hardware"
          name={`${section}${type}NonContactHardware`}
          value={formData[`${section}${type}NonContactHardware`] || ""}
          onChange={(e) => handleChange(e)}
          fullWidth
        />
      </Grid>
    </Grid>
  );


  return (

    <Container className="container">
      <form>
        {/* Existing Drawing Requisition Section */}
        <div className='card'>
          {!pId ? <h1>New Pump Seal :</h1> : <h1>Update Pump Seal :</h1>}
         
          {/* Your existing Drawing Requisition form fields */}
          <Grid container spacing={2} styles={{marginTop:'1rem'}}>
           <Grid item xs={4}>
            
              <TextField
                size="small"
                className="custom-text-field"
                disabled
                id="disableItem"
                name="pumpSealDrfNumber"
                InputLabelProps={{
                  shrink: Boolean(formData?.drfNumber),
                }}
                label="Pump Seal Drf Number"
                autoFocus={!formData?.drfNumber}
                value={formData?.drfNumber}
                onChange={(e) => handleChange(e)} />
            </Grid>
            

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                label="Sales Inquiry Reference No."
                name="salesInquiryItemReferenceNo"
                value={formData.salesInquiryItemReferenceNo}
                onChange={(e) => handleChange(e)}
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
                        cursor: "pointer"
                      }}
                      disabled={!formData.salesInquiryItemReferenceNo}
                      onClick={() => handleFetch(formData?.salesInquiryItemReferenceNo)} // Your function here
                    >
                      Fetch
                    </Button>
                  )
                }}
              />
            </Grid>

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

           


            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="createdOn"
                disabled
                id="disableItem"
                value={formData?.createdOn || ''}
                onChange={(e) => handleChange(e)}
                label="Created On"
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="updatedOn"
                disabled
                id="disableItem"
                InputLabelProps={{
                  shrink: Boolean(formData?.updatedOn),
                }}
                value={formData?.updatedOn || ''}
                onChange={(e) => handleChange(e)}
                label="Updated On"
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>



            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="customerName"
                value={formData?.customerName}
                onChange={(e) => handleChange(e)}
                label="Customer Name"
              />
            </Grid>


            <Grid item xs={4}>
             
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                naeme="createdByUser"
                InputLabelProps={{
                  shrink: Boolean(formData?.createdByUser),
                }}
                value={formData?.createdByUser}
                onChange={(e) => handleChange(e)}
                label="Created By User"
              />
            </Grid>

            <Grid item xs={4}>
             
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                name="updatedByUser"
                InputLabelProps={{
                  shrink: Boolean(formData?.updatedByUser),
                }}
                value={formData?.updatedByUser}
                onChange={(e) => handleChange(e)}
                label="Updated By User"
              />
            </Grid>

            <Grid item xs={4}>
             
              <TextField
                size="small"
                className="custom-text-field"
                name="endUser"
                value={formData?.endUser}
                onChange={(e) => handleChange(e)}
                label="End User"
              />
            </Grid>



            <Grid item xs={4}>
  <Autocomplete
    size="small"
    value={formData.costingRequirement === true ? "Yes" : "No"}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        costingRequirement: newValue === "Yes"
      });
    }}
    inputValue={formData.costingRequirement === true ? "Yes" : "No"}
    onInputChange={(event, newInputValue) => {
      if (newInputValue === "Yes" || newInputValue === "No") {
        setFormData({
          ...formData,
          costingRequirement: newInputValue === "Yes"
        });
      }
    }}
    options={["Yes", "No"]}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        placeholder="Select Costing Requirement"
        fullWidth
        className="custom-text-field"
        label="Costing Requirement"
      />
    )}
  />
</Grid>

          </Grid>
        </div>

        {/* Existing Pump Data Section */}
        <div className='card'>
          {/* Your existing Pump Data form fields */}
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Pump Data :-</div></div>
          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                disabled
                id="disableItem"
                name="make"
                value={formData?.pumpInquiryItem?.make}
                onChange={(e) => handleChange(e)}
                label="Make"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                name="model"
                value={formData?.pumpInquiryItem?.model}
                onChange={(e) => handleChange(e)}
                label="Model"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                name="pumpMOC"
                value={formData?.pumpInquiryItem.pumpMOC}
                onChange={(e) => handleChange(e)}
                label="Pump MOC"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                name="impellerCasingMOC"
                value={formData?.pumpInquiryItem.impellerCasingMOC}
                onChange={(e) => handleChange(e)}
                label="Impeller/Casing MOC"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                disabled
                id="disableItem"
                name="shaftMOC"
                value={formData?.pumpInquiryItem.shaftMOC}
                onChange={(e) => handleChange(e)}
                label="Shaft MOC"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                name="bearingBKT"
                value={formData?.pumpInquiryItem.bearingBKT}
                onChange={(e) => handleChange(e)}
                label="Bearing BKT"
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                disabled
                id="disableItem"
                className="custom-text-field"
                name="tagNumber"
                value={formData?.pumpInquiryItem.tagNumber}
                onChange={(e) => handleChange(e)}
                label="Tag Number"
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                style={{ width: '100%' }}
                disabled
                id="disableItem"
                size="small"
                value={formData?.pumpInquiryItem.arrangement}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      arrangement: newValue
                    }
                  });
                }}
                options={['Horizontal', 'Vertical']}
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
              <Autocomplete
                style={{ width: '100%' }}
                size="small"
                disabled
                id="disableItem"
                value={formData?.pumpInquiryItem.pumpType}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      pumpType: newValue
                    }
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
              <Autocomplete
                style={{ width: '100%' }}
                disabled
                id="disableItem"
                size="small"
                value={formData?.pumpInquiryItem.stage}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      stage: newValue
                    }
                  });
                }}
                options={stgOption}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    {...params}
                    placeholder="Select Stage"
                    variant="outlined"
                    className='custom-text-field'
                    label="Stage"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <Autocomplete
                disabled
                id="disableItem"
                style={{ width: '100%' }}
                size="small"
                value={formData?.pumpInquiryItem.casingType}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      casingType: newValue
                    }
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
                    label="Casing Type"
                    fullWidth
                  />
                )}
              />
            </Grid>

          </Grid>
        </div>

        {/* Existing Seal Section */}

        <div className='card'>
          {/* Your existing Seal form fields */}
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Existing Seal :-</div></div>

          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="series"
                value={formData?.pumpInquiryItem.series}
                label="Series"
                onChange={(e) => handleChange(e)}
              />
            </Grid>


            <Grid item xs={4}>
              <Autocomplete
                disabled
                id="disableItem"
                style={{ width: '100%' }}
                size="small"
                value={formData?.pumpInquiryItem.performance}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      performance: newValue
                    }
                  });
                }}
                onFocus={() => getColumnData('Performance', setptOption, setarOption, setsaOption, setstOption, setstgOption, setcstOption, setpfOption, setfnOption)}
                // inputValue={formData?.performance || ''}
                onInputChange={(event, newInputValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      performance: newInputValue
                    }
                  });
                }}
                options={['Satisfactory', 'Unsatisfactory']}
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
              <Autocomplete
                disabled
                id="disableItem"
                style={{ width: '100%' }}
                size="small"
                value={formData?.pumpInquiryItem.sealArrangement}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      sealArrangement: newValue
                    }
                  });
                }}
                onFocus={() => getColumnData('Seal Arrangement', setptOption, setarOption, setsaOption, setstOption, setstgOption, setcstOption, setpfOption, setfnOption)}
                // inputValue={formData?.sealArrangement || ''}
                onInputChange={(event, newInputValue) => {
                  setFormData({
                    ...formData,
                    pumpInquiryItem: {
                      ...formData.pumpInquiryItem,
                      sealArrangement: newInputValue
                    }
                  });
                }}

                options={['Single', 'Double']}
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
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="existingSealMake"
                value={formData?.pumpInquiryItem.existingSealMake}
                label="Make"
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="existingSealSize"
                value={formData?.pumpInquiryItem.existingSealSize}
                label="Size"
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="existingSealMOC"
                value={formData?.pumpInquiryItem.existingSealMOC}
                label="MOC"
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="existingSealApiPlan"
                value={formData?.pumpInquiryItem.existingSealApiPlan}
                label="API Plan"
                multiline
                onChange={(e) => handleChange(e)}
                fullWidth
              />
            </Grid>

          </Grid>
        </div>

        {/* Operating Parameters And Fluid Detail Section */}

        <div className='card'>
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Operating Parameters And Fluid Detail :-</div></div>
          <div className=''>
            <h3 style={{ paddingBottom: '10px' }}>Parameters:-</h3>
            <Grid container spacing={2}>

              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.pumpInquiryItem?.suctionPressure?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      pumpInquiryItem: {
                        ...prev.pumpInquiryItem,
                        suctionPressure: {
                          ...prev.pumpInquiryItem.suctionPressure,
                          value: newValue,
                        },
                      }
                    }));
                  }}
                  label="Suction Pressure"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small">
                          <Select

                            id="disableItem"
                            value={formData.pumpInquiryItem?.suctionPressure?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                pumpInquiryItem: {
                                  ...prev.pumpInquiryItem,
                                  suctionPressure: {
                                    ...prev.pumpInquiryItem.suctionPressure,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpInquiryItem?.suctionPressure?.value?.length} // Check if input has a value
                            disableUnderline
                            sx={{
                              height: "100%", // Matches TextField height
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
                              minWidth: 60, // Width of dropdown
                            }}
                          >

                            {!formData.pumpInquiryItem?.suctionPressure && <MenuItem>Unit</MenuItem>}

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
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.pumpInquiryItem?.dischargePressure?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      pumpInquiryItem: {
                        ...prev.pumpInquiryItem,
                        dischargePressure: {
                          ...prev.pumpInquiryItem.dischargePressure,
                          value: newValue,
                        },
                      }
                    }));
                  }}
                  label="Discharge Pressure"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small">
                          <Select

                            id="disableItem"
                            value={formData.pumpInquiryItem?.dischargePressure?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                pumpInquiryItem: {
                                  ...prev.pumpInquiryItem,
                                  dischargePressure: {
                                    ...prev.pumpInquiryItem.dischargePressure,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpInquiryItem?.dischargePressure?.value?.length} // Check if input has a value
                            disableUnderline
                            sx={{
                              height: "100%", // Matches TextField height
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
                              minWidth: 60, // Width of dropdown
                            }}
                          >

                            {!formData.pumpInquiryItem?.dischargePressure && <MenuItem>Unit</MenuItem>}

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
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="boxPressure"
                  value={formData.pumpInquiryItem?.boxPressure?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      pumpInquiryItem: {
                        ...prev.pumpInquiryItem,
                        boxPressure: {
                          ...prev.pumpInquiryItem.boxPressure,
                          value: newValue,
                        },
                      }
                    }));
                  }}
                  label="Box Pressure"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small">
                          <Select

                            id="disableItem"
                            value={formData.pumpInquiryItem?.boxPressure?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                pumpInquiryItem: {
                                  ...prev.pumpInquiryItem,
                                  boxPressure: {
                                    ...prev.pumpInquiryItem.boxPressure,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpInquiryItem?.boxPressure?.value?.length} // Check if input has a value
                            disableUnderline
                            sx={{
                              height: "100%", // Matches TextField height
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
                              minWidth: 60, // Width of dropdown
                            }}
                          >

                            {!formData.pumpInquiryItem?.boxPressure && <MenuItem>Unit</MenuItem>}

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
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="totalHead"
                  value={formData.pumpInquiryItem?.totalHead?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      pumpInquiryItem: {
                        ...prev.pumpInquiryItem,
                        totalHead: {
                          ...prev.pumpInquiryItem.totalHead,
                          value: newValue,
                        },
                      }
                    }));
                  }}
                  label="Total Head"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small">
                          <Select

                            id="disableItem"
                            value={formData.pumpInquiryItem?.totalHead?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                pumpInquiryItem: {
                                  ...prev.pumpInquiryItem,
                                  totalHead: {
                                    ...prev.pumpInquiryItem.totalHead,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpInquiryItem?.totalHead?.value?.length} // Check if input has a value
                            disableUnderline
                            sx={{
                              height: "100%", // Matches TextField height
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
                              minWidth: 60, // Width of dropdown
                            }}
                          >

                            {!formData.pumpInquiryItem?.totalHead && <MenuItem>Unit</MenuItem>}

                            <MenuItem value="MWC">MWC</MenuItem>
                            <MenuItem value="MLC">MLC</MenuItem>
                            <MenuItem value="kg/cm2 g">kg/cm² (g)</MenuItem>

                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>


              <Grid item xs={4}>
                <Autocomplete
                  disabled
                  id="disableItem"
                  size="small"
                  value={formData.pumpInquiryItem.directionOfRotation || ''}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      pumpInquiryItem: {
                        ...formData.pumpInquiryItem,
                        directionOfRotation: newValue || ''
                      }
                    });
                  }}

                  inputValue={formData.pumpInquiryItem.directionOfRotation || ''}
                  onInputChange={(event, newInputValue) => {
                    setFormData({
                      ...formData,
                      pumpInquiryItem: {
                        ...formData.pumpInquiryItem,
                        directionOfRotation: newInputValue || ''
                      }
                    });
                  }}

                  options={["CW", "CCW"].map((src) => src)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"

                      placeholder='select Direction of Rotation'
                      fullWidth
                      className='custom-text-field'
                      label="Direction of Rotation"
                    />
                  )}
                />
              </Grid>


              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="speed"
                  value={formData?.pumpInquiryItem.speed}
                  onChange={(e) => handleChange(e)}
                  label="Speed"
                />
              </Grid>

            </Grid>
          </div>

          <div >

            <h3 style={{ padding: '10px 0' }}>Fluids :-</h3>

            <Grid container spacing={2}>
              {/* Fluid */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="fluid"
                  value={formData?.pumpInquiryItem.fluid}
                  onChange={(e) => handleChange(e)}
                  label="Fluid"
                  fullWidth
                />
              </Grid>


              {/* Nature (Dropdown) */}
              <Grid item xs={4}>
                <Autocomplete
                  style={{ width: '100%' }}
                  size="small"
                  value={formData?.pumpInquiryItem.nature}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      pumpInquiryItem: {
                        ...formData.pumpInquiryItem,
                        nature: newValue
                      }
                    });
                  }}
                  // inputValue={formData?.nature || ''}
                  onInputChange={(event, newInputValue) => {
                    setFormData({
                      ...formData,
                      pumpInquiryItem: {
                        ...formData.pumpInquiryItem,
                        nature: newInputValue
                      }
                    });
                  }}
                  options={['Option1', 'Option2', 'Option3']} // Replace with actual options
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      {...params}
                      className="custom-text-field"
                      placeholder="Select Nature"
                      variant="outlined"
                      label="Nature"
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* Pumping Temperature */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="pumpingTemperature"
                  value={formData.pumpInquiryItem?.pumpingTemperature?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      pumpInquiryItem: {
                        ...prev.pumpInquiryItem,
                        pumpingTemperature: {
                          ...prev.pumpInquiryItem.pumpingTemperature,
                          value: newValue,
                        },
                      }
                    }));
                  }}
                  label="Pumping Temprature"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small">
                          <Select

                            id="disableItem"
                            value={formData.pumpInquiryItem?.pumpingTemperature?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                pumpInquiryItem: {
                                  ...prev.pumpInquiryItem,
                                  pumpingTemperature: {
                                    ...prev.pumpInquiryItem.pumpingTemperature,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpInquiryItem?.pumpingTemperature?.value?.length} // Check if input has a value
                            disableUnderline
                            sx={{
                              height: "100%", // Matches TextField height
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
                              minWidth: 60, // Width of dropdown
                            }}
                          >

                            {!formData.pumpInquiryItem?.pumpingTemperature && <MenuItem>Unit</MenuItem>}

                            <MenuItem value="C">℃ </MenuItem>
                            <MenuItem value="F">℉</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* Maximum Temperature */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="maximumTemperature"
                  value={formData.pumpInquiryItem?.maximumTemperature?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      pumpInquiryItem: {
                        ...prev.pumpInquiryItem,
                        maximumTemperature: {
                          ...prev.pumpInquiryItem.maximumTemperature,
                          value: newValue,
                        },
                      }
                    }));
                  }}
                  label="Maximum Temprature"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <FormControl size="small">
                          <Select

                            id="disableItem"
                            value={formData.pumpInquiryItem?.maximumTemperature?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                pumpInquiryItem: {
                                  ...prev.pumpInquiryItem,
                                  maximumTemperature: {
                                    ...prev.pumpInquiryItem.maximumTemperature,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.pumpInquiryItem?.maximumTemperature?.value?.length} // Check if input has a value
                            disableUnderline
                            sx={{
                              height: "100%", // Matches TextField height
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
                              minWidth: 60, // Width of dropdown
                            }}
                          >

                            {!formData.pumpInquiryItem?.pumpingTemperature && <MenuItem>Unit</MenuItem>}

                            <MenuItem value="C">℃ </MenuItem>
                            <MenuItem value="F">℉</MenuItem>
                          </Select>
                        </FormControl>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              {/* SP Gravity */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="spGravity"
                  value={formData?.pumpInquiryItem.spGravity}
                  onChange={(e) => handleChange(e)}
                  label="SP Gravity"
                  fullWidth
                />
              </Grid>

              {/* Freezing Point */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="freezingPoint"
                  value={formData?.pumpInquiryItem.freezingPoint}
                  onChange={(e) => handleChange(e)}
                  label="Freezing Point"
                  fullWidth
                />
              </Grid>

              {/* Boiling Point */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="boilingPoint"
                  value={formData?.pumpInquiryItem.boilingPoint}
                  onChange={(e) => handleChange(e)}
                  label="Boiling Point"
                  fullWidth
                />
              </Grid>

              {/* Viscosity */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="viscosity"
                  value={formData?.pumpInquiryItem.viscosity}
                  onChange={(e) => handleChange(e)}
                  label="Viscosity"
                  fullWidth
                />
              </Grid>

              {/* Percentage Of Solid */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="percentageOfSolid"
                  value={formData?.pumpInquiryItem.percentageOfSolid}
                  onChange={(e) => handleChange(e)}
                  label="Percentage Of Solid"
                  fullWidth
                />
              </Grid>

              {/* Solid Size */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="solidSize"
                  value={formData?.pumpInquiryItem.solidSize}
                  onChange={(e) => handleChange(e)}
                  label="Solid Size"
                  fullWidth
                />
              </Grid>

              {/* Special Note */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="specialNote"
                  value={formData?.pumpInquiryItem.specialNote}
                  onChange={(e) => handleChange(e)}
                  label="Special Note"
                  inputProps={{ maxLength: 150 }}
                  fullWidth
                />
              </Grid>
            </Grid>

          </div>
          {/* Your existing Operating Parameters and Fluid Detail fields */}
        </div>

        {/* New Mechanical Seal Section */}

        <div className='card'>
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Proposed Mechanical Seal :-</div></div>

          <FormControl component="fieldset">
            <h3 style={{ padding: '10px 0' }}>Select Seal Type</h3>
            <RadioGroup row value={sealType} onChange={handleSealTypeChange}>
              <FormControlLabel value="existing" control={<Radio />} label="Existing Seal" />
              <FormControlLabel value="new" control={<Radio />} label="New Seal" />
            </RadioGroup>
          </FormControl>

          {sealType === 'existing' && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="G.A Number"
                    name="existingSealGA"
                    value={formData?.existingSealGA}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSealGA: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Seal Series"
                    value={formData?.existingSealSeries}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSealSeries: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Shaft Dia"
                    value={formData?.existingSealShaftDia}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSealShaftDia: e.target.value
                    }))}
                    fullWidth />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Seal Size"
                    value={formData?.existingSealSize}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      existingSealSize: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>

                {/* Option selector */}

                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="seal-type-label">Seal Type</InputLabel>
                    <Select
                      labelId="seal-type-label"
                      id="seal-type"
                      value={formData?.existingSealType}
                      onChange={(e) => handleSealConfigChange(e)}
                      label="Seal Type"
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="double">Double</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>


              </Grid>

              {renderMocFields('existingSeal', 'IB')}
              {formData?.existingSealType === 'double' && renderMocFields('existingSeal', 'OB')}
            </div>
          )}


          {sealType === 'new' && (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Shaft Dia"
                    value={formData?.newSealShaftDia}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSealShaftDia: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Bore Dia"
                    value={formData?.newSealBoreDia}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSealBoreDia: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Bore Depth"
                    value={formData?.newSealBoreDepth}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSealBoreDepth: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>


                <Grid item xs={4}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Nearest Obstruction"
                    value={formData?.newSealNearestObstruction}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      newSealNearestObstruction: e.target.value
                    }))}
                    fullWidth
                  />
                </Grid>


                <Grid item xs={4}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="seal-type-label">Seal Type</InputLabel>
                    <Select
                      labelId="seal-type-label"
                      id="seal-type"
                      value={formData?.newSealType}
                      onChange={(e) => handleSealConfigChange(e)}
                      label="Seal Type"
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="double">Double</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>


              </Grid>

              {renderMocFields('newSeal', 'IB')}
              {formData?.newSealType === 'double' && renderMocFields('newSeal', 'OB')}
            </div>
          )}


        </div>

        {/* Api Plane */}
        <div className='card'>
          <Grid container spacing={2}>
            {/* API Plan Section */}
            <Grid item xs={12}>
              <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb"> API Plan :-</div></div>
            </Grid>

            {/* Flushing Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="apiFlushingPlans"
                value={formData?.apiFlushingPlans || ''}
                onChange={(e) => handleChange(e)}
                label="Flushing Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Barrier/Buffer Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="apiBarrierBufferPlans"
                value={formData?.apiBarrierBufferPlans || ''}
                onChange={(e) => handleChange(e)}
                label="Barrier/Buffer Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Atmospheric Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="apiAtmosphericPlans"
                value={formData?.apiAtmosphericPlans || ''}
                onChange={(e) => handleChange(e)}
                label="Atmospheric Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Collection Plans */}
            <Grid item xs={4}>
              <TextField
                size="small"
                className="custom-text-field"
                name="apiCollectionPlans"
                value={formData?.apiCollectionPlans || ''}
                onChange={(e) => handleChange(e)}
                label="Collection Plan"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Your existing Section 5&6 fields */}
        </div>

        {/* Measurement Section */}

        <div className='card'>
          <Grid container spacing={2}>
            {/* Type of Stuffing Box */}
            <Grid item xs={12}>
              <div className="MuiBox-root css-2e6lci">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle">
                  <g>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </g>
                </svg>
                <div className="MuiBox-root css-1isemmb">Measurement :-</div>
              </div>
              <FormControl component="fieldset">
                <h3 style={{ padding: '1px 0' }}>Type of Stuffing Box:-</h3>
                <RadioGroup
                  row
                  aria-label="typeOfStuffingBox"
                  name="measurementTypeOfStuffingBox"
                  value={formData?.measurementTypeOfStuffingBox}
                  onChange={(e) => {
                    handleChange(e);
                    // Logic for displaying different images based on selection
                  }}
                >
                  <FormControlLabel value="Type I" control={<Radio />} label="Type I" />
                  <FormControlLabel value="Type II" control={<Radio />} label="Type II" />
                  <FormControlLabel value="Type III" control={<Radio />} label="Type III" />
                </RadioGroup>
                {/* {formData?.typeOfStuffingBox && (
                  <div>
                    <img src={`/path/to/${formData?.typeOfStuffingBox}-image.jpg`} alt={formData?.typeOfStuffingBox} />
                  </div>
                )} */}
              </FormControl>
            </Grid>

            {/* Mandatory Inputs */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementShaftOd"
                label="Shaft OD"
                value={formData?.measurementShaftOd || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementStuffingBoxId"
                label="Stuffing Box ID"
                value={formData?.measurementStuffingBoxId || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementStuffingBoxDepth"
                label="Stuffing Box Depth"
                value={formData?.measurementStuffingBoxDepth || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementNearestObstruction"
                label="Nearest Obstruction"
                value={formData?.measurementNearestObstruction || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>

            {/* Spigot Details */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementSpigotDia"
                label="Spigot Dia"
                value={formData?.measurementSpigotDia || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementSocketDepth"
                label="Socket Depth"
                value={formData?.measurementSocketDepth || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Shaft Sleeve Availability */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h3 style={{ padding: '1px 0' }}>Shaft Sleeve Available?</h3>
                <RadioGroup
                  row
                  name="measurementShaftSleeveAvailable"
                  value={formData?.measurementShaftSleeveAvailable}
                  onChange={(e) => handleChange(e)}
                >
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            {formData?.measurementShaftSleeveAvailable === 'Yes' && (
              <>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementSleeveOd"
                    label="Sleeve OD"
                    value={formData?.measurementSleeveOd || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementStuffingBoxThroatDia"
                    label="Stuffing Box Throat Dia"
                    value={formData?.measurementStuffingBoxThroatDia || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementSleeveShoulderLength"
                    label="Sleeve Shoulder Length"
                    value={formData?.measurementSleeveShoulderLength || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementSleeveExtensionLength"
                    label="Sleeve Extension Length"
                    value={formData?.measurementSleeveExtensionLength || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementShaftHubDistance"
                    label="Shaft Hub Distance"
                    value={formData?.measurementShaftHubDistance || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </>
            )}
            </Grid>

<div className="MuiBox-root css-2e6lci">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle">
                  <g>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </g>
                </svg>
                <div className="MuiBox-root css-1isemmb">Gland Bolting
                </div>
                </div>

              <Grid container spacing={2}>
            {/* Gland Bolting */}

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementNumberOfStuds"
                label="No. of Studs"
                value={formData?.measurementNumberOfStuds || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementStudSize"
                label="Stud Size"
                value={formData?.measurementStudSize || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementBoltCircleDiameter"
                label="Bolt Circle Diameter"
                value={formData?.measurementBoltCircleDiameter || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                size="small"
                name="measurementStartAngle"
                label="Start Angle"
                value={formData?.measurementStartAngle || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* Connections */}
            <Grid item xs={12}>
              <div className="MuiBox-root css-2e6lci">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
                  <g>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </g>
                </svg>
                <div className="MuiBox-root css-1isemmb"> Connections</div>
              </div>
              <h3 style={{ paddingBottom: '10px', marginLeft: "3px" }}>Flush </h3>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    select
                    size="small"
                    name="measurementFlushSize"
                    label="Size"
                    value={formData?.measurementFlushSize || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options as needed */}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementFlushAngle"
                    label="Angle"
                    value={formData?.measurementFlushAngle || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>


              <h3 style={{ paddingBottom: '10px', marginLeft: "3px" }}>Quench </h3>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    select
                    size="small"
                    name="measurementQuenchSize"
                    label="Size"
                    value={formData?.measurementQuenchSize || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options as needed */}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementQuenchAngle"
                    label="Angle"
                    value={formData?.measurementQuenchAngle || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <h3 style={{ paddingBottom: '10px', marginLeft: "3px" }}>Drain </h3>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    select
                    size="small"
                    name="measurementDrainSize"
                    label="Size"
                    value={formData?.measurementDrainSize || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    <option value="1">1</option>
                    <option value="2">2</option>
                    {/* Add more options as needed */}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    className="custom-text-field"
                    size="small"
                    name="measurementDrainAngle"
                    label="Angle"
                    value={formData?.measurementDrainAngle || ''}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>

            </Grid>

            {/* Repeat the same structure for Quench and Drain connections */}

            {/* Stuffing Box Type */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <h3 style={{ padding: '1px 0' }}>Stuffing Box Type:-</h3>
                <RadioGroup
                  row
                  name="measurementStuffingBox"
                  value={formData?.measurementStuffingBox}
                  onChange={(e) => handleChange(e)}
                >
                  <FormControlLabel value="Jacketed" control={<Radio />} label="Jacketed" />
                  <FormControlLabel value="Non-Jacketed" control={<Radio />} label="Non-Jacketed" />
                </RadioGroup>
              </FormControl>
            </Grid>

          </Grid>
        </div>

        {/* Mesurment section end */}

        <div className='card'>
          <Grid container spacing={2}>
            {/* Type of Stuffing Box */}
            <Grid item xs={12}>
              <div className="MuiBox-root css-2e6lci">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle">
                  <g>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </g>
                </svg>
                <div className="MuiBox-root css-1isemmb">Other Details</div>
              </div>

              <Grid container spacing={2}>
                  {/* otherDetailsRemarks */}
                  <Grid item xs={8}>
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Other Details Remarks"
                    multiline
                    rows={3}
                    name="otherDetailsRemarks"
                    value={formData.otherDetailsRemarks || ''}
                    onChange={(e) => handleChange(e)}
                    // disabled
                    // id="disableItem"

                    fullWidth
                  />
                </Grid>

                <Grid item xs={4}>
                  <Autocomplete
                    size="small"
                    value={formData.otherDetailsAccessories || ""}
                    onChange={(event, newValue) => {
                      setFormData({
                        ...formData,
                        otherDetailsAccessories: newValue || "",
                      });
                    }}
                    inputValue={formData.otherDetailsAccessories || ""}
                    onInputChange={(event, newInputValue) => {
                      setFormData({
                        ...formData,
                        otherDetailsAccessories: newInputValue || "",
                      });
                    }}
                    options={[
                      "With gland and sleeve",
                      "Without gland and sleeve",
                      "With gland without sleeve",
                      "With sleeve without gland",
                    ]}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder="Select Accessories"
                        fullWidth
                        className="custom-text-field"
                        label="Accessories"
                      />
                    )}
                  />
                </Grid>

              
              </Grid>



              {/* attachmentReferenceMechanicalSealDrawing */}
              <div className="MuiBox-root css-2e6lci">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle">
                  <g>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </g>
                </svg>
                <div className="MuiBox-root css-1isemmb">Attachments</div>
              </div>

              <Grid item xs={8}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop:"1rem" }}>

              {/* Hidden File Input */}
              <input
        type="file"
        ref={atRefmSeal}
        accept="*"
        style={{ display: "none" }}
        onChange={async (event) => {
          const file = event.target.files[0];
          if (!file) return;
        
          console.log("Selected File:", file.name);
        
          // Generate a temporary file URL (for frontend preview)
          const tempFileURL = URL.createObjectURL(file);
          console.log("Temporary File URL:", tempFileURL);
        
          // Prepare FormData
          const formData = new FormData();
          formData.append("file", file);
        
          try {
            const { data } = await axiosInstance.post(
              `http://localhost:8080/lens/fileUpload/file?filelocation=${encodeURIComponent(file.name)}`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
        
            console.log("File Upload Response:", data);
        
            // ✅ Update `uploadedFileNames` at the correct index
            setAtmSeal(data);
        
            //  Update `rotaryJointInquiries[index]` with the new filename
            setFormData((prev) => ({
              ...prev,
            attachmentReferenceMechanicalSealDrawing:data              
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
        onClick={() => atRefmSeal.current.click()} // Trigger file input
      >
        <AttachFileIcon style={{ fontSize: "16px" }} />
        Attachment Reference Mechanical Seal Drawing
      </button>
      {(formData.attachmentReferenceMechanicalSealDrawing &&atmSeal) || (formData.attachmentReferenceMechanicalSealDrawing && pId)  ? (
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
        onClick={async() => {
          try {
            let fileName = formData.attachmentReferenceMechanicalSealDrawing; // Extract filename
            console.log("Original FileName:", fileName);

            // Send API request with the original filename
            const res = await axiosInstance.get(`lens/file/download/?fileName=${encodeURIComponent(fileName)}`, {
                responseType: 'blob' // Handle binary data
            });

              console.log("Response received:", res);
        
            // Extract content type from response headers
            const contentType = res.headers['content-type'];
        
            // Create a downloadable URL
            const url = window.URL.createObjectURL(new Blob([res.data], { type: contentType }));
        

            // **Modify filename only for saving** (Ensure extension is at the end)
            const parts = fileName.split(".");
            const second = parts[1].split("-");
            const extension = second.shift(); // Extract extension
            second.push(`.${extension}`); // Append extension at the end
            const formattedFileName = parts[0] + "-" + second.join("-");
        
            console.log("Formatted FileName for download:", formattedFileName);
        
            // Create a link element
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", formattedFileName); // Use formatted name for download
        
            // Append to DOM & trigger download
            document.body.appendChild(link);
            link.click();
        
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Free memory
          } catch (error) {
            console.error("File download failed:", error);
          }
          
        }}
      >
        <DownloadIcon style={{ fontSize: "16px" }} /> Download 
      </button>
    ): null}
  </div>

  {atmSeal || (pId&&formData.attachmentReferenceMechanicalSealDrawing) ? (
            <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {atmSeal?atmSeal : formData.attachmentReferenceMechanicalSealDrawing}
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
                  onClick={() => handleFileDelete("attachmentReferenceMechanicalSealDrawing")}
                >
                    X
                </button>
            </p>
      ):null}

</Grid> 

              <Grid item xs={6}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop:"1rem" }}>

              {/* Hidden File Input */}
              <input
        type="file"
        ref={atStuffBoxRef}
        accept="*"
        style={{ display: "none" }}
        onChange={async (event) => {
          const file = event.target.files[0];
          if (!file) return;
        
          console.log("Selected File:", file.name);
        
          // Generate a temporary file URL (for frontend preview)
          const tempFileURL = URL.createObjectURL(file);
          console.log("Temporary File URL:", tempFileURL);
        
          // Prepare FormData
          const formData = new FormData();
          formData.append("file", file);
        
          try {
            const { data } = await axiosInstance.post(
              `http://localhost:8080/lens/fileUpload/file?filelocation=${encodeURIComponent(file.name)}`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            );
        
            console.log("File Upload Response:", data);
        
            // ✅ Update `uploadedFileNames` at the correct index
            setAtStuff(data);
        
            //  Update `rotaryJointInquiries[index]` with the new filename
            setFormData((prev) => ({
              ...prev,
              attachmentStuffingBoxDetails:data              
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
        onClick={() => atStuffBoxRef.current.click()} // Trigger file input
      >
        <AttachFileIcon style={{ fontSize: "16px" }} />
        Attachment Stuffing Box Details
      </button>
      {(formData.attachmentStuffingBoxDetails &&atStuff) ||(formData.attachmentStuffingBoxDetails &&pId) ? (
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
        onClick={async() => {
          try {
            let fileName = formData.attachmentStuffingBoxDetails; // Extract filename
            console.log("Original FileName:", fileName);

            // Send API request with the original filename
            const res = await axiosInstance.get(`lens/file/download/?fileName=${encodeURIComponent(fileName)}`, {
                responseType: 'blob' // Handle binary data
            });

              console.log("Response received:", res);
        
            // Extract content type from response headers
            const contentType = res.headers['content-type'];
        
            // Create a downloadable URL
            const url = window.URL.createObjectURL(new Blob([res.data], { type: contentType }));
        

            // **Modify filename only for saving** (Ensure extension is at the end)
            const parts = fileName.split(".");
            const second = parts[1].split("-");
            const extension = second.shift(); // Extract extension
            second.push(`.${extension}`); // Append extension at the end
            const formattedFileName = parts[0] + "-" + second.join("-");
        
            console.log("Formatted FileName for download:", formattedFileName);
        
            // Create a link element
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", formattedFileName); // Use formatted name for download
        
            // Append to DOM & trigger download
            document.body.appendChild(link);
            link.click();
        
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url); // Free memory
          } catch (error) {
            console.error("File download failed:", error);
          }
          
        }}
      >
        <DownloadIcon style={{ fontSize: "16px" }} /> Download 
      </button>
    ): null}
  </div>

  {atStuff || (formData.attachmentStuffingBoxDetails) ? (
            <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {atStuff?atStuff:formData.attachmentStuffingBoxDetails}
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
                  onClick={() => handleFileDelete("attachmentStuffingBoxDetails")}
                >
                    X
                </button>
            </p>
      ):null}

</Grid> 


            </Grid>
          </Grid>
        </div>

        {/* Submit/Update Buttons */}
        <Grid item xs={4} style={{display:"flex"}}>
          <Grid item xs={4}>
            {!pId ? (
              <Button
                className="submit-btn"
                style={{ margin: "2rem 1rem" }}
                onClick={(e) => handleSubmit(e, formData, navigate)}
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            ) : (
              <>
                <Button
                  className="update-btn"
                  variant="contained"
                  disabled={(authState?.sub)!==formData.createdByUser}
                  type="submit"
                  onClick={(e) => handleUpdatePumpSeal(e, formData, pId, navigate)}
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
          <Grid item xs={4} style={{margin:'12px 0px 0px 12px'}}>
  <PDFDownloadLink document={<PDFFile formData={formData} />} fileName="PumpSeal.pdf">
    {({ loading }) => (
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        style={{
          backgroundColor: '#ff6d6d',
          color: 'white',
          textDecoration: 'none',
          cursor: 'pointer',
        }}>
        {loading ? 'Loading document...' : 'Download PDF'}
      </Button>
    )}
  </PDFDownloadLink>
</Grid>
        </Grid>
      </form>
    </Container>
  );
            }
