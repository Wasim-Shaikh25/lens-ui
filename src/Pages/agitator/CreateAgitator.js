import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, InputLabel, IconButton, Autocomplete, InputAdornment, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import '../../App.css'
import { MenuItem, Select, FormControl } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getApi, handleSubmit, handleUpdate } from '../../apis/AgitatorApi';
import { PDFDownloadLink, Image, Document, Page, Text, View, StyleSheet, Svg, Path, Font } from '@react-pdf/renderer';
import Logo from '../../assets/Picture1.png'
import moment from 'moment';
import { useAuth } from '../../contextApi/AuthContext';
import axiosInstance from '../../axios/axiosInstance';
import { useRef } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';



export default function AgitatorSeal() {


  const navigate = useNavigate();
  let { aId } = useParams();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const { authState } = useAuth();


  const [formData, setFormData] = useState({
    agitatorSealId: "",
    drfNumber: "",
    branch: "",
    salesInquiryItemReferenceNo: "",
    createdOn: dateTime,
    updatedOn: dateTime,
    createdByUser: authState?.sub,
    updatedByUser: authState?.sub,
    customerName: "",
    endUser: "",
    costingRequirement: false,
    agitatorMake: "",
    agitatorModel: "",
    agitatorEntry: "",
    agitatorTagNumber: "",
    agitatorVesselMoc: "",
    proposedMechanicalSeal: "",
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
    measurementTypeOfPadPlate: "",
    measurementShaftOd: "",
    measurementPadPlateId: "",
    measurementNearestObstruction: "",
    measurementSpigotDia: "",
    measurementSocketDepth: "",
    measurementShaftDiaD1: "",
    measurementShaftDiaD2: "",
    measurementShaftStepDistanceL1: "",
    measurementDistanceBetweenStepsL2: "",
    measurementPadPlateThicknessT: "",
    measurementRadiusR: "",
    glandBoltingNumberOfStuds: "",
    glandBoltingStudSize: "",
    glandBoltingBoltCircleDiameter: "",
    glandBoltingStartAngle: "",
    connectionFlushSize: "",
    connectionFlushAngle: "",
    connectionQuenchSize: "",
    connectionQuenchAngle: "",
    connectionDrainSize: "",
    connectionDrainAngle: "",
    otherDetailsAccessories: "",
    otherDetailsRemarks: "",
    attachmentReferenceMechanicalSealDrawing: "",
    attachmentPadPlateDetails: "",
    agitatorInquiryItem: {
      agitatorInquiryId: "",
      agitatorInquiryReferenceNo: "",
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
        id: "",
        value: "",
        unit: ""
      },
      maximumTemperature: {
        id: "",
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
      createdByUser: authState?.sub,
      createdOn: dateTime,
      updatedByUser: "",
      updatedOn: dateTime,
      salesInquiryId: ""
    }
  });


  const drRef = useRef()
  const ppRef = useRef()


  const [drInput, setDrInput] = useState("")
  const [ppInput, setPPInput] = useState("")

  const handleFileDelete = (fieldName) => {

    setFormData((prev) => ({
      ...prev,
      [fieldName]: ""
    }))

    switch (fieldName) {

      case "attachmentReferenceMechanicalSealDrawing":
        setDrInput("");
        break;

      case "attachmentPadPlateDetails":
        setPPInput("");
        break;

      default:
        break;

    }

  }



  useEffect(() => {
    if (aId !== undefined) {
      getApi(aId, setFormData)

    } else {
      setFormData(
        {
          agitatorSealId: "",
          drfNumber: "",
          branch: "",
          salesInquiryItemReferenceNo: "",
          createdOn: dateTime,
          updatedOn: dateTime,
          createdByUser: authState?.sub,
          updatedByUser: authState?.sub,
          customerName: "",
          endUser: "",
          costingRequirement: false,
          agitatorMake: "",
          agitatorModel: "",
          agitatorEntry: "",
          agitatorTagNumber: "",
          agitatorVesselMoc: "",
          proposedMechanicalSeal: "",
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
          measurementTypeOfPadPlate: "",
          measurementShaftOd: "",
          measurementPadPlateId: "",
          measurementNearestObstruction: "",
          measurementSpigotDia: "",
          measurementSocketDepth: "",
          measurementShaftDiaD1: "",
          measurementShaftDiaD2: "",
          measurementShaftStepDistanceL1: "",
          measurementDistanceBetweenStepsL2: "",
          measurementPadPlateThicknessT: "",
          measurementRadiusR: "",
          glandBoltingNumberOfStuds: "",
          glandBoltingStudSize: "",
          glandBoltingBoltCircleDiameter: "",
          glandBoltingStartAngle: "",
          connectionFlushSize: "",
          connectionFlushAngle: "",
          connectionQuenchSize: "",
          connectionQuenchAngle: "",
          connectionDrainSize: "",
          connectionDrainAngle: "",
          otherDetailsAccessories: "",
          otherDetailsRemarks: "",
          attachmentReferenceMechanicalSealDrawing: "",
          attachmentPadPlateDetails: "",
          agitatorInquiryItem: {
            agitatorInquiryId: "",
            agitatorInquiryReferenceNo: "",
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
              id: "",
              value: "",
              unit: ""
            },
            maximumTemperature: {
              id: "",
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
            createdByUser: authState?.sub,
            createdOn: dateTime,
            updatedByUser: authState?.sub,
            updatedOn: dateTime,
            salesInquiryId: ""
          }
        })
    }
  }, [aId])

  const handleFetch = async (apiItem) => {

    try {
      const { data } = await axiosInstance(`lens/salesInquiry/get?itemReferenceNo=${apiItem}`)

      console.log("response is ", data)
      setFormData({
        ...formData,
        agitatorInquiryItem: { ...data?.agitatorInquiry }
      })

    } catch (err) {
      console.log(err)
    }

  }

  console.log("Form Data is ", formData)

  const [selectSeal, setSelectSeal] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [sealType, setSealType] = useState('existing');
  const [selectedSealType, setSelectedSealType] = useState('single');


  const handleSealConfigChange = (event) => {
    const newValue = event.target.value;
    setSelectedSealType(newValue);

    if (sealType === 'existing') {
      setFormData(prev => ({
        ...prev,
        existingSealType: newValue,
        sealType: "existing"

      }));
    } else {
      setFormData(prev => ({
        ...prev,
        newSealType: newValue,
        sealType: "new"
      }));
    }
  };

  



  const renderMocFields = (section, type) => (
    <Grid container spacing={2} style={{ marginLeft: "0.3rem" }}>
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



  const cancelUpdate = () => {

    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    // If user confirms, navigate to the home page and reload the window
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  }




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
      marginBottom: 2
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



  const PDFFile = ({ formData }) => (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header Section */}
        <View style={styles.compDetails} wrap={false}>
          <Image style={styles.logoImg} src={Logo} />
          <View style={styles.compSec}>        
                <Text style={styles.title}>DRAWING REQUISITION FORM</Text>      
                <Text style={styles.rightTopHeading}>Agitator Seal DataSheet</Text>
            <Text style={styles.compDesc}>Leak-Proof® Engineering Pvt. Ltd.</Text>
              </View>
        </View>

        



        {/* General Information */}
        <View style={styles.section}>
          <View style={styles.table}>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>DRF Number :</Text>
              <Text style={styles.tableCell}>{formData.drfNumber}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Branch :</Text>
              <Text style={styles.tableCell}>{formData.branch}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Sales Inquiry Ref No:</Text>
              <Text style={styles.tableCell}>{formData.salesInquiryItemReferenceNo}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Customer Name:</Text>
              <Text style={styles.tableCell}>{formData.customerName}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Costing Requirement:</Text>
              <Text style={styles.tableCell}>{formData.costingRequirement ? "Yes" : "No"}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>End User:</Text>
              <Text style={styles.tableCell}>{formData.endUser}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Created By:</Text>
              <Text style={styles.tableCell}>{formData.createdByUser}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Created On:</Text>
              <Text style={styles.tableCell}>{formData.createdOn}</Text>
            </View>
          </View>
        </View>

{/* correct section */}
        <View style={styles.sharedSplitBoxContainer}>

          {/* Agitator Data */}
          <View style={styles.leftSplitBox}>
            <View style={styles.header}> <Text style={{ marginLeft: 3 }}>Agitator Data</Text></View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Make:</Text>
              <Text style={styles.tableCell}>{formData.agitatorMake}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Model:</Text>
              <Text style={styles.tableCell}>{formData.agitatorModel}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Entry:</Text>
              <Text style={styles.tableCell}>{formData.agitatorEntry}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Tag Number:</Text>
              <Text style={styles.tableCell}>{formData.agitatorTagNumber}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Vessel MOC:</Text>
              <Text style={styles.tableCell}>{formData.agitatorVesselMoc}</Text>
            </View>
          </View>

          {/* Existing Seal */}
          <View style={styles.rightSplitBox}>
            <View style={styles.header}> <Text style={{ marginLeft: 3 }}>Existing Seal</Text></View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Series:</Text>
              <Text style={styles.tableCell}>{formData.existingSealSeries}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Performance:</Text>
              <Text style={styles.tableCell}>{formData.agitatorInquiryItem.performance}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Seal Arrangement:</Text>
              <Text style={styles.tableCell}>{formData.agitatorInquiryItem.sealArrangement}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Make:</Text>
              <Text style={styles.tableCell}>{formData.agitatorInquiryItem.existingSealMake}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Size:</Text>
              <Text style={styles.tableCell}>{formData.existingSealSize}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>MOC:</Text>
              <Text style={styles.tableCell}>{formData.agitatorInquiryItem.existingSealMOC}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>API Plan:</Text>
              <Text style={styles.tableCell}>{formData.agitatorInquiryItem.existingSealApiPlan}</Text>
            </View>
          </View>

        </View>


      {/* remaining section  */}

        <View style={styles.sharedSplitBoxContainer}>
        <View style={styles.leftSplitBox}>

  
              <View style={styles.header}> <Text style={{ marginLeft: 3 }}>Operating Parameters</Text> </View>

              {/* Parameters */}
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Vessel Pressure (Operating) </Text>
              <Text style={styles.tableCell}>{formData.agitatorInquiryItem.vesselPressureOperating} {formData.agitatorInquiryItem.vesselPressureOperatingUnit}</Text></View>


              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Vessel Pressure (Design)</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.vesselPressureDesign} {formData.agitatorInquiryItem.vesselPressureDesignUnit}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCell}></Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Direction of Rotation</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.directionOfRotation}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Speed</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.speed}</Text></View>

              {/* Fluid */}
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Fluid</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.fluid}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Nature</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.nature}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Pumping Temperature</Text><Text style={styles.tableCell}>{`${formData.agitatorInquiryItem.pumpingTemperature?.value || ''} ${formData.agitatorInquiryItem.pumpingTemperature?.unit || ''}`}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Maximum Temperature</Text><Text style={styles.tableCell}>{`${formData.agitatorInquiryItem.maximumTemperature?.value || ''} ${formData.agitatorInquiryItem.maximumTemperature?.unit || ''}`}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>SP Gravity</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.spGravity}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Freezing Point</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.freezingPoint}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Boiling Point</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.boilingPoint}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Viscosity</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.viscosity}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Percentage Of Solid</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.percentageOfSolid}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Solid Size</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.solidSize}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Special Note</Text><Text style={styles.tableCell}>{formData.agitatorInquiryItem.specialNote}</Text></View>
        
          </View>


          <View style={styles.rightSplitBox}>

              <View style={styles.header}> <Text style={{ marginLeft: 3 }}>Proposed Mechanical Seal</Text> </View>

              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Shaft Dia</Text><Text style={styles.tableCell}>{formData.newSealShaftDia}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Bore Dia</Text><Text style={styles.tableCell}>{formData.newSealBoreDia}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Bore Depth</Text><Text style={styles.tableCell}>{formData.newSealBoreDepth}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Nearest Obstruction</Text><Text style={styles.tableCell}>{formData.newSealNearestObstruction}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Seal Type</Text><Text style={styles.tableCell}>{formData.newSealType}</Text></View>

              {/* IB Components */}
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>IB - Face</Text><Text style={styles.tableCell}>{formData.newSealIBFace}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>IB - Elastomer</Text><Text style={styles.tableCell}>{formData.newSealIBElastomer}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>IB - Spring Element</Text><Text style={styles.tableCell}>{formData.newSealIBSpringElement}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>IB - Contact Hardware</Text><Text style={styles.tableCell}>{formData.newSealIBContactHardware}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>IB - Non-Contact Hardware</Text><Text style={styles.tableCell}>{formData.newSealIBNonContactHardware}</Text></View>

              {/* OB Components */}
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>OB - Face</Text><Text style={styles.tableCell}>{formData.newSealOBFace}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>OB - Elastomer</Text><Text style={styles.tableCell}>{formData.newSealOBElastomer}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>OB - Spring Element</Text><Text style={styles.tableCell}>{formData.newSealOBSpringElement}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>OB - Contact Hardware</Text><Text style={styles.tableCell}>{formData.newSealOBContactHardware}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>OB - Non-Contact Hardware</Text><Text style={styles.tableCell}>{formData.newSealOBNonContactHardware}</Text></View>
            </View>

          </View>



          <View style={styles.section}>
            <View style={styles.table}>
              <View style={styles.header}> <Text style={{ marginLeft: 3 }}>API Plan</Text></View>

              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Flushing Plans</Text><Text style={styles.tableCell}>{formData.apiFlushingPlans}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Barrier/Buffer Plans</Text><Text style={styles.tableCell}>{formData.apiBarrierBufferPlans}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Atmospheric Plans</Text><Text style={styles.tableCell}>{formData.apiAtmosphericPlans}</Text></View>
              <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Collection Plans</Text><Text style={styles.tableCell}>{formData.apiCollectionPlans}</Text></View>
          </View>
          </View>





      {/* Fix From Here */}

       {/* Fix From Here */}
<View style={styles.sharedSplitBoxContainer}>
  {/* Left column - Measurement */}
  <View style={styles.leftSplitBox}>
    <View style={styles.header}><Text style={{ marginLeft: 3 }}>Measurement</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Type</Text><Text style={styles.tableCell}>{formData.measurementTypeOfPadPlate}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Shaft OD</Text><Text style={styles.tableCell}>{formData.measurementShaftOd}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Pad Plate ID</Text><Text style={styles.tableCell}>{formData.measurementPadPlateId}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Nearest Obstruction</Text><Text style={styles.tableCell}>{formData.measurementNearestObstruction}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Spigot Dia</Text><Text style={styles.tableCell}>{formData.measurementSpigotDia}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Socket Depth</Text><Text style={styles.tableCell}>{formData.measurementSocketDepth}</Text></View>

    <Text style={styles.subHeading}>Other Dimensions</Text>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Shaft Dia D1</Text><Text style={styles.tableCell}>{formData.measurementShaftDiaD1}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Shaft Dia D2</Text><Text style={styles.tableCell}>{formData.measurementShaftDiaD2}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Shaft Step Distance L1</Text><Text style={styles.tableCell}>{formData.measurementShaftStepDistanceL1}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Distance Between Steps L2</Text><Text style={styles.tableCell}>{formData.measurementDistanceBetweenStepsL2}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Pad Plate Thickness T</Text><Text style={styles.tableCell}>{formData.measurementPadPlateThicknessT}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Radius R</Text><Text style={styles.tableCell}>{formData.measurementRadiusR}</Text></View>
  </View>

  {/* Right column - Gland Bolting */}
  <View style={styles.rightSplitBox}>
    <View style={styles.header}><Text style={{ marginLeft: 3 }}>Gland Bolting</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>No. of Studs</Text><Text style={styles.tableCell}>{formData.glandBoltingNumberOfStuds}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Stud Size</Text><Text style={styles.tableCell}>{formData.glandBoltingStudSize}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Bolt Circle Diameter</Text><Text style={styles.tableCell}>{formData.glandBoltingBoltCircleDiameter}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Start Angle</Text><Text style={styles.tableCell}>{formData.glandBoltingStartAngle}</Text></View>

    <Text style={styles.subHeading}>Connections</Text>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Flush Size</Text><Text style={styles.tableCell}>{formData.connectionFlushSize}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Flush Angle</Text><Text style={styles.tableCell}>{formData.connectionFlushAngle}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Quench Size</Text><Text style={styles.tableCell}>{formData.connectionQuenchSize}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Quench Angle</Text><Text style={styles.tableCell}>{formData.connectionQuenchAngle}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Drain Size</Text><Text style={styles.tableCell}>{formData.connectionDrainSize}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Drain Angle</Text><Text style={styles.tableCell}>{formData.connectionDrainAngle}</Text></View>
  </View>
</View>

{/* Other Details - full width section */}
<View style={styles.section}>
  <View style={styles.table}>
    <View style={styles.header}><Text style={{ marginLeft: 3 }}>Other Details</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Accessories</Text><Text style={styles.tableCell}>{formData.otherDetailsAccessories}</Text></View>
    <View style={styles.tableRow}><Text style={styles.tableCellHeader}>Remarks</Text><Text style={styles.tableCell}>{formData.otherDetailsRemarks}</Text></View>
  </View>
</View>
        






      </Page>
    </Document>
  );


  return (
    <Container className="container">
      <form >
        <div className='card'>
          {!aId ? <h1 >Agitator Seal</h1> : <h1>Update Agitator Seal :</h1>}
          {/* <h3>Agitator Seal:-</h3> */}
          <div className="MuiBox-root css-2e6lci" style={{ marginTop: '1rem' }}><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Agitator Seal:-</div></div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="disableItem"
                disabled
                className="custom-text-field"
                name="drfNumber"
                InputLabelProps={{
                  shrink: Boolean(formData.drfNumber),
                }}
                autoFocus={!formData.drfNumber}
                value={formData.drfNumber}
                InputProps={{
                  readOnly: true,  // Prevent user input
                }}
                label="Drf Number"
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
                InputLabelProps={{
                  shrink: Boolean(formData.salesInquiryItemReferenceNo),
                }}
                autoFocus={!formData.salesInquiryItemReferenceNo}
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
                value={formData?.branch ?? null}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    branch: newValue
                  });
                }}

                inputValue={formData?.branch ?? null}
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




            <Grid item xs={12} sm={4}>
              <TextField
                required
                size="small"
                className="custom-text-field"
                value={formData.createdOn}
                label="Created On"
                id="disableItem"
                disabled
                fullWidth
                InputProps={{
                  readOnly: true,  // Prevent user input
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                size="small"
                className="custom-text-field"
                value={formData.updatedOn}
                label="Updated On"
                id="disableItem"
                disabled
                fullWidth
                InputProps={{
                  readOnly: true,  // Prevent user input
                }}
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                required
                size="small"
                className="custom-text-field"
                id="disableItem"
                disabled
                value={formData.createdByUser}
                label="Created By User"
                InputLabelProps={{
                  shrink: Boolean(formData.createdByUser),
                }}
                autoFocus={!formData.createdByUser} // Autofocus if the value exists
                InputProps={{
                  readOnly: true,  // Prevent user input
                }}
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                required
                size="small"
                className="custom-text-field"
                id="disableItem"
                disabled
                value={formData.updatedByUser}
                label="Updated By User"
                InputLabelProps={{
                  shrink: Boolean(formData.updatedByUser),
                }}
                autoFocus={!formData.updatedByUser} // Autofocus if the value exists
                InputProps={{
                  readOnly: true,  // Prevent user input
                }}
              />
            </Grid>


            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Customer</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                //  id="disableItem"
                // disabled
                name="customerName"
                value={formData.customerName}
                onChange={(e) => handleChange(e)}
                label="Customer Name"
              />
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Customer</InputLabel > */}
              <TextField
                size="small"
                className="custom-text-field"
                //  id="disableItem"
                // disabled
                name="endUser"
                value={formData.endUser}
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

        {/*Agitator Seal:- End  */}


        {/* Existing Seal - Start  */}

        <div className="card">
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
            <div className="MuiBox-root css-1isemmb">Agitator Data :-</div>
          </div>
          <Grid container spacing={2}>
            {/* Series */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Make"
                name="agitatorMake"
                value={formData.agitatorMake}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Model"
                name="agitatorModel"
                value={formData.agitatorModel}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>



            <Grid item xs={12} sm={4}>
              <Autocomplete
                size="small"
                value={formData?.agitatorEntry ?? null}
                onChange={(event, newValue) => {
                  setFormData({
                    ...formData,
                    agitatorEntry: newValue
                  });
                }}

                inputValue={formData?.agitatorEntry ?? null}
                onInputChange={(event, newInputValue) => {
                  setFormData({
                    ...formData,
                    agitatorEntry: newInputValue
                  });
                }}
                options={["Top", " Bottom", "Up"].map(elem => elem)}


                renderInput={(params) => (
                  <TextField
                    className="custom-text-field"
                    {...params}
                    size="small"
                    label="Entry"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Tag Number"
                name="agitatorTagNumber"
                value={formData.agitatorTagNumber}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Vessel MOC"
                name="agitatorVesselMoc"
                value={formData.agitatorVesselMoc}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>



          </Grid>

        </div>

        <div className="card">
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
            <div className="MuiBox-root css-1isemmb">Existing Seal :-</div>
          </div>
          <Grid container spacing={2}>
            {/* Series */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Series"
                disabled
                id="disableItem"
                name="series"
                value={formData.agitatorInquiryItem.series}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Performance */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                disabled
                id="disableItem"
                select
                label="Performance"
                name="performance"
                value={formData.agitatorInquiryItem.performance}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="Satisfactory">Satisfactory</MenuItem>
                <MenuItem value="Unsatisfactory">Unsatisfactory</MenuItem>
              </TextField>
            </Grid>

            {/* Seal Arrangement */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                select
                disabled
                id="disableItem"
                label="Seal Arrangement"
                name="sealArrangement"
                value={formData.agitatorInquiryItem.sealArrangement}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Double">Double</MenuItem>
              </TextField>
            </Grid>

            {/* Make */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Make"
                disabled
                id="disableItem"
                name="existingSealMake"
                value={formData.agitatorInquiryItem.existingSealMake}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* Size */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Size"
                disabled
                id="disableItem"
                name="existingSealSize"
                value={formData.agitatorInquiryItem.existingSealSize}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>


            {/* Moc */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Moc"
                disabled
                id="disableItem"
                name="existingSealMOC"
                value={formData.agitatorInquiryItem.existingSealMOC}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            {/* API Plan */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="API Plan"
                disabled
                id="disableItem"
                name="existingSealApiPlan"
                value={formData.agitatorInquiryItem.existingSealApiPlan}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </div>


        {/* Existing Seal :- End */}

        {/* Operating Parameters And Fluid Detail - Start */}

        <div className="card">
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
            <div className="MuiBox-root css-1isemmb">	Operating Parameters And Fluid Detail</div>
          </div>
          <h3 style={{ paddingBottom: '10px' }}>Parameters:-</h3>
          <Grid container spacing={2}>
            {/* Vessel Pressure (Operating) */}
            <Grid item xs={4}>
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="suctionPressure"
                value={formData.agitatorInquiryItem.vesselPressureOperating || ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    agitatorInquiryItem: {
                      ...prev.agitatorInquiryItem,
                      vesselPressureOperating: newValue
                    }
                  }));
                }}
                label="Vessel Pressure (Operating)"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FormControl size="small">
                        <Select

                          id="disableItem"
                          value={formData.agitatorInquiryItem?.vesselPressureOperatingUnit || ""}
                          onChange={(e) => {
                            const selectedUnit = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              agitatorInquiryItem: {
                                ...prev.agitatorInquiryItem,
                                vesselPressureDesignUnit: selectedUnit
                              }
                            }));
                          }}
                          displayEmpty
                          disabled={!formData.agitatorInquiryItem?.vesselPressureOperating.length} // Check if input has a value
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

                          {!formData.agitatorInquiryItem?.vesselPressureOperating && <MenuItem>Unit</MenuItem>}

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

            {/* Vessel Pressure (Design) */}
            <Grid item xs={4}>
              <TextField
                disabled
                id="disableItem"
                size="small"
                className="custom-text-field"
                name="vesselPressureDesign"
                value={formData.agitatorInquiryItem.vesselPressureDesign || ""}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    agitatorInquiryItem: {
                      ...prev.agitatorInquiryItem,
                      vesselPressureDesign: newValue
                    }
                  }));
                }}
                label="Vessel Pressure (Design)"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FormControl size="small">
                        <Select

                          id="disableItem"
                          value={formData.agitatorInquiryItem?.vesselPressureDesignUnit || ""}
                          onChange={(e) => {
                            const selectedUnit = e.target.value;
                            setFormData((prev) => ({
                              ...prev,
                              agitatorInquiryItem: {
                                ...prev.agitatorInquiryItem,
                                vesselPressureDesignUnit: selectedUnit
                              }
                            }));
                          }}
                          displayEmpty
                          disabled={!formData.vesselPressureDesign?.vesselPressureOperating.length} // Check if input has a value
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

                          {!formData.agitatorInquiryItem?.vesselPressureDesign && <MenuItem>Unit</MenuItem>}

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




            {/* Direction of Rotation */}
            <Grid item xs={4}>
              <TextField
                select
                disabled
                id="disableItem"
                className="custom-text-field"
                label="Direction of Rotation"
                name="directionOfRotation"
                value={formData.agitatorInquiryItem.directionOfRotation || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              >
                <MenuItem value="CW">CW</MenuItem>
                <MenuItem value="CCW">CCW</MenuItem>
              </TextField>
            </Grid>

            {/* Speed */}
            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Speed"
                name="speed"
                disabled
                id="disableItem"
                value={formData.agitatorInquiryItem.speed || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>

          <div>
            <h3 style={{ padding: '10px 0' }}>Fluids :-</h3>

            <Grid container spacing={2}>
              {/* Fluid */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Fluid"
                  name="fluid"
                  disabled
                  id="disableItem"
                  value={formData.agitatorInquiryItem.fluid || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>


              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="fluid"
                  value={formData?.agitatorInquiryItem.nature}
                  onChange={(e) => handleChange(e)}
                  label="Nature"
                  fullWidth
                />
              </Grid>


    


              {/* Pumping Temperature */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  size="small"
                  className="custom-text-field"
                  name="suctionPressure"
                  value={formData.agitatorInquiryItem?.pumpingTemperature?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      agitatorInquiryItem: {
                        ...prev.agitatorInquiryItem,
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
                            value={formData.agitatorInquiryItem?.pumpingTemperature?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                agitatorInquiryItem: {
                                  ...prev.agitatorInquiryItem,
                                  pumpingTemperature: {
                                    ...prev.agitatorInquiryItem.pumpingTemperature,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.agitatorInquiryItem?.pumpingTemperature?.value?.length} // Check if input has a value
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

                            {!formData.agitatorInquiryItem?.pumpingTemperature && <MenuItem>Unit</MenuItem>}

                            <MenuItem value="C">℃</MenuItem>
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
                  name="suctionPressure"
                  value={formData.agitatorInquiryItem?.maximumTemperature?.value || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      agitatorInquiryItem: {
                        ...prev.agitatorInquiryItem,
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
                            value={formData.agitatorInquiryItem?.maximumTemperature?.unit || ""}
                            onChange={(e) => {
                              const selectedUnit = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                agitatorInquiryItem: {
                                  ...prev.agitatorInquiryItem,
                                  maximumTemperature: {
                                    ...prev.agitatorInquiryItem.maximumTemperature,
                                    unit: selectedUnit,
                                  },
                                }
                              }));
                            }}
                            displayEmpty
                            disabled={!formData.agitatorInquiryItem?.maximumTemperature?.value?.length} // Check if input has a value
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

                            {!formData.agitatorInquiryItem?.maximumTemperature && <MenuItem>Unit</MenuItem>}

                            <MenuItem value="C">℃</MenuItem>
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
                  className="custom-text-field"
                  label="SP Gravity"
                  name="spGravity"
                  value={formData.agitatorInquiryItem.spGravity || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>


              {/* Freezing Point */}
              <Grid item xs={4}>
                <TextField
                  disabled
                  id="disableItem"
                  className="custom-text-field"
                  label="Freezing Point"
                  name="freezingPoint"
                  value={formData.agitatorInquiryItem.freezingPoint || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Boiling Point */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  disabled
                  id="disableItem"
                  label="Boiling Point"
                  name="boilingPoint"
                  value={formData.agitatorInquiryItem.boilingPoint || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>


              {/* Viscosity */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Viscosity"
                  disabled
                  id="disableItem"
                  name="viscosity"
                  value={formData.agitatorInquiryItem.viscosity || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Percentage Of Solid */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Percentage Of Solid"
                  disabled
                  id="disableItem"
                  name="percentageOfSolid"
                  value={formData.agitatorInquiryItem.percentageOfSolid || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>

              {/* Solid Size */}
              <Grid item xs={4}>
                <TextField
                  className="custom-text-field"
                  label="Solid Size"
                  name="solidSize"
                  disabled
                  id="disableItem"
                  value={formData.agitatorInquiryItem.solidSize || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </Grid>



              {/* Special Note */}
              <Grid item xs={12}>
                <TextField
                  className="custom-text-field"
                  disabled
                  id="disableItem"
                  label="Special Note (150 character limit)"
                  name="specialNote"
                  value={formData.agitatorInquiryItem.specialNote || ''}
                  onChange={(e) => handleChange(e)}
                  inputProps={{ maxLength: 150 }}
                  variant="outlined"
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>


            </Grid>
          </div>
        </div>


        {/* Operating Parameters And Fluid Detail - End */}
        <div className="card">
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
              className="feather feather-alert-circle" >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Propposed Mechanical Seal </div>
          </div>
          <Grid container spacing={2}>

            <FormControl style={{ display: 'flex', margin: "1rem" }} component="fieldset">
              <FormLabel component="legend" sx={{ fontSize: '0.7rem', fontWeight: 700 }}>Select Seal</FormLabel>
              <RadioGroup
                aria-label="radioJointType"
                name="radioJointType"
                row
                inputValue={selectSeal ?? null}
                value={selectSeal}
                onChange={(e) => setSelectSeal(e.target.value)}
              >

                <FormControlLabel
                  value="existing"
                  control={<Radio />}
                  label="Exisitng"
                />
                <FormControlLabel
                  value="new"
                  control={<Radio />}
                  label="New"
                />
              </RadioGroup>
            </FormControl>

          </Grid>

          <Grid item xs={12} sm={4}>

            {selectSeal === "existing" ?
              <div>

                <Grid container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <TextField className="custom-text-field"
                      label="G.A Number" name="existingSealGA"
                      value={formData.existingSealGA || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>

                  <Grid item xs={4}> <TextField className="custom-text-field" label="Seal Series" name="existingSealSeries"
                    value={formData.existingSealSeries || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField className="custom-text-field" label="Shaft Dia" name="existingSealShaftDia"
                      value={formData.existingSealShaftDia || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField className="custom-text-field" label="Seal Size" name="existingSealSize"
                      value={formData.existingSealSize || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>


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

                  {renderMocFields('existingSeal', 'IB')}
                  {formData?.existingSealType === 'double' && renderMocFields('existingSeal', 'OB')}


                </Grid>
              </div>
              : null
            }

            {selectSeal === "new" ?
              <div>

                <Grid container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <TextField className="custom-text-field"
                      label="Shaft Dia" name="newSealShaftDia"
                      value={formData.newSealShaftDia || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>


                  <Grid item xs={4}>
                    <TextField className="custom-text-field" label="Bore Dia" name="newSealBoreDia"
                      value={formData.newSealBoreDia || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>



                  <Grid item xs={4}>
                    <TextField className="custom-text-field" label="Seal Bore Depth" name="newSealBoreDepth"
                      value={formData.newSealBoreDepth || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
                  </Grid>


                  <Grid item xs={4}>
                    <TextField className="custom-text-field" label="Nearest Obstruction" name="newSealNearestObstruction"
                      value={formData.newSealNearestObstruction || ''} onChange={(e) => handleChange(e)} variant="outlined" size="small" fullWidth />
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

                  {renderMocFields('newSeal', 'IB')}
                  {formData?.existingSealType === 'double' && renderMocFields('newSeal', 'OB')}

                </Grid>

              </div>
              : null
            }
          </Grid>
        </div>



        <div className="card">
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
              className="feather feather-alert-circle" >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Api Plan </div>
          </div>
          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Flushing Plans"
                name="apiFlushingPlans"
                value={formData.apiFlushingPlans || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Barrier/ Buffer Plans"
                name="apiBarrierBufferPlans"
                value={formData.apiBarrierBufferPlans || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Atmospheric Plans"
                name="apiAtmosphericPlans"
                value={formData.apiAtmosphericPlans || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Collection Plans"
                name="apiCollectionPlans"
                value={formData.apiCollectionPlans || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

          </Grid>



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
              className="feather feather-alert-circle" >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Measurement</div>
          </div>

      {/* <Grid item xs={16}>
          <FormControl component="fieldset" style={{ margin: '0 0 1rem 0.8rem' }}>
            <h3 style={{ padding: '1px 0' }}>Type of Pad Plate?</h3>
            <RadioGroup
              row
              aria-label="typeOfStuffingBox"
              name="measurementTypeOfPadPlate"
              value={formData?.measurementTypeOfPadPlate}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  measurementTypeOfPadPlate: e.target.value
                })
              }} >

              <FormControlLabel value="Type_I" control={<Radio />} label="Type I" />
              <FormControlLabel value="Type_II" control={<Radio />} label="Type II" />
              <FormControlLabel value="Type_III" control={<Radio />} label="Type III" />
            </RadioGroup>
            {formData?.measurementTypeOfPadPlate && (
                   <a
                   href={`/images/${formData.measurementTypeOfPadPlate}.jpg`}
                   target="_blank"
                   rel="noopener noreferrer"
                 >
                   <div style={{ boxShadow: 'rgb(194, 213, 213) 5px 9px 12px 2px', margin:'2em 1em' }}>
                     <img
                       src={`/images/${formData.measurementTypeOfPadPlate}.jpg`}
                       alt="Stuffing Box"
                       width={200}
                       style={{ cursor: "zoom-in" }}
                     />
                   </div>
                 </a>
                )} 
          </FormControl>
          </Grid> */}


          <Grid container spacing={2}>


            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Collection Plans"
                name="measurementShaftOd"
                value={formData.measurementShaftOd || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Pad Plate ID"
                name="measurementPadPlateId"
                value={formData.measurementPadPlateId || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                required
                fullWidth
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Nearest Obstruction"
                name="measurementNearestObstruction"
                value={formData.measurementNearestObstruction || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                required
                fullWidth
              />
            </Grid>
          </Grid>



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
              className="feather feather-alert-circle" >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Spigot Details</div>
          </div>


          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Spigot Dia"
                name="measurementSpigotDia"
                value={formData.measurementSpigotDia || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                required
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Socket Depth"
                name="measurementSocketDepth"
                value={formData.measurementSocketDepth || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                required
                fullWidth
              />
            </Grid>

          </Grid>


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
              className="feather feather-alert-circle" >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Other Dimensions</div>
          </div>

          <Grid container spacing={2}>

            {(formData?.measurementTypeOfPadPlate === "")
              ?
              (<p style={{ marginLeft: "1.2rem", color: "gray" }}>No Dimensions To Display</p>) :
              <>
                {(formData?.measurementTypeOfPadPlate === "Type II" || formData?.measurementTypeOfPadPlate === "Type III")
                  && <Grid item xs={4}>
                    <TextField
                      className="custom-text-field"
                      label="Shaft Dia D1"
                      name="measurementShaftDiaD1"
                      value={formData.measurementShaftDiaD1 || ''}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                }

                {(formData?.measurementTypeOfPadPlate === "Type III") &&
                  <Grid item xs={4}>
                    <TextField
                      className="custom-text-field"
                      label="Shaft Dia D2"
                      name="measurementShaftDiaD2"
                      value={formData.measurementShaftDiaD2 || ''}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                }


                {(formData?.measurementTypeOfPadPlate === "Type II" || formData?.measurementTypeOfPadPlate === "Type III") &&
                  <Grid item xs={4}>
                    <TextField
                      className="custom-text-field"
                      label="Shaft Distance L1"
                      name="measurementShaftStepDistanceL1"
                      value={formData.measurementShaftStepDistanceL1 || ''}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                }


                {
                  (formData?.measurementTypeOfPadPlate === "Type III") &&
                  <Grid item xs={4}>
                    <TextField
                      className="custom-text-field"
                      label="Distance Between Steps L2"
                      name="measurementDistanceBetweenStepsL2"
                      value={formData.measurementDistanceBetweenStepsL2 || ''}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                }

                {(formData?.measurementTypeOfPadPlate === "Type III") &&
                  <Grid item xs={4}>
                    <TextField
                      className="custom-text-field"
                      label="Pad Plate Thickness T"
                      name="measurementPadPlateThicknessT"
                      value={formData.measurementPadPlateThicknessT || ''}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>

                }


                {(formData?.measurementTypeOfPadPlate === "Type III" ||
                  formData?.measurementTypeOfPadPlate === "Type I") &&
                  <Grid item xs={4}>
                    <TextField
                      className="custom-text-field"
                      label="Radius R"
                      name="measurementRadiusR"
                      value={formData.measurementRadiusR || ''}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                }
              </>
            }

          </Grid>







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
              className="feather feather-alert-circle" >
              <g>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">Gland Bolting</div>
          </div>


          <Grid container spacing={2}>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="No of Studs"
                type="number"
                name="glandBoltingNumberOfStuds"
                value={formData.glandBoltingNumberOfStuds || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Stud Size"
                name="glandBoltingStudSize"
                value={formData.glandBoltingStudSize || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Bolt Circle Diameter"
                name="glandBoltingBoltCircleDiameter"
                value={formData.glandBoltingBoltCircleDiameter || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>


            <Grid item xs={4}>
              <TextField
                className="custom-text-field"
                label="Start Angle"
                type="number"
                name="glandBoltingStartAngle"
                value={formData.glandBoltingStartAngle || ''}
                onChange={(e) => handleChange(e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </Grid>


          </Grid>


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
                  name="connectionFlushSize"
                  label="Size"
                  value={formData?.connectionFlushSize || ''}
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
                  name="connectionFlushAngle"
                  label="Angle"
                  value={formData?.connectionFlushAngle || ''}
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
                  name="connectionQuenchSize"
                  label="Size"
                  value={formData?.connectionQuenchSize || ''}
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
                  name="connectionQuenchAngle"
                  label="Angle"
                  value={formData?.connectionQuenchAngle || ''}
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
                  name="connectionDrainSize"
                  label="Size"
                  value={formData?.connectionDrainSize || ''}
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
                  name="connectionDrainAngle"
                  label="Angle"
                  value={formData?.connectionDrainAngle || ''}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

          </Grid>



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
                  label="Remarks"
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
          </Grid>

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

          <Grid item xs={6}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "1rem" }}>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={drRef}
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
                  formData.append("filetype", "agitator")
                  
                  try {
                    const { data } = await axiosInstance.post(
                      `/lens/fileUpload/file?filetype=agitator`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data", 
                          "accept": "*/*"
                        }
                      }
                    );
                

                    console.log("File Upload Response:", data);

                    setDrInput(data);

                    //  Update `rotaryJointInquiries[index]` with the new filename
                    setFormData((prev) => ({
                      ...prev,
                      attachmentReferenceMechanicalSealDrawing: data
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
                onClick={() => drRef.current.click()} // Trigger file input
              >
                <AttachFileIcon style={{ fontSize: "16px" }} />
                Attachment Reference Mechanical Seal Drawing
              </button>
              {(formData.attachmentReferenceMechanicalSealDrawing && drInput) || (formData.attachmentReferenceMechanicalSealDrawing && aId) ? (
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
              ) : null}
            </div>

            {drInput || (aId && formData.attachmentReferenceMechanicalSealDrawing) ? (
              <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {drInput ? drInput : formData.attachmentReferenceMechanicalSealDrawing}
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
            ) : null}

          </Grid>






          <Grid item xs={4}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "1rem" }}>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={ppRef}
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
                  formData.append("filetype", "agitator")
                  
                  try {
                    const { data } = await axiosInstance.post(
                      `/lens/fileUpload/file?filetype=agitator`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data", 
                          "accept": "*/*"
                        }
                      }
                    );
                

                    console.log("File Upload Response:", data);

                    setPPInput(data);

                    //  Update `rotaryJointInquiries[index]` with the new filename
                    setFormData((prev) => ({
                      ...prev,
                      attachmentPadPlateDetails: data
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
                onClick={() => ppRef.current.click()} // Trigger file input
              >
                <AttachFileIcon style={{ fontSize: "16px" }} />
                Pad Plate Details
              </button>
              {(formData.attachmentPadPlateDetails && ppInput) || (formData.attachmentPadPlateDetails && aId) ? (
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
                      let fileName = formData.attachmentPadPlateDetails; // Extract filename
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
              ) : null}
            </div>

            {ppInput || (aId && formData.attachmentPadPlateDetails) ? (
              <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {ppInput ? ppInput : formData.attachmentPadPlateDetails}
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
                  onClick={() => handleFileDelete("attachmentPadPlateDetails")}
                >
                  X
                </button>
              </p>
            ) : null}


          </Grid>



        </div>







        <Grid item xs={4} style={{display:"flex"}}>
          <Grid item xs={4}>

            {!aId ? (<Button  disabled={!authState?.authorities.includes("DRFInquiry_Write")} className="submit-btn" type="submit" onClick={(e) => handleSubmit(e, formData, navigate)} variant="contained" >Submit</Button>) : (
              <>
                <Button className="update-btn" variant="contained" disabled={(authState?.sub)!==formData.createdByUser&&!authState?.authorities.includes("DRFInquiry_Write")} onClick={(e) => handleUpdate(e, formData, navigate, aId)} >Update</Button>
                <Button className="cancel-btn" variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
          <Grid item xs={4} style={{ margin: '12px 0px 0px 20px' }}>
  <PDFDownloadLink document={<PDFFile formData={formData} />} fileName="AgitatorSeal.pdf">
    {({ loading }) => (
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        style={{
          backgroundColor: '#ff6d6d',
          color: 'white',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
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








