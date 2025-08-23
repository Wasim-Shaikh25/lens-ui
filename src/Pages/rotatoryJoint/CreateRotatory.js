import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, MenuItem, Grid, InputLabel, Autocomplete, Select, InputAdornment, FormControl, FormControlLabel, Radio, FormLabel, RadioGroup, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getRotary, handleSubmit, handleUpdate } from '../../apis/RotaryApi';
import { useAuth } from '../../contextApi/AuthContext';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axiosInstance from '../../axios/axiosInstance';
import DownloadIcon from '@mui/icons-material/Download';
import { useRef } from 'react';
import { PDFDownloadLink,Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import SaveIcon from '@mui/icons-material/Save';
import Logo from '../../assets/Picture1.png'





export default function CreateRotatory() {

  const navigate = useNavigate();
  let { rjId } = useParams();
  const { authState } = useAuth();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

  const [radioJointType, setRadioJointType] = useState("")

  const [formData, setFormData] = useState(
    {
      rotaryJointId: "",
      drfNumber: "",
      branch: "",
      salesInquiryItemReferenceNo: "",
      createdOn: dateTime,
      updatedOn: dateTime,
      createdByUser:authState?.sub,
      updatedByUser:authState?.sub,
      customerName: "",
      endUser: "",
      costingRequirement: false,
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
      rotaryJointInquiryItem: {
        rotaryJointInquiryReferenceNo: "",
        createdByUser:authState?.sub,
        updatedByUser:authState?.sub,
        createdOn: dateTime,
        updatedOn: dateTime,
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
        fileName: ""
      }
    }
    );



  useEffect(() => {
    if (rjId !== undefined) {
      getRotary(rjId, setFormData);

    } else {
      setFormData(
        {
          rotaryJointId: "",
          drfNumber: "",
          branch: "",
          salesInquiryItemReferenceNo: "",
          createdOn: dateTime,
          updatedOn: dateTime,
          createdByUser:authState?.sub,
          updatedByUser:authState?.sub,
          customerName: "",
          endUser: "",
          costingRequirement: false,
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
          rotaryJointInquiryItem: {
            rotaryJointInquiryReferenceNo: "",
            createdByUser:authState?.sub,
            updatedByUser:authState?.sub,
            createdOn: dateTime,
            updatedOn: dateTime,
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
            fileName: ""
          }
        })

    }


  }, [rjId, authState])


  const handleFileChange = (event) => {
    setFormData({ ...formData, attachment: event.target.files[""] });
  };


  const [operatingTemperature, setOperatingTemperature] = useState({
    value: '',
    unit: '',
  });


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
      fontSize: 9,
      borderTop:1,
      borderLeft:0.5,
      borderRight:1,
      marginBottom:-1,  
      fontWeight: 'bold',
      paddingTop:5,
      paddingLeft:5,
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
      paddingLeft: 4,
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
      fontWeight: 'bold',
      flexWrap: 'wrap',
      wordBreak: 'break-word',
      fontSize: 9,
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
      borderWidth:1 
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

      {/* ---------- Header Section ---------- */}
      <View style={styles.compDetails}>
        <Image style={styles.logoImg} src={Logo} />
        <View style={styles.compSec}>
          <Text style={styles.title}>Drawing Requisition Form</Text>
          <Text style={styles.rightTopHeading}>Rotary Joint DataSheet</Text>
          <Text style={styles.compDesc}>Leak-Proof® Engineering Pvt. Ltd.</Text>
        </View>
      </View>

      {/* ---------- General Information (First Section: Vertical) ---------- */}
      <View style={styles.table}>
        {[
          ["DRF Number", formData.drfNumber],
          ["Branch", formData.branch],
          ["Sales Inquiry Item Reference No.", formData.salesInquiryItemReferenceNo],
          ["Created By User", formData.createdByUser],
          ["Created On", formData.createdOn],
          ["Updated By User", formData.updatedByUser],
          ["Updated On", formData.updatedOn],
          ["Customer Name", formData.customerName],
          ["End User", formData.endUser],
          ["Costing Requirement", formData.costingRequirement ? "Yes" : "No"],
        ].map(([label, value], idx) => (
          <View style={styles.tableRow} key={idx}>
            <Text style={styles.tableCellHeader}>{label}</Text>
            <Text style={styles.tableCell}>{value}</Text>
          </View>
        ))}
      </View>

      {/* ---------- Application Details (Horizontal Split) ---------- */}
      <Text style={styles.subHeading}>Application Details</Text>
      <View style={styles.sharedSplitBoxContainer}>
        <View style={styles.leftSplitBox}>
          {[
            ["Equipment", formData.equipment],
            ["Make", formData.make],
            ["Model", formData.model],
            ["Fluid", formData.fluid],
          ].map(([label, value], idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rightSplitBox}>
          {[
            ["Operating Temperature", `${formData.operatingTemperature} ${formData.operatingTemperatureUnit}`],
            ["Flow Rate", formData.flowRate],
            ["Speed", formData.speed],
            ["Operating Pressure", `${formData.operatingPressure} ${formData.operatingPressureUnit}`],
          ].map(([label, value], idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ---------- Existing Rotary Joint Details (Horizontal Split) ---------- */}
      <Text style={styles.subHeading}>Existing Rotary Joint Details</Text>
      <View style={styles.sharedSplitBoxContainer}>
        <View style={styles.leftSplitBox}>
          {[
            ["Make", formData.existingRotaryJointMake],
            ["Model Type", formData.existingRotaryJointModelType],
          ].map(([label, value], idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rightSplitBox}>
          {[
            ["Connection Size", formData.existingRotaryJointConnectionSize],
            ["Connection Type", formData.existingRotaryJointConnectionType],
            ["Joint Type", formData.jointType],
          ].map(([label, value], idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ---------- Proposed Rotary Joint Detail (Last Section: Vertical) ---------- */}
      <Text style={styles.subHeading}>Proposed Rotary Joint Detail</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Make</Text>
          <Text style={styles.tableCell}>{formData.proposedRotaryJointMake}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCellHeader}>Model Type</Text>
          <Text style={styles.tableCell}>{formData.rotaryJointInquiryItem?.proposedRotaryJointModelType}</Text>
        </View>

        {/* Threaded or Flanged details */}
        {formData?.proposedRotaryJointModelType === "Threaded" && (
          <>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Inlet Connection Size</Text>
              <Text style={styles.tableCell}>{formData.inletConnectionSize}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Outlet Connection Size</Text>
              <Text style={styles.tableCell}>{formData.outletConnectionSize}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Connection Type</Text>
              <Text style={styles.tableCell}>{formData.connectionType}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Handing</Text>
              <Text style={styles.tableCell}>{formData.handing}</Text>
            </View>
          </>
        )}

        {formData?.proposedRotaryJointModelType === "Flanged" && (
          <>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Inlet Flanged Size</Text>
              <Text style={styles.tableCell}>{formData.inletFlangedSize}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellHeader}>Outlet Flanged Size</Text>
              <Text style={styles.tableCell}>{formData.outletFlangedSize}</Text>
            </View>
          </>
        )}
      </View>
    </Page>
  </Document>
);



  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };


  const handleFetch =  async(apiItem)=>{

    try {
      const {data} = await axiosInstance(`lens/salesInquiry/get?itemReferenceNo=${apiItem}`)
  
      console.log("response is ",data)
      setFormData({
        salesInquiryItemReferenceNo:formData.salesInquiryItemReferenceNo,
        customerName:formData.customerName,
        endUser:formData.endUser,
        ...data?.rotaryJointInquiry,
        rotaryJointInquiryItem:{...data?.rotaryJointInquiry}
      })
      
    } catch (err) {
        console.log(err)
    }
  
  }

  const handleTemperatureChange = (event) => {
    const selectedUnit = event.target.innerText; // Get the selected unit from the event
    setFormData({
      ...formData,
      operatingTemperature: `${formData.operatingTemperature} ${selectedUnit}`, // Concatenate value
    });
  };


  const handleChange = (keyName=null)=> (e) => {
    const { name,value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      ...(keyName
        ? {
            [keyName]: {
              ...prevState[keyName], // Preserve existing nested state
              [name]: value, // Update the specific field
            },
          }
        : { [name]: value }),
    }));
 };


 const drRef = useRef()


 const [drInput,setDrInput] = useState("")

 const handleFileDelete = (fieldName)=>{

  setFormData((prev)=>({
    ...prev,
    rotaryJointInquiryItem:{
      ...prev.rotaryJointInquiryItem,
      [fieldName]:""
    }
  }))

  switch(fieldName){

    case "referenceDrawing":
      setDrInput("");
      break;

      default:
        break;

  }

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
    <Container className="container">
    {/* <form > */}
    <div className='card'>
      {!rjId ? <h1>New Rotary Joint </h1> : <h1>Update Rotary Joint </h1>}
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
            onChange={handleChange} />
        </Grid>


        <Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    label="Sales Inquiry Reference No."
    name="salesInquiryItemReferenceNo"
    value={formData.salesInquiryItemReferenceNo}
    onChange={handleChange()}
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
            cursor:"pointer"
          }}
          disabled={!formData.salesInquiryItemReferenceNo}
          onClick={()=>handleFetch(formData?.salesInquiryItemReferenceNo)} // Your function here
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
            onChange={handleChange()}
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
            onChange={handleChange()}
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



    <div className="card">

      <div className="MuiBox-root css-2e6lci">
        <svg
          width="20"
          height="25"
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
        <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}> {/* Adjust the font size here */}
          Application Detail
        </div>
      </div>


      <Grid container spacing={2}>
        <Grid item xs={4}>

          {/* <InputLabel className="ip-label" >Equipment</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="equipment"
            value={formData.equipment || ""}
            onChange={handleChange}
            label="Equipment"
          />
        </Grid>


        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >erjMake</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="make"
            value={formData.make || ""}
            onChange={handleChange}
            label="Make"
          />
        </Grid>

        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Model</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="model"
            value={formData.model || ""}
            onChange={handleChange}
            label="Model"
          />
        </Grid>


        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Fluid</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="fluid"
            value={formData.fluid || ""}
            onChange={handleChange}
            label="Fluid"
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
    size="small"
    disabled
    id="disableItem"
    className="custom-text-field"
    name="operatingTemperature"
    value={formData?.operatingTemperature || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        rotaryJointInquiryItem: {
          ...prev.rotaryJointInquiryItem,
          operatingTemperature:newValue
        },
      }));
    }}
    label="Operating Temprature"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small">
            <Select
              id="disableItem"
              value={formData?.operatingTemperatureUnit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  rotaryJointInquiryItem: {
                    ...prev.rotaryJointInquiryItem,
                    operatingTemperatureUnit: selectedUnit
                  },
                }));
              }}
              displayEmpty
              disabled={!formData?.operatingTemperature?.length} // ✅ Check if input has a value
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
{!formData?.operatingTemperature&&<MenuItem>Unit</MenuItem>}
<MenuItem value="C">℃</MenuItem>
      <MenuItem value="F">℉</MenuItem>
        </Select>
      </FormControl>
    </InputAdornment>
    )
  }}
/>
</Grid>






        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Flow Rate</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="flowRate"
            value={formData.flowRate || ""}
            onChange={handleChange}
            label="Flow Rate"
          />
        </Grid>


        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Speed</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="speed"
            value={formData.speed || ""}
            onChange={handleChange}
            label="Speed"
          />
        </Grid>


        <Grid item xs={4}>
          <TextField
            disabled
            id="disableItem"
    size="small"
    className="custom-text-field"
    name="operatingPressure"
    value={formData?.operatingPressure || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        rotaryJointInquiryItem: {
          ...prev.rotaryJointInquiryItem,
          operatingPressure:newValue
        },
      }));
    }}
    label="Operating Pressure"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small">
            <Select
            
            id="disableItem"
              value={formData?.rotaryJointInquiryItem?.operatingPressureUnit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  rotaryJointInquiryItem: {
                    ...prev.rotaryJointInquiryItem,
                    operatingPressureUnit:selectedUnit 
                  },
                }));
              }}
              displayEmpty
              disabled={!formData?.operatingPressure?.length} // ✅ Check if input has a value
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

{!formData?.operatingPressure&&<MenuItem>Unit</MenuItem>}
      
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


    <div className='card'>
      <div className="MuiBox-root css-2e6lci">
        <svg
          width="20"
          height="25"
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
        <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}> {/* Adjust the font size here */}
          Existing Rotary Joint Detail
        </div>
      </div>

      <Grid container spacing={2}>

        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Existing erjMake</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="existingRotaryJointMake"
            value={formData.existingRotaryJointMake || ""}
            onChange={handleChange}
            label="Make"
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <Autocomplete
            size="small"
            id="disableItem"
            disabled
            value={formData?.rotaryJointInquiryItem.existingRotaryJointModelType ?? null}
            onChange={(event, newValue) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                rotaryJointInquiryItem: {
                  ...prevFormData,
                  existingRotaryJointModelType: newValue,
                }
              }));
            }}
            

            inputValue={formData?.rotaryJointInquiryItem.existingRotaryJointModelType ?? null}
            onInputChange={(event, newInputValue) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                rotaryJointInquiryItem: {
                  ...prevFormData,
                  existingRotaryJointModelType: newInputValue,
                }
              }));
            }}
            options={["Dual Flow", "Mono Flow"].map((b) => b)}
            // onFocus={() => getDepartments(setDepartments)}

            renderInput={(params) => (
              <TextField
               className="custom-text-field"
                {...params}
                size="small"
                label="Model Type"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>


        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Connection Type</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
          name="existingRotaryJointConnectionType"
            value={formData.existingRotaryJointConnectionType || ""}
            onChange={handleChange}
            label="Connection Type"
          />
        </Grid>


        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Connection Size</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
           name="existingRotaryJointConnectionSize"
            value={formData.existingRotaryJointConnectionSize || ""}
            onChange={handleChange}
            label="Connection Size"
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <Autocomplete
            size="small"
            id="disableItem"
            disabled
            value={formData?.jointType ?? null}
            onChange={(event, newValue) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                rotaryJointInquiryItem: {
                  ...prevFormData,
                  jointType: newValue,
                }
              }));
            }}

            inputValue={formData?.jointType ?? null}
            onInputChange={(event, newInputValue) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                rotaryJointInquiryItem: {
                  ...prevFormData,
                  jointType: newInputValue,
                }
              }));
            }}
            options={["Threaded", "Flanged"].map((b) => b)}

            renderInput={(params) => (
              <TextField
                className="custom-text-field"
                {...params}
                size="small"
                label="Joint Type"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>

      </Grid>
    </div>

    <div className="card">
      <div className="MuiBox-root css-2e6lci">
        <svg
          width="20"
          height="25"
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
        <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}>
          Proposed Rotatory Joint Detail
        </div>
      </div>

           
         {/* Starting */}
         
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Existing erjMake</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="proposedRotaryJointMake"
            value={formData.proposedRotaryJointMake || ""}
            onChange={handleChange}
            label="Make"
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <Autocomplete
          id="disableItem"
          disabled
            size="small"
            value={formData?.rotaryJointInquiryItem.proposedRotaryJointModelType ?? null}
            onChange={(event, newValue) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                rotaryJointInquiryItem: {
                  ...prevFormData,
                  proposedRotaryJointModelType: newValue,
                }
              }));
            }}

            inputValue={formData?.rotaryJointInquiryItem.proposedRotaryJointModelType ?? null}
        onInputChange={(event, newInputValue) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            rotaryJointInquiryItem: {
              ...prevFormData,
              proposedRotaryJointModelType: newInputValue,
            }
          }));
            }}
            options={["Dual Flow", "Mono Flow"].map((b) => b)}
            // onFocus={() => getDepartments(setDepartments)}

            renderInput={(params) => (
              <TextField
                className="custom-text-field"
                {...params}
                size="small"
                label="Model Type"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </Grid>



        <Grid item xs={12} sm={4}>
          <FormControl style={{ display: 'flex' }} component="fieldset">
            <FormLabel component="legend" sx={{ fontSize: '0.7rem', fontWeight: 700 }}>Joint Type</FormLabel>
            <RadioGroup
              aria-label="radioJointType"
              name="radioJointType"
              row // Use this prop to align items horizontally
            inputValue={formData?.proposedRotaryJointModelType ?? null}
              value={formData?.proposedRotaryJointModelType}
              onChange={(e)=>setFormData((prev)=>({
                ...prev,
                proposedRotaryJointModelType:e.target.value,
                rotaryJointInquiryItem:{
                  ...prev.rotaryJointInquiryItem,
                }
              }))}
            >
              <FormControlLabel
                value="Flanged"
                control={<Radio />}
                label="Flanged"
              />
              <FormControlLabel
                value="Threaded"
                control={<Radio />}
                label="Threaded"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </div>

    {formData?.proposedRotaryJointModelType === 'Threaded' &&

      <div className="card">

        <div className="MuiBox-root css-2e6lci">
          <svg
            width="20"
            height="25"
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
          <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}> Threaded </div>
        </div>


        <Grid container spacing={2}>

          <Grid item xs={4}>
            {/* <InputLabel className="ip-label" >Connection Type</InputLabel > */}
            <TextField
              size="small"
              id="disableItem"
              disabled
              className="custom-text-field"
              name="inletConnectionSize"
              value={formData.inletConnectionSize || ""}
              onChange={handleChange}
              label="Inlet Connection Size"
            />
          </Grid>


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label" >Connection Type</InputLabel > */}
            <TextField
              size="small"
              id="disableItem"
              disabled
              className="custom-text-field"
              name="outletConnectionSize"
              value={formData.outletConnectionSize || ""}
              onChange={handleChange}
              label="Outlet Connection Size"
            />
          </Grid>


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label" >Connection Size</InputLabel > */}
            <TextField
            id="disableItem"
            disabled
              size="small"
              className="custom-text-field"
              name="connectionType"
              value={formData.connectionType || ""}
              onChange={handleChange}
              label="Connection Type"
            />
          </Grid>


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label" >Connection Size</InputLabel > */}
            <TextField
            id="disableItem"
            disabled
              size="small"
              className="custom-text-field"
              name="handing"
              value={formData?.handing}
              onChange={handleChange}
              label="Handing"
            />
          </Grid>

        </Grid>
      </div>

    }


    {formData?.proposedRotaryJointModelType === 'Flanged' && <div className="card">

      <div className="MuiBox-root css-2e6lci">
        <svg
          width="20"
          height="25"
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
        <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}> Flanged</div>
      </div>


      <Grid container spacing={2}>

        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Connection Type</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="inletFlangedSize"
            value={formData.inletFlangedSize || ""}
            onChange={handleChange}
            label="Inlet Flanged Size"
          />
        </Grid>


        <Grid item xs={4}>
          {/* <InputLabel className="ip-label" >Connection Size</InputLabel > */}
          <TextField
            size="small"
            className="custom-text-field"
             id="disableItem"
            disabled
            name="outletFlangedSize"
            value={formData.outletFlangedSize || ""}
            onChange={handleChange}
            label="Outlet Flanged Size"
          />
        </Grid>

      </Grid>
    </div>

    // Ending 

    }

    <div className="card">

      <div className="MuiBox-root css-2e6lci">
        <svg
          width="20"
          height="25"
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
        <div className="MuiBox-root css-1isemmb" style={{ fontSize: '14px' }}> Attachment </div>
      </div>



      <Grid container spacing={2}>

{/* Attachments */}







<Grid item xs={6}>
<div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

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

try {
  const { data } = await axiosInstance.post(
    `lens/fileUpload/file?filelocation=${encodeURIComponent(file.name)}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  console.log("File Upload Response:", data);

  // Update `uploadedFileNames` at the correct index
  setDrInput(data);

  // Update `rotaryJointInquiries[index]` with the new filename
  setFormData((prev) => ({
    ...prev,
    rotaryJointInquiryItem:{
      ...prev.rotaryJointInquiryItem,
      referenceDrawing:data
    }
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
<AttachFileIcon style={{ fontSize: "16px" }} /> Reference Mechanical seal Drawing 
</button>
{(formData?.rotaryJointInquiryItem?.referenceDrawing || drInput) || (formData?.rotaryJointInquiryItem?.referenceDrawing && rjId) ? (
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
  let fileName = formData?.rotaryJointInquiryItem?.referenceDrawing; // Extract filename
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

{(drInput || (formData?.rotaryJointInquiryItem?.referenceDrawing))? (
  <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
      Uploaded File: {drInput?drInput:formData?.rotaryJointInquiryItem?.referenceDrawing}
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
          onClick={() => handleFileDelete("referenceDrawing")} >
          X
      </button>
  </p>
):null}


</Grid>

</Grid>
    </div>


    <Grid item xs={4} style={{display:"flex"}}>
      <Grid item xs={4}>

        {!rjId ? (<Button className="submit-btn" type="submit" style={{ margin: "20px" }} onClick={(e) => handleSubmit(e, formData, navigate)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" variant="contained" onClick={(e) => handleUpdate(e, formData, rjId, navigate)} >Update</Button>
            <Button className="cancel-btn" variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
      </Grid>
      <Grid item xs={4} style={{ margin: '12px 0px 0px 20px' }}>
  <PDFDownloadLink document={<PDFFile formData={formData} />} fileName="Rotaryjoint.pdf">
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
    {/* </form> */}
  </Container>
  );

}