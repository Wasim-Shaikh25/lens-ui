import React, { useState, useEffect, useRef } from 'react';
import { Table, TableHead, Grid, TableBody, TableRow,InputAdornment, FormControl,Select, TableCell, IconButton, Button, TextField, Container, Autocomplete, MenuItem } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getApi, handleSubmit } from '../../apis/ApiPlan';
import { useNavigate, useParams } from 'react-router-dom';
import { handleUpdate } from '../../apis/ApiPlan';
import './CreateApiPlan.css'
import { useAuth } from '../../contextApi/AuthContext';
import moment from 'moment';
import axiosInstance from '../../axios/axiosInstance';
import DownloadIcon from '@mui/icons-material/Download';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { PDFDownloadLink,Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import Logo from '../../assets/Picture1.png'
import SaveIcon from '@mui/icons-material/Save';




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
      instruments: [
        {
          requiredInstrumentOrLooseItem: "",
          makeOfInstrument: ""
        }
      ],
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
          instruments: [
            {
              requiredInstrumentOrLooseItem: "",
              makeOfInstrument: ""
            }
          ],
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


  const avlRef = useRef()
  const specRef = useRef()
  const atRef = useRef()


  const [avlInput,setAvlInput] = useState("")
  const [specInput,setSpecInput] = useState("")
  const [atRefInput,setAtRefInput] = useState("")


  const handleFileDelete = (fieldName)=>{

    setFormData({
      ...formData,
      [fieldName]:""
    })

    switch(fieldName){

      case "attachmentAvl":
        setAvlInput("");
        break;

      case "attachmentSpecification":
        setSpecInput("");
        break;
    case "attachmentReferenceMechanicalSealDrawing":
      setAtRefInput("");
        break;

        default:
          break;

    }

  }


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




 const handleFetch =  async(apiItem)=>{

  try {
    const {data} = await axiosInstance(`lens/salesInquiry/get?itemReferenceNo=${apiItem}`)

    console.log("response is ",data)
    setFormData({...formData,
      apiPlanInquiryItem:{...data?.apiPlanInquiry}
    })
    
  } catch (err) {
      console.log(err)
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



const handleInstrumentInputChange = (index, field, value) => {
  const updated = [...formData.instruments];
  updated[index][field] = value;
  setFormData((prev) => ({
    ...prev,
    instruments: updated
  }));
};


// Add a new row to the table
const addInstrumentRow = () => {
  setFormData((prev) => ({
    ...prev,
    instruments: [
      ...(prev.instruments || []),
      { requiredInstrumentOrLooseItem: '', makeOfInstrument: '' }
    ]
  }));
};



// Delete a row from the table
const deleteInstrumentRow = (index) => {
  const updatedInstruments = formData.instruments.filter((_, i) => i !== index);
  setFormData((prev) => ({
    ...prev,
    instruments: updatedInstruments
  }));
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
    width: 55,
    height: 55,
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
    fontSize: 11,
    borderTop:1,
    borderBottom:1,
    fontWeight: 'bold',
    paddingTop:5,
    paddingLeft:5,
    marginBottom:3
  },

  compDesc: {
    fontSize: 10,
    color: '#333',
    width:"100%"
  },

  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,         
    marginBottom: 8,        
    paddingLeft: 5,
    borderBottom: 1,
    paddingBottom: 4,      
  },
  
  section: {
    marginTop: 8,        
    marginBottom: 10,   
    flexDirection: 'column',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
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
    // flexWrap: 'wrap',
    marginBottom: 2
  },

  tableCellHeader: {
    width: '40%',
    padding: 4,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    wordBreak: 'break-word'
  },
   
  tableCell: {
    width: '60%',
    padding: 4,
    fontSize: 9,
    marginLeft:40,
    flexShrink: 1,        // allow shrink
    minWidth: 0,          // required in flex row
    flexWrap: 'wrap',     // allow wrap
    wordBreak: 'break-word',
    textOverflow: 'clip'  // safe fallback
  },

  subHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    textDecoration: 'underline'
  },

  leftSplitBox: {
    width: '50%',
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#000',
  },

  rightSplitBox: {
    width: '50%',
    borderStyle: 'solid',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  rightTopHeading: {
    fontSize: 12,
    fontWeight: 'bold',
  }

});



const PDFFile = ({ formData }) => (
  <Document>
    {/* PAGE 1 */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.compDetails}>
        <Image style={styles.logoImg} src={Logo} />
        <View style={styles.compSec}>
          <Text style={styles.title}>DRAWING REQUISITION FORM</Text>
          <Text style={styles.rightTopHeading}>API Plan DataSheet</Text>
          <Text style={styles.compDesc}>Leak-Proof® Engineering Pvt. Ltd.</Text>
        </View>
      </View>

      {/* General Info */}
      <View style={styles.section}>
        <Text style={styles.header}>General Information</Text>
        <View style={styles.table}>
          {[
            ['DRF Number', formData.drfNumber],
            ['Branch', formData.branch],
            ['Sales Inquiry Ref No.', formData.salesInquiryItemReferenceNo],
            ['Created By User', formData.createdByUser],
            ['Created On', formData.createdOn],
            ['Updated By User', formData.updatedByUser],
            ['Updated On', formData.updatedOn],
            ['Customer Name', formData.customerName],
            ['End User', formData.endUser],
            ['Costing Requirement', formData.costingRequirement],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Equipment Detail */}
      <View style={styles.section}>
        <Text style={styles.header}>Equipment Detail</Text>
        <View style={styles.table}>
          {[
            ['Make', formData.apiPlanInquiryItem.equipmentMake],
            ['Model', formData.apiPlanInquiryItem.equipmentModel],
            ['Type', formData.apiPlanInquiryItem.equipmentType],
            ['Arrangement', formData.apiPlanInquiryItem.arrangement],
            ['Tag Number', formData.apiPlanInquiryItem.tagNumber],
            ['Pump MOC', formData.apiPlanInquiryItem.pumpMOC],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Mechanical Seal Data */}
      <View style={styles.section}>
        <Text style={styles.header}>Mechanical Seal Data</Text>
        <View style={styles.table}>
          {[
            ['Drawing Number', formData.apiPlanInquiryItem.drawingNumber],
            ['Mechanical Seal Make', formData.apiPlanInquiryItem.mechanicalSealMake],
            ['Mechanical Seal Series', formData.apiPlanInquiryItem.mechanicalSealSeries],
            ['Connection Size', formData.apiPlanInquiryItem.connectionSize],
            ['Shaft Size', formData.apiPlanInquiryItem.shaftSize],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Operating Parameter */}
      <View style={styles.section}>
        <Text style={styles.header}>Operating Parameters</Text>
        <View style={styles.table}>
          {[
            ['Rotation', formData.apiPlanInquiryItem.rotation],
            ['MAWP', `${formData.apiPlanInquiryItem.mawp.value} ${formData.apiPlanInquiryItem.mawp.unit}`],
            ['MAWT', `${formData.apiPlanInquiryItem.mawt.value} ${formData.apiPlanInquiryItem.mawt.unit}`],
            ['Suction Pressure (Pump)', `${formData.apiPlanInquiryItem.suctionPressurePump.value} ${formData.apiPlanInquiryItem.suctionPressurePump.unit}`],
            ['Discharge Pressure (Pump)', `${formData.apiPlanInquiryItem.dischargePressurePump.value} ${formData.apiPlanInquiryItem.dischargePressurePump.unit}`],
            ['Box Pressure (Pump)', `${formData.apiPlanInquiryItem.boxPressurePump.value} ${formData.apiPlanInquiryItem.boxPressurePump.unit}`],
            ['Vessel Pressure (Agitator)', `${formData.apiPlanInquiryItem.vesselPressureAgitator.value} ${formData.apiPlanInquiryItem.vesselPressureAgitator.unit}`],
            ['Speed', formData.apiPlanInquiryItem.speed],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

    {/* PAGE 2 */}
   
      <View style={styles.section}>
        <Text style={styles.header}>Fluid Detail</Text>
        <View style={styles.table}>
          {[
            ['Fluid', formData.apiPlanInquiryItem.fluid],
            ['Operating Temperature', `${formData.apiPlanInquiryItem.operatingTemperature.value} ${formData.apiPlanInquiryItem.operatingTemperature.unit}`],
            ['Max Temperature', `${formData.apiPlanInquiryItem.maxTemperature.value} ${formData.apiPlanInquiryItem.maxTemperature.unit}`],
            ['Viscosity', formData.apiPlanInquiryItem.viscosity],
            ['Sp. Gravity', formData.apiPlanInquiryItem.spGravity],
            ['Percentage of Solid', formData.apiPlanInquiryItem.percentageOfSolid],
            ['Size of Solid particles', formData.apiPlanInquiryItem.solidSize],
            ['Freezing Point', formData.apiPlanInquiryItem.freezingPoint],
            ['Boiling Point', formData.apiPlanInquiryItem.boilingPoint],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Existing Seal Support System */}
      <View style={styles.section}>
        <Text style={styles.header}>Existing Seal Support System</Text>
        <View style={styles.table}>
          {[
            ['Make', formData.existingSealSupportMake],
            ['API Plan', formData.existingSealSupportApiPlan],
            ['Capacity', formData.existingSealSupportCapacity],
            ['Reference Api Plan Drawing Number', formData.existingSealSupportReferenceApiPlanDrawingNumber],
            ['Heat Exchange Type', formData.existingSealSupportHeatExchangeType],
            ['Heat Exchange Area', formData.existingSealSupportHeatExchangeArea],
            ['Standard', formData.existingSealSupportStandard],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Leak Proof Proposal */}
      <View style={styles.section}>
        <Text style={styles.header}>Leak Proof Proposal</Text>
        <View style={styles.table}>
          {[
            ['API Plan', formData.apiPlanInquiryItem.leakProofProposalApiPlan],
            ['Capacity', formData.apiPlanInquiryItem.capacity],
            ['Heat Exchange Type', formData.apiPlanInquiryItem.heatExchangeType],
            ['Heat Exchange Area', formData.apiPlanInquiryItem.heatExchangeArea],
            ['Standard', formData.apiPlanInquiryItem.standard],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* MOC */}
      <View style={styles.section}>
        <Text style={styles.header}>MOC</Text>
        <View style={styles.table}>
          {[
            ['Vessel', formData.mocVessel],
            ['Cooling Coil', formData.mocCoolingCoil],
            ['Piping and Fitting', formData.mocPipingAndFitting],
            ['Bladder', formData.mocBladder],
            ['Structural Parts', formData.mocStructuralParts],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Instruments */}
      <View style={styles.section}>
        <Text style={styles.header}>Instruments</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellHeader}>Required Instrument/Loose Item</Text>
            <Text style={styles.tableCellHeader}>Make of Instrument</Text>
          </View>
          {formData.instruments.map((item, idx) => (
            <View style={styles.tableRow} key={idx}>
              <Text style={styles.tableCell}>{item.requiredInstrumentOrLooseItem}</Text>
              <Text style={styles.tableCell}>{item.makeOfInstrument}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Other Details */}
      <View style={styles.section}>
        <Text style={styles.header}>Other Details</Text>
        <View style={styles.table}>
          {[
            ['Recommended Buffer or Barrier Fluid', formData.recommendedBufferOrBarrierFluid],
            ['Accessories', formData.accessories],
            ['Remarks', formData.remarks],
          ].map(([label, value]) => (
            <View style={styles.tableRow} key={label}>
              <Text style={styles.tableCellHeader}>{label}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      </Page>
   
  </Document>
);






console.log("formData is ",formData)

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


          <Grid item xs={4}>
  <TextField
    size="small"
    className="custom-text-field"
    label="Sales Inquiry Reference No."
    name="salesInquiryItemReferenceNo"
    value={formData.salesInquiryItemReferenceNo}
    onChange={handleChange()}
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
              name="createdByUser"
              value={formData?.createdByUser} // Set from login details
              
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
              onChange={handleChange()}
              
              fullWidth
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
              name="equipmentMake"
              value={formData.apiPlanInquiryItem.equipmentMake || ''}
          // onChange={handleChange("apiPlanInquiryItem")}
          disabled
          id="disableItem"
              
              fullWidth
            />
          </Grid>


          {/* Model */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Model"
              name="equipmentModel"
              value={formData.apiPlanInquiryItem?.equipmentModel || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>

          {/* Type */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Type"
              name="equipmentType"
              value={formData?.apiPlanInquiryItem.equipmentType || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.arrangement || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.tagNumber || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.pumpMOC || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.drawingNumber || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.mechanicalSealMake || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.mechanicalSealSeries || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.connectionSize || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.shaftSize || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.rotation || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>

          {/* MAWP */}
         <Grid item xs={4}>
         <TextField
    size="small"
    className="custom-text-field"
    disabled
    id="disableItem"
    name="mawp"
    value={formData.apiPlanInquiryItem?.mawp?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          mawp: {
            ...prev.apiPlanInquiryItem.mawp,
            value: newValue, // ✅ Correctly updates mawp.value
          },
        },
      }));
    }}
    label="Mawp"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small">
            <Select
              
              id="disableItem"
              value={formData.apiPlanInquiryItem?.mawp?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    mawp: {
                      ...prev.apiPlanInquiryItem.mawp,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.mawp?.value?.length} // ✅ Check if input has a value
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
          {!formData.apiPlanInquiryItem?.mawp&&<MenuItem>Unit</MenuItem>}
      
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
            disabled
            id="disableItem"
    size="small"
    className="custom-text-field"
    name="mawt"
    value={formData.apiPlanInquiryItem?.mawt?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          mawt: {
            ...prev.apiPlanInquiryItem.mawt,
            value: newValue, // ✅ Correctly updates mawp.value
          },
        },
      }));
    }}
    label="Mawt"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small">
            <Select
              
              id="disableItem"
              value={formData.apiPlanInquiryItem?.mawt?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    mawt: {
                      ...prev.apiPlanInquiryItem.mawt,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.mawt?.value?.length} // ✅ Check if input has a value
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

{!formData?.apiPlanInquiryItem.mawt&&<MenuItem>Unit</MenuItem>}
      
      <MenuItem value="C">℃</MenuItem>
      <MenuItem value="F">℉</MenuItem>
    
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
            disabled
            id="disableItem"
    size="small"
    className="custom-text-field"
    name="suctionPressurePump"
    value={formData.apiPlanInquiryItem?.suctionPressurePump?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          suctionPressurePump: {
            ...prev.apiPlanInquiryItem.suctionPressurePump,
            value: newValue, // ✅ Correctly updates mawp.value
          },
        },
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
              value={formData.apiPlanInquiryItem?.suctionPressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    suctionPressurePump: {
                      ...prev.apiPlanInquiryItem.suctionPressurePump,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.suctionPressurePump?.value?.length} // ✅ Check if input has a value
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

{!formData.apiPlanInquiryItem?.suctionPressurePump&&<MenuItem>Unit</MenuItem>}
      
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
            disabled
            id="disableItem"
    size="small"
    className="custom-text-field"
    name="dischargePressurePump"
    value={formData.apiPlanInquiryItem?.dischargePressurePump?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          dischargePressurePump: {
            ...prev.apiPlanInquiryItem.dischargePressurePump,
            value: newValue, // ✅ Correctly updates mawp.value
          },
        },
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
              value={formData.apiPlanInquiryItem?.dischargePressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    dischargePressurePump: {
                      ...prev.apiPlanInquiryItem.dischargePressurePump,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.dischargePressurePump?.value?.length} // ✅ Check if input has a value
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
              }} >

{!formData.apiPlanInquiryItem?.dischargePressurePump&&<MenuItem>Unit</MenuItem>}
      
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
                     disabled
                     id="disableItem"
    size="small"
    className="custom-text-field"
    name="boxPressurePump"
    value={formData.apiPlanInquiryItem?.boxPressurePump?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          boxPressurePump: {
            ...prev.apiPlanInquiryItem.boxPressurePump,
            value: newValue, // ✅ Correctly updates mawp.value
          },
        },
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
              value={formData.apiPlanInquiryItem?.boxPressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    boxPressurePump: {
                      ...prev.apiPlanInquiryItem.boxPressurePump,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.boxPressurePump?.value?.length} // ✅ Check if input has a value
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

{!formData.apiPlanInquiryItem?.boxPressurePump&&<MenuItem>Unit</MenuItem>}
      
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
              value={formData.apiPlanInquiryItem.speed || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>

          {/* Vessel Pressure (Agitator) */}

<Grid item xs={4}>
<TextField
  disabled
  id="disableItem"
    size="small"
    className="custom-text-field"
    name="vesselPressureAgitator"
    value={formData.apiPlanInquiryItem?.vesselPressureAgitator?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          vesselPressureAgitator: {
            ...prev.apiPlanInquiryItem.vesselPressureAgitator,
            value: newValue, // ✅ Correctly updates mawp.value
          },
        },
      }));
    }}
    label="Vessel Pressure (Agitator)"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small">
            <Select
              
              id="disableItem"
              value={formData.apiPlanInquiryItem?.boxPressurePump?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    vesselPressureAgitator: {
                      ...prev.apiPlanInquiryItem.vesselPressureAgitator,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.vesselPressureAgitator?.value?.length} // ✅ Check if input has a value
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

{!formData.apiPlanInquiryItem?.vesselPressureAgitator&&<MenuItem>Unit</MenuItem>}
      
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
              value={formData.apiPlanInquiryItem?.fluid || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>

          {/* Op. Temperature */}
          <Grid item xs={4}>
          <TextField
    size="small"
    disabled
    id="disableItem"
    className="custom-text-field"
    name="operatingTemperature"
    value={formData.apiPlanInquiryItem?.operatingTemperature?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          operatingTemperature: {
            ...prev.apiPlanInquiryItem.operatingTemperature,
            value: newValue, // ✅ Correctly updates mawp.value
          },
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
              value={formData.apiPlanInquiryItem?.operatingTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    operatingTemperature: {
                      ...prev.apiPlanInquiryItem.operatingTemperature,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.operatingTemperature?.value?.length} // ✅ Check if input has a value
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
{!formData.apiPlanInquiryItem?.operatingTemperature?.value&&<MenuItem>Unit</MenuItem>}
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
    )
  }}
/>
</Grid>

          {/* Max Temperature */}
          <Grid item xs={4}>
          <TextField
            disabled
            id="disableItem"
    size="small"
    className="custom-text-field"
    name="maxTemperature"
    value={formData.apiPlanInquiryItem?.maxTemperature?.value || ""}
    onChange={(e) => {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        apiPlanInquiryItem: {
          ...prev.apiPlanInquiryItem,
          maxTemperature: {
            ...prev.apiPlanInquiryItem.maxTemperature,
            value: newValue, 
          },
        },
      }));
    }}
    label="Max Temprature"
    fullWidth
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <FormControl size="small">
            <Select
              
              id="disableItem"
              value={formData.apiPlanInquiryItem?.maxTemperature?.unit || ""}
              onChange={(e) => {
                const selectedUnit = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  apiPlanInquiryItem: {
                    ...prev.apiPlanInquiryItem,
                    maxTemperature: {
                      ...prev.apiPlanInquiryItem.maxTemperature,
                      unit: selectedUnit, // ✅ Correctly updates mawp.unit
                    },
                  },
                }));
              }}
              displayEmpty
              disabled={!formData.apiPlanInquiryItem?.maxTemperature?.value?.length} // ✅ Check if input has a value
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

{!formData.apiPlanInquiryItem?.maxTemperature&&<MenuItem>Unit</MenuItem>}
{["kg/cm2", "kg/cm2 a", "kg/cm2 g", "bar", "bar (a)", "bar (g)", "Mpa", "Mpa (a)", "Mpa (g)", "Kpa", "Kpa (g)", "PSI", "PSIG", "MLC", "MWC", "Meter", "kgf/cm2"].map((unit) => (
                <MenuItem key={unit} value={unit}>
                  {unit}
                </MenuItem>
              ))}
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
              value={formData.apiPlanInquiryItem.viscosity || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem?.spGravity || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem.percentageOfSolid || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>

          {/* Size of Solid Particles */}
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Size of Solid Particles"
              name="solidSize"
              value={formData.apiPlanInquiryItem.solidSize || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem.freezingPoint || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
              value={formData.apiPlanInquiryItem.boilingPoint || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Make"
              name="existingSealSupportMake"
              value={formData.existingSealSupportMake || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="API Plan"
              name="existingSealSupportApiPlan"
              value={formData.existingSealSupportApiPlan || ''}
              onChange={handleChange()}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Capacity"
              name="existingSealSupportCapacity"
              value={formData.existingSealSupportCapacity || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Reference API Plan Drawing Number"
              name="existingSealSupportReferenceApiPlanDrawingNumber"
              value={formData.existingSealSupportReferenceApiPlanDrawingNumber || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Type"
              name="existingSealSupportHeatExchangeType"
              value={formData.existingSealSupportHeatExchangeType || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Area"
              name="existingSealSupportHeatExchangeArea"
              value={formData.existingSealSupportHeatExchangeArea || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
          <Autocomplete
            style={{ width: '100%' }}
            size="small"
        value={formData?.existingSealSupportStandard || ""}
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                existingSealSupportStandard:newValue,
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


      {/* Existing-seal-support-system-data - End  */}


      {/* Leak Proof Proposal -  Start*/}

      <div className="card">
        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Leak Proof Proposal :-</div></div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="API Plan"
              name="leakProofProposalApiPlan"
              value={formData.apiPlanInquiryItem.leakProofProposalApiPlan || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Capacity"
              name="capacity"
              value={formData.apiPlanInquiryItem.capacity || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Type"
              name="heatExchangeType"
              value={formData.apiPlanInquiryItem.heatExchangeType || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Heat Exchange Area"
              name="heatExchangeArea"
              value={formData.apiPlanInquiryItem.heatExchangeArea || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              select
              size="small"
              className="custom-text-field"
              label="Standard"
              name="standard"
              value={formData.apiPlanInquiryItem.standard || ''}
              // onChange={handleChange("apiPlanInquiryItem")}
              disabled
              id="disableItem"
              
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
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Vessel"
              name="mocVessel"
              value={formData.mocVessel || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Cooling Coil"
              name="mocCoolingCoil"
              value={formData.mocCoolingCoil || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Piping and Fitting"
              name="mocPipingAndFitting"
              value={formData.mocPipingAndFitting || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Bladder"
              name="mocBladder"
              value={formData.mocBladder || ''}
              onChange={handleChange()}
              
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              className="custom-text-field"
              label="Structural Parts"
              name="mocStructuralParts"
              value={formData.mocStructuralParts || ''}
              onChange={handleChange()}
              
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
  {formData?.instruments?.map((instrument, index) => (
    <TableRow key={index}>
      {/* Required Instruments Input */}
      <TableCell>
      <TextField
  value={instrument.requiredInstrumentOrLooseItem || ""}
  onChange={(e) => handleInstrumentInputChange(index, "requiredInstrumentOrLooseItem", e.target.value)}
  fullWidth
  placeholder={`Enter Required or loose Item ${index+1}` }

            size="small"
            className="custom-text-field"
/>
      </TableCell>

      {/* Make of Instruments Input */}
      <TableCell>
      <TextField
  value={instrument.makeOfInstrument || ""}
  onChange={(e) => handleInstrumentInputChange(index, "makeOfInstrument", e.target.value)}
  fullWidth
  placeholder={`Enter Make of Instrument ${index+1}` }
            size="small"
            className="custom-text-field"
/>
      </TableCell>

      {/* Delete Row Button */}
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
    e.currentTarget.style.backgroundColor = '#3e3e3e';
    e.currentTarget.style.transform = 'scale(1.03)';
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
          <Grid item xs={6}>
  <TextField
    className="custom-text-field"
    label="Recommended Buffer or Barrier Fluid (Limit of 150 Characters)"
    name="recommendedBufferOrBarrierFluid"
    value={formData.recommendedBufferOrBarrierFluid || ''}
    onChange={handleChange()}
    multiline
    rows={3} // Allows multiple lines
    inputProps={{ maxLength: 150 }}
    helperText={`${formData.recommendedBufferOrBarrierFluid?.length || 0} / 150`}
    size="small"
    fullWidth
  />
</Grid>

<Grid item xs={6}>
  <TextField
    className="custom-text-field"
    label="Accessories (Limit of 150 Characters)"
    name="accessories"
    value={formData.accessories || ''}
    onChange={handleChange()}
    multiline
    rows={3} // Allows multiple lines
    inputProps={{ maxLength: 150 }}
    helperText={`${formData.accessories?.length || 0} / 150`}
    size="small"
    fullWidth
  />
</Grid>

<Grid item xs={8}>
  <TextField
    className="custom-text-field"
    label="Remarks (Limit of 150 Characters)"
    name="remarks"
    value={formData.remarks || ''}
    onChange={handleChange()}
    multiline
    rows={3} // Allows multiple lines
    inputProps={{ maxLength: 150 }}
    helperText={`${formData.remarks?.length || 0} / 150`}
    size="small"
    fullWidth
  />
</Grid>
</Grid>

<div className="MuiBox-root css-2e6lci">
          <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle">
            <g>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </g>
          </svg>
          <div className="MuiBox-root css-1isemmb">Attachments</div>
        </div>

        <Grid container spacing={2}>

          {/* Attachments */}
          <Grid item xs={6}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={avlRef}
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
            setAvlInput(data);
        
            // ✅ Update `rotaryJointInquiries[index]` with the new filename
            setFormData((prev) => ({
              ...prev,
              attachmentAvl:data
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
          width: "100%",
        }}
        onClick={() => avlRef.current.click()} // Trigger file input
      >
        <AttachFileIcon style={{ fontSize: "16px" }} /> AVL
      </button>
      {(avlInput) || (formData?.attachmentAvl&&apId) ? (
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
            let fileName = formData?.attachmentAvl; // Extract filename
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

  {(avlInput || formData.attachmentAvl) ? (
            <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {avlInput ? avlInput: formData.attachmentAvl }
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
                    onClick={() => handleFileDelete("attachmentAvl")} >
                    X
                </button>
            </p>
      ):null}
</Grid>



<Grid item xs={6}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={specRef}
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
            setSpecInput(data);
        
            // ✅ Update `rotaryJointInquiries[index]` with the new filename
            setFormData((prev) => ({
              ...prev,
              attachmentSpecification:data
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
        onClick={() => specRef.current.click()} // Trigger file input
      >
        <AttachFileIcon style={{ fontSize: "16px" }} /> Specification 
      </button>
      {(formData?.attachmentSpecification &&specInput) || (formData?.attachmentSpecification&&apId) ? (
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
            let fileName = formData?.attachmentSpecification; // Extract filename
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

  {(specInput || formData.attachmentSpecification) ? (
            <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {specInput?specInput:formData.attachmentSpecification}
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
                    onClick={() => handleFileDelete("attachmentSpecification")} >
                    X
                </button>
            </p>
      ):null}


</Grid>




<Grid item xs={6}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={atRef}
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
            setAtRefInput(data);
        
            // ✅ Update `rotaryJointInquiries[index]` with the new filename
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
        onClick={() => atRef.current.click()} // Trigger file input
      >
        <AttachFileIcon style={{ fontSize: "16px" }} /> Reference Mechanical seal Drawing 
      </button>
      {(formData?.attachmentReferenceMechanicalSealDrawing &&atRefInput) || (formData?.attachmentReferenceMechanicalSealDrawing && apId) ? (
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
            let fileName = formData?.attachmentReferenceMechanicalSealDrawing; // Extract filename
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

  {(atRefInput || (formData.attachmentReferenceMechanicalSealDrawing))? (
            <p style={{ marginTop: "8px", fontSize: "11px", color: "black", fontWeight: "bold" }}>
                Uploaded File: {atRefInput?atRefInput:formData.attachmentReferenceMechanicalSealDrawing}
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
                    onClick={() => handleFileDelete("attachmentReferenceMechanicalSealDrawing")} >
                    X
                </button>
            </p>
      ):null}


</Grid>

        </Grid>



      </div>


      {/* Instruments -  End  */}

      <Grid item xs={4} style={{display:"flex"}}>
          <Grid item xs={4}>

            {!apId ? (<Button className="submit-btn" type="submit" onClick={(e) => handleSubmit(e, formData, navigate)} variant="contained" >Submit</Button>) : (
              <>
                <Button className="update-btn" variant="contained" disabled={authState?.sub !== formData.createdByUser } onClick={(e) => handleUpdate(e, formData, navigate, apId)} >Update</Button>
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



