import React, { useState, useEffect } from 'react';
import { TextField ,Tabs, Tab, Box, Button,  Container, Grid, Typography , Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
import { useAuth } from '../../contextApi/AuthContext';
// import { getBranches } from '../../apis/SignupApi';
import PersonIcon from "@mui/icons-material/Person";
import { handleSubmit, getOfm, handleUpdate } from '../../apis/OfmApi';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import axiosInstance from '../../axios/axiosInstance';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers';




export default function CreateOfm() {

  const navigate = useNavigate();
  let {oId} = useParams();
  const cbranch= ['exports'];
  const prOptions= ['High','Medium','Low'];
  const ivOptions= ['Customer'];
  const ftOptions= ['Agitator Seal', 'Pump Seal', 'Other Seal'];
  const oType = ['Regular', 'Annual rate Contract', 'Tender'];
  const catOptions = ["API Plan", "Grafoil", "Mechanical Seal", "Re-conditioning","Rotary Joints"]
  const ptOptions = ['Air Frieght', 'Courier', 'Hand Delivery', 'Insured Registered post Parcel', 'Rail','Sea','Speed Post','Value Payable Parcel']
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const [inspection, setInspection] = useState(oId!==undefined);
  const [insurance, setInsurance] = useState(oId!==undefined);
  const { authState } = useAuth();

 
  const [formData, setFormData] = useState({
  
    // General Section
    branch: "",
    poNo: "",
    orderType: "",
    qutationNumber:"",
    category: "",
    invoiceTo: "",
    transportThrough: "",
    customer: "",
    quotationNo: "",
    kindAttentionTo: "",
    customerAddress: "",
    priority: "",
    transport: "",
    deliveryPeriod: "",
    preQANo: "",
    preQADate: null,           // ✅ added - datetime
    ofmDate: null,             // ✅ added - datetime
    poDate: null,              // ✅ added - datetime
    statutoryRegulatoryRequirements: "",
    specialInformation: "",
    paymentTerms: "",
    engineer: "",
    oaNo: "",
    industry: "",
    projectOrder: "",
    penaltyApplicable: "",
    location:"",
    poReceived: "",


    // Insurance
    insurance: "",             // ✅ added - boolean
    rawMaterialTC: "",
    qcReport: "",
    testReport: "",
    guaranteeCertificate: "",
    fitmentCertificate: "",
    complianceCertificate: "",
    otherCharges: "",          // ✅ added - string
    discount: "",               // ✅ added - number

    // Consignee
    ofmStatus: "",
    externalInspection: inspection,
    externalInspectionWhere: "",
    externalInspectionByWhom: "",
    consigneeName: "",
    consigneeAddress: "",      // ✅ added - string
    insertedByUserId: "",
    lastUpdatedByUserId: "",
    insuranceBy: "",
    insuranceBorneBy: "",
    company: "",
    qapRequired: "",
    oaDate: null,              // ✅ fixed - was "" now null (datetime)

    // Metadata
    createdOn: null,           // ✅ added - datetime
    updatedOn: null,           // ✅ added - datetime
    createdByUser: "",         // ✅ added - string
    updatedByUser: "",         // ✅ added - string
      grandTotalListPrice:"",
    endUserDetail: {
      branch: "",
      customerName:"",
      place: "",
      contactPersonName: "",
      mobileNumber: "",
      emailId: "",
      endUserIndustry: "",
      knots: ""
    },
    ofmItems: [
     {
       srNo: "",
       header: "",        
       factor: "",
       face: "",
       type: "",
       size: "",
       description: "",
       ciCode: "",
       lpItemCode: "",    
       drfNo: "",
       drawingNo: "",     
       quantity: "",
       bookedQuantity: "", 
       unit: "",
       unitPrice: "",
       unitLPrice: "",
       discount: "",
       naDrgNo: true,
       totalValue: "",
       totalListValue: ""  
     }
   ]
   });
   
 


    // useEffect(() => {
    //   if (!isInitialized) {
    //     // Initialize formData or perform any setup needed
    //     setIsInitialized(true);
    //   }
    // }, [isInitialized, savedItems]);
  
  
  useEffect(()=>{
    if(oId!==undefined){
    getOfm(oId, setFormData,setSavedItems)
  


  }else{

      setFormData({
  
        // General Section
        branch: "",
        poNo: "",
        orderType: "",
        qutationNumber:"",
        category: "",
        invoiceTo: "",
        transportThrough: "",
        customer: "",
        quotationNo: "",
        kindAttentionTo: "",
        customerAddress: "",
        priority: "",
        transport: "",
        deliveryPeriod: "",
        preQANo: "",
        preQADate: null,           // ✅ added - datetime
        ofmDate: null,             // ✅ added - datetime
        poDate: null,              // ✅ added - datetime
        statutoryRegulatoryRequirements: "",
        specialInformation: "",
        paymentTerms: "",
        engineer: "",
        oaNo: "",
        industry: "",
        projectOrder: "",
        penaltyApplicable: "",
        location:"",
        poReceived: "",
    
    
        // Insurance
        insurance: "",             // ✅ added - boolean
        rawMaterialTC: "",
        qcReport: "",
        testReport: "",
        guaranteeCertificate: "",
        fitmentCertificate: "",
        complianceCertificate: "",
        otherCharges: "",          // ✅ added - string
        discount: "",               // ✅ added - number
    
        // Consignee
        ofmStatus: "",
        externalInspection: inspection,
        externalInspectionWhere: "",
        externalInspectionByWhom: "",
        consigneeName: "",
        consigneeAddress: "",      // ✅ added - string
        insertedByUserId: "",
        lastUpdatedByUserId: "",
        insuranceBy: "",
        insuranceBorneBy: "",
        company: "",
        qapRequired: "",
        oaDate: null,              // ✅ fixed - was "" now null (datetime)
    
        // Metadata
        createdOn: null,           // ✅ added - datetime
        updatedOn: null,           // ✅ added - datetime
        createdByUser: "",         // ✅ added - string
        updatedByUser: "",         // ✅ added - string
         grandTotalListPrice:"",
    
        endUserDetail: {
          branch: "",
          customerName:"",
          place: "",
          contactPersonName: "",
          mobileNumber: "",
          emailId: "",
          endUserIndustry: "",
          knots: ""
        },
        ofmItems: [
         {
           srNo: "",
           header: "",        
           factor: "",
           face: "",
           type: "",
           size: "",
           description: "",
           ciCode: "",
           lpItemCode: "",    
           drfNo: "",
           drawingNo: "",     
           quantity: "",
           bookedQuantity: "", 
           unit: "",
           unitPrice: "",
           unitLPrice: "",
           discount: "",
           totalValue: "",
           naDrgNo: true,
           totalListValue: ""  
         }
       ]
       });
  setSavedItems([]);
  
}
 },[oId])


  useEffect(()=>{
    console.log("Saved Items is ",savedItems)
  },[savedItems])


  



  const handleChange = (e, index) => {
    // If event is Moment/date value (no e.target)
    if (!e?.target) {
      const newFormData = { ...formData };
      newFormData.poDate = e ? e.toISOString() : null;   // format & store
      setFormData(newFormData);
      return;
    }
  
    const { name, type, checked, value } = e.target;
    const newFormData = { ...formData };
    
    console.log("name is ",name, " Type is ", type)
    if (type === "checkbox") {
      newFormData[name] = checked;
    } else if (type === "radio" && name === "statutoryRegulatoryRequirements") {
      newFormData[name] = value === "true";
    }else if (type === "radio" && name === "qapRequired") {
      newFormData[name] = value === "true";

    }
    else if (name === "warranty" || name === "guarantee") {
      newFormData.guarantee = name === "guarantee" ? value : "";
      newFormData.warranty = name === "warranty" ? value : "";
    } else if (index === undefined) {
      newFormData[name] = value;
    } else {
      newFormData.ofmItems[index] = {
        ...newFormData.ofmItems[index],
        [name]: value
      };
    }
  
    setFormData(newFormData);
    console.log("Updated form data:", newFormData);
  };

  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.ofmItems];
  
    if (["quantity", "unitPrice", "unitLPrice", "discount", "bookedQuantity"].includes(field)) {
      value = Number(value);
    }
  
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
  
    const {
      quantity,
      bookedQuantity,
      unitPrice,
      unitLPrice,
      discount
    } = updatedItems[index];
  
    // Use bookedQuantity if filled, else fall back to quantity
    const effectiveQty = Number(bookedQuantity) > 0
      ? Number(bookedQuantity)
      : Number(quantity);
  
    const discountRate = Number(discount) || 0;
  
    // totalValue = effectiveQty × unitPrice - discount%
    const gross = effectiveQty * Number(unitPrice);
    const net = gross - (gross * discountRate) / 100;
    updatedItems[index].totalValue = isNaN(net) ? "" : Number(net.toFixed(2));
  
    // totalListValue = effectiveQty × unitLPrice - discount%
    const grossList = effectiveQty * Number(unitLPrice);
    const netList = grossList - (grossList * discountRate) / 100;
    updatedItems[index].totalListValue = isNaN(netList) ? "" : Number(netList.toFixed(2));
  
    // Recalculate grand totals across all items
    const grandTotal = updatedItems.reduce(
      (sum, it) => sum + (Number(it.totalValue) || 0), 0
    );
    const grandTotalListPrice = updatedItems.reduce(
      (sum, it) => sum + (Number(it.totalListValue) || 0), 0
    );
  
    // Also apply global discount if already set
    const globalDiscount = Number(formData.discount) || 0;
    const finalGrandTotal = grandTotal - (grandTotal * globalDiscount) / 100;
    const finalGrandListTotal = grandTotalListPrice - (grandTotalListPrice * globalDiscount) / 100;
  
    setFormData({
      ...formData,
      ofmItems: updatedItems,
      grandTotal: Number(finalGrandTotal.toFixed(2)),
      grandTotalListPrice: Number(finalGrandListTotal.toFixed(2)),
    });
  };


  
const addItem = () => {
  const newItem = {
    srNo: formData.ofmItems.length + 1,
    header: "",
    factor: "",
    face: "",
    type: "",
    size: "",
    description: "",
    ciCode: "",
    lpItemCode: "",
    drfNo: "",
    drawingNo: "",
    quantity: "",
    bookedQuantity: "",
    unit: "",
    unitPrice: "",
    unitLPrice: "",
    discount: "",
    naDrgNo: "",         // "" | "NA" | "DRG"
    totalValue: "",
    totalListValue: "",
  };
  console.log("added item is ",newItem)
  setFormData((prev) => ({
    ...prev,
    ofmItems: [...prev.ofmItems, newItem],
  }));
};

  
const removeItem = (index) => {
  const updated = formData.ofmItems
    .filter((_, i) => i !== index)
    .map((item, i) => ({ ...item, srNo: i + 1 }));

  const grandTotal = updated.reduce((sum, it) => sum + (Number(it.totalValue) || 0), 0);
  const grandTotalListPrice = updated.reduce((sum, it) => sum + (Number(it.totalListValue) || 0), 0);

  setFormData({
    ...formData,
    ofmItems: updated,
    grandTotal: Number(grandTotal.toFixed(2)),
    grandTotalListPrice: Number(grandTotalListPrice.toFixed(2)),
  });
};
  

  const handleDeleteItems = index => {
    setFormData(prevState => {
      const newItemDetails = [...prevState.ofmItems];
      newItemDetails.splice(index, 1);
      return { ...prevState, ofmItems: newItemDetails };
    });
  };


  const handleSaveItem = (index) => {
    // Save the current item to the savedItems array
    const newSavedItems = [...savedItems, formData.ofmItems[index]];
    console.log("SaveItems is ", newSavedItems)
    setSavedItems(newSavedItems);

    formData.ofmItems[index]={
          srNo: "",
          header: "",        
          factor: "",
          face: "",
          type: "",
          size: "",
          description: "",
          ciCode: "",
          lpItemCode: "",    
          drfNo: "",
          drawingNo: "",     
          quantity: "",
          bookedQuantity: "", 
          unit: "",
          unitPrice: "",
          unitLPrice: "",
          discount: "",
          naDrgNo: true,
          totalValue: "",
          totalListValue: ""  
        }

    console.log("Saved items:", newSavedItems);
};

  
  

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  console.log("tab No is ",selectedTab)

  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }


  const handleEditItem = (index) => {
    const itemToEdit = savedItems[index];


    const items = [...formData.ofmItems];
    items[0] = itemToEdit;
    setFormData({ ...formData, ofmItems:items });
     // Update the first item in the ofmItems array
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };


  const handleDelete = (index) => {
    const updatedItems = savedItems.filter((_, i) => i !== index);
    setSavedItems(updatedItems);
  };




  return (

<Container className="container" sx={{ marginTop: "20px", backgroundColor: "rgb(250, 251, 251)" }}>
  <form onSubmit={handleSubmit}>
    <div className="card">
      {!oId ? <h1>OFM</h1> : <h1>Update OFM</h1>}

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        underline="none"
        indicatorColor="transparent"
        textColor="primary"
        centered
      >
        <Tab icon={<PersonIcon />} label="General" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Other" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Items & Charges" iconPosition="start" />
      </Tabs>

      <Grid container spacing={2} sx={{ marginTop: "0.5rem" }}>
        {selectedTab === 0 && (
          <>

<Grid item xs={4}>
                <TextField
                disabled
                id="disableItem"
                name="ofmNo"
                  label="Ofm Number"
                  size="small"
                  fullWidth
                  className="custom-text-field"
                  variant="outlined"
                  value={formData.ofmNo}
                />
              </Grid>

             <Grid item xs={4}>


{/* <InputLabel className="ip-label"> Branch</InputLabel > */}
<Autocomplete
  size="small"
  value={formData.branch || ''}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      branch: newValue || ''
    });
  }}
  inputValue={formData.branch || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      branch: newInputValue || ''
    });
  }}

  options={Array.isArray(authState?.branchs) ? authState.branchs.map((b) => b.branchName) : []}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Branch"
      className="custom-text-field"
      placeholder='select a branch'
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
                label="Quotation Transfer"
                name="qutationNumber"
                value={formData.qutationNumber}
                onChange={(e) => handleChange(e)}
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
                      disabled={!formData.qutationNumber}
                      //onClick={} // Your function here
                    >
                      Fetch
                    </Button>
                  )
                }}
              />
            </Grid>


<Grid item xs={4}>
<Autocomplete
  size="small"
  value={formData.company || ''}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      company: newValue || ''
    });
  }}
  inputValue={formData.company || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      company: newInputValue || ''
    });
  }}

  options={["Leak-Proof Engineering (I) Pvt. Ltd.","Test"].map((cat) => cat)}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Company"
      className="custom-text-field"
      placeholder='transaction Type'
      variant="outlined"
      fullWidth
    />
  )}
/>
</Grid> 


            

            <Grid item xs={4}>
              <TextField
                label="PoNo"
                size="small"
                fullWidth
                name="poNo"
                className="custom-text-field"
                variant="outlined"
                value={formData.poNo}
                onChange={handleChange}
              />
            </Grid>


            <Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="PO Date"
      value={formData.poDate ? moment(formData.poDate) : null}
      format="DD-MMM-YYYY"
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field",
        }
      }}
    />
  </LocalizationProvider>
</Grid>




<Grid item xs={4}>
<Autocomplete
  size="small"
  value={formData.orderType || ''}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      orderType: newValue || ''
    });
  }}
  inputValue={formData.orderType || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      orderType: newInputValue || ''
    });
  }}

  options={["ARC","Regular","Tender"].map((type) => type)}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Order Type"
      className="custom-text-field"
      placeholder='select a Order Type'
      variant="outlined"
      fullWidth
    />
  )}
/>
</Grid>

            <Grid item xs={4}>
              <TextField
                label="Delivery Period"
                fullWidth
                name="deliveryPeriod"
                className="custom-text-field"
                size="small"
                variant="outlined"
                value={formData.deliveryPeriod}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
  <FormControl component="fieldset">
    <FormLabel component="legend" style={{ fontSize: '0.75rem' }}>
      Statutory & Regulatory Requirements
    </FormLabel>
    <RadioGroup
      row
      name="statutoryRegulatoryRequirements"
      value={
        formData.statutoryRegulatoryRequirements === true
          ? "yes"
          : formData.statutoryRegulatoryRequirements === false
          ? "no"
          : ""
      }
      onChange={(e) =>
        handleChange({
          target: {
            name: "statutoryRegulatoryRequirements",
            value: e.target.value === "yes" ? true : false,
          },
        })
      }
    >
      <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
      <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
    </RadioGroup>
  </FormControl>
</Grid>
            <Grid item xs={4}>
              <TextField
                label="Transport Through"
                size="small"
                fullWidth
                name="transportThrough"
                className="custom-text-field"
                variant="outlined"
                value={formData.transportThrough}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Location"
                name="location"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="End Username"
                size="small"
                fullWidth
                name="endUserName"
                className="custom-text-field"
                variant="outlined"
                value={formData.endUserName}
                onChange={handleChange}
              />
            </Grid>

           

            <Grid item xs={4}>
              <TextField
                label="Customer"
                size="small"
                fullWidth
                name="customer"
                className="custom-text-field"
                variant="outlined"
                value={formData.customer}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="kindAttention To"
                size="small"
                fullWidth
                name="kindAttentionTo"
                className="custom-text-field"
                variant="outlined"
                value={formData.kindAttentionTo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
  <FormControl component="fieldset">
    <FormLabel component="legend" style={{ fontSize: '0.75rem' }}>
      QAP Required
    </FormLabel>
    <RadioGroup
  row
  name="qapRequired"
  value={
    formData.qapRequired === true
      ? "true"
      : formData.qapRequired === false
      ? "false"
      : ""
  }
  onChange={(e) => handleChange(e)}  // just pass the event directly
>
  <FormControlLabel value="true" control={<Radio size="small" />} label="Yes" />
  <FormControlLabel value="false" control={<Radio size="small" />} label="No" />
</RadioGroup>
  </FormControl>
</Grid>

            <Grid item xs={6}>
              <TextField
                label="Customer Address"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline 
                name="customerAddress"
                rows={2}
                value={formData.customerAddress}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Pre QANo"
                size="small"
                fullWidth
                name="preQANo"
                className="custom-text-field"
                variant="outlined"
                value={formData.preQANo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="previous QA Date"
      value={formData.preQADate ? moment(formData.preQADate) : null}
      format="DD-MMM-YYYY"
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field",
        }
      }}
    />
  </LocalizationProvider>
</Grid>

            <Grid item xs={4}>
              <TextField
                label="Special Information"
                size="small"
                fullWidth
                name="specialInformation"
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={3}
                value={formData.specialInformation}
                onChange={handleChange}
              />
            </Grid>
 

            <Grid item xs={4}>
  <Autocomplete
    size="small"
    value={
      formData.projectOrder === true
        ? "Yes"
        : formData.projectOrder === false
        ? "No"
        : null
    }
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        projectOrder: newValue === "Yes" ? true : newValue === "No" ? false : null
      });
    }}
    options={["Yes", "No"]}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        label="Project Order"
        className="custom-text-field"
        placeholder="Select"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>

<Grid item xs={4}>
  <Autocomplete
    size="small"
    value={
      formData.penaltyApplicable === true
        ? "Yes"
        : formData.penaltyApplicable === false
        ? "No"
        : null
    }
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        penaltyApplicable: newValue === "Yes" ? true : newValue === "No" ? false : null
      });
    }}
    options={["Yes", "No"]}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        label="Penalty Applicable"
        className="custom-text-field"
        placeholder="Select"
        variant="outlined"
        fullWidth
      />
    )}
  />
</Grid>

            <Grid item xs={4}>
<Autocomplete
  size="small"
  value={formData.insuranceBy || ''}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      insuranceBy: newValue || ''
    });
  }}
  inputValue={formData.insuranceBy || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      insuranceBy: newInputValue || ''
    });
  }}

  options={["By- Customer","By- Supplier"].map((type) => type)}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Insurance By"
      className="custom-text-field"
      placeholder='Insurance By'
      variant="outlined"
      fullWidth
    />
  )}
/>
</Grid>

            <Grid item xs={4}>
              <TextField
                label="PO Recieved"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                name="poReceived"
                value={formData.poReceived}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="Payment Terms"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                name="paymentTerms"
                rows={2}
                value={formData.paymentTerms}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Engineer"
                size="small"
                name="engineer"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.engineer}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="oaNo"
                size="small"
                fullWidth
                name="oaNo"
                className="custom-text-field"
                variant="outlined"
                value={formData.oaNo}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="PO Previous OA Date"
      value={formData.oaDate ? moment(formData.oaDate) : null}
      format="DD-MMM-YYYY"
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field",
        }
      }}
    />
  </LocalizationProvider>
</Grid>


            <Grid item xs={4}>
              <TextField
                label="Industry"
                size="small"
                fullWidth
                name="industry"
                className="custom-text-field"
                variant="outlined"
                value={formData.industry}
                onChange={handleChange}
              />
            </Grid>
          </>
        )}

        {selectedTab === 1 && (
          <>
        <Grid item xs={12}>
  <Box>
  
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
  Certificates
  </div>
</div>
    <Grid container>
      {[
        { label: "Raw Material TC", name: "rawMaterialTC" },
        { label: "QC Report", name: "qcReport" },
        { label: "Test Report", name: "testReport" },
        { label: "Guarantee Certificate", name: "guaranteeCertificate" },
        { label: "Fitment Certificate", name: "fitmentCertificate" },
        { label: "Compliance Certificate", name: "complianceCertificate" },
      ].map((item) => (
        <Grid item xs={4} key={item.name}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={formData[item.name] === true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [item.name]: e.target.checked,
                  })
                }
              />
            }
            label={<Typography variant="body2">{item.label}</Typography>}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
</Grid>

            <Grid item xs={6}>
              <TextField
                label="External Inspection Where"
                size="small"
                name="externalInspectionWhere"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.externalInspectionWhere}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="External Inspection By Whom"
                size="small"
                fullWidth
                name="externalInspectionByWhom"
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.externalInspectionByWhom}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Consignee Name"
                size="small"
                fullWidth
                name="consigneeName"
                className="custom-text-field"
                variant="outlined"
                value={formData.consigneeName}
                onChange={handleChange}
              />
            </Grid>


       

            <Grid item xs={3}>
              <TextField
                label="kind Attention to"
                size="small"
                fullWidth
                name="kindAttentionTo"
                className="custom-text-field"
                variant="outlined"
                value={formData.kindAttentionTo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Consignee Address"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                name="customerAddress"
                rows={2}
                value={formData.customerAddress}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="Invoice Name"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.consigneeName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="kind Attention to"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                value={formData.kindAttentionTo}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Invoice Address"
                size="small"
                fullWidth
                className="custom-text-field"
                variant="outlined"
                multiline
                rows={2}
                value={formData.customerAddress}
                onChange={handleChange}
                />
            </Grid>
            {/* ── End User Section ── */}
            <Grid item xs={12}>
<Box
  sx={{
    width: "100%",
    mt: 2,
    borderRadius: "7px",
    overflow: "hidden"
  }}
>

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
  End User (Select Management if No End-User Data)
  </div>
</div>

  {/* Fields */}
  <Grid container spacing={2} sx={{ px: 2, py: 2 }}>

    {/* Branch */}
    <Grid item xs={3}>
      <Autocomplete
        size="small"
        value={formData.endUserDetail.branch || ""}
        onChange={(event, newValue) => {
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              branch: newValue || ""
            }
          });
        }}
        inputValue={formData.endUserDetail.branch || ""}
        onInputChange={(event, newInputValue) => {
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              branch: newInputValue || ""
            }
          });
        }}
        options={
          Array.isArray(authState?.branchs)
            ? authState.branchs.map((b) => b.branchName)
            : []
        }
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Branch *"
            className="custom-text-field"
            variant="outlined"
            fullWidth
          />
        )}
      />
    </Grid>



    {/* Name */}
    <Grid item xs={3}>
      <TextField
        size="small"
        fullWidth
        label="Name"
        className="custom-text-field"
        variant="outlined"
        value={formData.endUserDetail.customerName || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              customerName: e.target.value
            }
          })
        }
      />
    </Grid>

    {/* Place */}
    <Grid item xs={3}>
      <TextField
        size="small"
        fullWidth
        label="Place"
        className="custom-text-field"
        variant="outlined"
        value={formData.endUserDetail.place || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              place: e.target.value
            }
          })
        }
      />
    </Grid>

    {/* Contact Person Name */}
    <Grid item xs={3}>
      <TextField
        size="small"
        fullWidth
        label="Contact Person Name"
        className="custom-text-field"
        variant="outlined"
        value={formData.endUserDetail.contactPersonName || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              contactPersonName: e.target.value
            }
          })
        }
      />
    </Grid>

    {/* Mobile */}
    <Grid item xs={3}>
      <TextField
        size="small"
        fullWidth
        label="Mobile"
        className="custom-text-field"
        variant="outlined"
        value={formData.endUserDetail.mobileNumber || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              mobileNumber: e.target.value
            }
          })
        }
      />
    </Grid>

    {/* Email */}
    <Grid item xs={3}>
      <TextField
        size="small"
        fullWidth
        label="Email"
        className="custom-text-field"
        variant="outlined"
        value={formData.endUserDetail.emailId || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              emailId: e.target.value
            }
          })
        }
      />
    </Grid>



        {/* Mobile */}
        <Grid item xs={3}>
      <TextField
        size="small"
        fullWidth
        label="EndUser Industry"
        className="custom-text-field"
        variant="outlined"
        value={formData.endUserDetail.endUserIndustry || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              endUserIndustry: e.target.value
            }
          })
        }
      />
    </Grid>

  


    {/* End-User Remarks */}
    <Grid item xs={4}>
      <TextField
        size="small"
        fullWidth
        label="End-User Remarks"
        className="custom-text-field"
        variant="outlined"
        multiline
        rows={2}
        value={formData.endUserDetail.remarks || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              remarks: e.target.value
            }
          })
        }
      />
    </Grid>
    {/* End-User Remarks */}
    <Grid item xs={4}>
      <TextField
        size="small"
        fullWidth
        label="End-User Knots"
        className="custom-text-field"
        variant="outlined"
        multiline
        rows={2}
        value={formData.endUserDetail.knots || ""}
        onChange={(e) =>
          setFormData({
            ...formData,
            endUserDetail: {
              ...formData.endUserDetail,
              knots: e.target.value
            }
          })
        }
      />
    </Grid>

  </Grid>
</Box>
</Grid>
                </>
        )}

{selectedTab === 2 && (
  <Box sx={{ width: "100%", px: 2 }}>

    {/* ── Saved Items Table ── */}
    {savedItems.length > 0 && (
      <TableContainer component={Paper} style={{ maxWidth: '97%', margin: '1em auto' }}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#000045" }}>
              <TableCell style={{ color: "white" }}>Sr No</TableCell>
              <TableCell style={{ color: "white" }}>Factor</TableCell>
              <TableCell style={{ color: "white" }}>Type</TableCell>
              <TableCell style={{ color: "white" }}>Size</TableCell>
              <TableCell style={{ color: "white" }}>Description</TableCell>
              <TableCell style={{ color: "white" }}>Unit Price (₹)</TableCell>
              <TableCell style={{ color: "white" }}>Total Value (₹)</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedItems.map((si, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{si.factor}</TableCell>
                <TableCell>{si.type}</TableCell>
                <TableCell>{si.size}</TableCell>
                <TableCell>{si.description}</TableCell>
                <TableCell>{si.unitPrice}</TableCell>
                <TableCell>{si.totalValue}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    style={{
                      maxWidth: '50px',
                      maxHeight: '25px',
                      backgroundColor: '#000050',
                      color: 'white',
                      marginRight: '10px',
                      fontSize: '0.7rem'
                    }}
                    onClick={() => handleEditItem(i)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    style={{
                      maxWidth: '50px',
                      maxHeight: '25px',
                      backgroundColor: 'red',
                      color: 'white',
                      fontSize: '0.7rem'
                    }}
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}

    {/* ── Add Item Header Bar ── */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2, py: 1,
        background: "linear-gradient(90deg, #f5f7fa, #e9eef5)",
        border: "1px solid #d6dce5",
        borderRadius: "6px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        my: 1.5
      }}
    >
      <Typography sx={{ fontWeight: 600, fontSize: "1rem", color: "#1f2937" }}>
        Items
      </Typography>
      <Button
        variant="contained"
        size="small"
        onClick={addItem}
        sx={{
          textTransform: "none",
          fontSize: "0.8rem",
          fontWeight: 600,
          px: 2, py: "4px",
          backgroundColor: "black",
          boxShadow: "0 2px 4px rgba(37,99,235,0.3)",
          "&:hover": { backgroundColor: "#1a1a1a" }
        }}
      >
        + Add Item
      </Button>
    </Box>

    {/* ── Items Form Loop ── */}
    {formData.ofmItems.map((item, index) => (
      <Grid
        container
        spacing={2}
        key={index}
        style={{
          maxWidth: '100%',
          margin: '8px 0',
          border: "1px solid #C4C4C4",
          borderRadius: "7px",
          paddingRight:"10px",
          paddingBottom:"12px",
          backgroundColor: "#fff"
        }}
      >
        {/* Item Label */}
        <Grid item xs={12}>
          <div className="MuiBox-root css-2e6lci">
            <svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="feather feather-alert-circle">
              <g>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </g>
            </svg>
            <div className="MuiBox-root css-1isemmb">OFM Item : {index + 1}</div>
          </div>
        </Grid>

        {/* Row 1: Sr No, Factor, Type, Size, Face, Make Description */}
        <Grid item xs={1}>
          <TextField
            label="Sr No" size="small" fullWidth disabled
            className="custom-text-field" variant="outlined"
            value={item.srNo || index + 1}
          />
        </Grid>

        <Grid item xs={3}>
          <Autocomplete
            size="small"
            value={item.factor || ''}
            onChange={(event, newValue) => handleItemChange(index, "factor", newValue || "")}
            inputValue={item.factor || ''}
            onInputChange={(event, newInputValue) => handleItemChange(index, "factor", newInputValue || "")}
            options={["Agitator Seal", "Other Seal", "Pump Seal"]}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Factor"
                className="custom-text-field" variant="outlined" fullWidth />
            )}
          />
        </Grid>

        <Grid item xs={2}>
          <TextField label="Type" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.type}
            onChange={(e) => handleItemChange(index, "type", e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <TextField label="Size" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.size}
            onChange={(e) => handleItemChange(index, "size", e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <TextField label="Face" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.face}
            onChange={(e) => handleItemChange(index, "face", e.target.value)} />
        </Grid>

        <Grid item xs={2} display="flex" alignItems="center">
          <Button
            variant="contained" size="small" fullWidth
            onClick={() => {
              const desc = [item.factor, item.type, item.size, item.face]
                .filter(Boolean).join(" | ");
              handleItemChange(index, "description", desc);
            }}
            style={{ backgroundColor: "black", color: "white", fontSize: "0.72rem" }}
          >
            Make Description
          </Button>
        </Grid>

        {/* Row 2: Header */}
        <Grid item xs={12}>
          <TextField label="Header" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.header}
            onChange={(e) => handleItemChange(index, "header", e.target.value)} />
        </Grid>

        {/* Row 3: Description */}
        <Grid item xs={12}>
          <TextField label="Description" size="small" fullWidth multiline rows={2}
            className="custom-text-field" variant="outlined" value={item.description}
            onChange={(e) => handleItemChange(index, "description", e.target.value)} />
        </Grid>

        {/* Row 4: CI Code, LP Item Code, DRF No */}
        <Grid item xs={4}>
          <TextField label="CI Code" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.ciCode}
            onChange={(e) => handleItemChange(index, "ciCode", e.target.value)} />
        </Grid>

        <Grid item xs={4}>
          <TextField label="LP Item Code" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.lpItemCode}
            onChange={(e) => handleItemChange(index, "lpItemCode", e.target.value)} />
        </Grid>

        <Grid item xs={4}>
          <TextField label="DRF No" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.drfNo}
            onChange={(e) => handleItemChange(index, "drfNo", e.target.value)} />
        </Grid>

        {/* Row 5: Dwg No */}
        <Grid item xs={12}>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary" fontWeight={700}>Dwg No</Typography>
              <FormControlLabel
                control={
                  <Checkbox size="small" checked={item.naDrgNo === "NA"}
                    onChange={(e) => {
                      const updatedItems = [...formData.ofmItems];
                      updatedItems[index] = {
                        ...updatedItems[index],
                        naDrgNo: e.target.checked ? "NA" : "",
                        drawingNo: e.target.checked ? "NA" : "",
                      };
                      setFormData({ ...formData, ofmItems: updatedItems });
                    }}
                  />
                }
                label={<Typography variant="caption">N/A</Typography>}
                sx={{ mr: 0, ml: 0 }}
              />
              <FormControlLabel
                control={
                  <Checkbox size="small" checked={item.naDrgNo === "DRG"}
                    onChange={(e) => {
                      const updatedItems = [...formData.ofmItems];
                      updatedItems[index] = {
                        ...updatedItems[index],
                        naDrgNo: e.target.checked ? "DRG" : "",
                        drawingNo: e.target.checked ? "" : updatedItems[index].drawingNo,
                      };
                      setFormData({ ...formData, ofmItems: updatedItems });
                    }}
                  />
                }
                label={<Typography variant="caption">DRG No</Typography>}
                sx={{ mr: 0, ml: 0 }}
              />
            </Box>
            <Box display="flex" gap={1}>
              {[0, 1, 2].map((partIdx) => (
                <TextField
                  key={partIdx}
                  size="small"
                  className="custom-text-field"
                  variant="outlined"
                  disabled={item.naDrgNo === "NA"}
                  value={item.naDrgNo === "NA" && partIdx === 0 ? "NA" : (item.drawingNo?.split("-")[partIdx] || "")}
                  onChange={(e) => {
                    const parts = (item.drawingNo || "--").split("-");
                    parts[partIdx] = e.target.value;
                    const updatedItems = [...formData.ofmItems];
                    updatedItems[index] = { ...updatedItems[index], drawingNo: parts.join("-") };
                    setFormData({ ...formData, ofmItems: updatedItems });
                  }}
                  sx={{ flex: 1 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Row 6: Quantity, Unit, Unit Price, Unit L Price, Total Value */}
        <Grid item xs={2}>
          <TextField label="Quantity" type="number" size="small" fullWidth
            className="custom-text-field" variant="outlined" value={item.quantity}
            onChange={(e) => handleItemChange(index, "quantity", e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <TextField label="Unit" size="small" fullWidth className="custom-text-field"
            variant="outlined" value={item.unit}
            onChange={(e) => handleItemChange(index, "unit", e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <TextField label="Unit Price (₹)" type="number" size="small" fullWidth
            className="custom-text-field" variant="outlined" value={item.unitPrice}
            onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <TextField label="Unit L Price (₹)" type="number" size="small" fullWidth
            className="custom-text-field" variant="outlined" value={item.unitLPrice}
            onChange={(e) => handleItemChange(index, "unitLPrice", e.target.value)} />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Total Value (₹)" size="small" fullWidth disabled
            className="custom-text-field" variant="outlined" value={item.totalValue || ""} />
        </Grid>

        {/* Row 7: Booked Qty, Discount, Total List Value */}
        <Grid item xs={4}>
          <TextField label="Booked Quantity" type="number" size="small" fullWidth
            className="custom-text-field" variant="outlined" value={item.bookedQuantity}
            onChange={(e) => handleItemChange(index, "bookedQuantity", e.target.value)} />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Discount [%]" type="number" size="small" fullWidth
            className="custom-text-field" variant="outlined" value={item.discount}
            onChange={(e) => handleItemChange(index, "discount", e.target.value)} />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Total List Value (₹)" size="small" fullWidth disabled
            className="custom-text-field" variant="outlined" value={item.totalListValue || ""} />
        </Grid>

        {/* ── Save Item + Close Buttons (quotation pattern) ── */}
        <Grid item xs={12}>
          <Box display="flex" alignItems="center" gap={1.5} sx={{ mt: 0.5, mb: 0.5 }}>
            <Button
              onClick={() => handleSaveItem(index)}
              style={{
                backgroundColor: "black",
                color: "white",
                height: "32px",
                fontSize: "0.78rem",
                textTransform: "none",
                paddingLeft: "16px",
                paddingRight: "16px"
              }}
            >
              Save Item
            </Button>

            {formData.ofmItems.length > 1 && (
              <Button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  height: "32px",
                  fontSize: "0.78rem",
                  textTransform: "none",
                  paddingLeft: "16px",
                  paddingRight: "16px"
                }}
                onClick={() => removeItem(index)}
              >
                Close
              </Button>
            )}
          </Box>
        </Grid>
            
      </Grid>
    ))}

    {/* ── Other Charges & Discount ── */}
    <h2 style={{ marginLeft: '0.7%', width: "100%" }}>Other Charges and Discount:</h2>
    <Grid container spacing={2} style={{ maxWidth: '99%', margin: '1em auto', padding: "2.5% 10px", border: "1px solid #C4C4C4", borderRadius: "7px" }}>
      <Grid item xs={3}>
        <TextField size="small" className="custom-text-field" type="number"
          name="pandF" label="P&F [%]" value={formData.pandF || ""} onChange={handleChange} />
      </Grid>
      <Grid item xs={6}>
        <TextField sx={{ width: "100%" }} size="small" type="number"
          className="custom-text-field" name="freight" label="Freight"
          value={formData.freight || ""} onChange={handleChange} />
      </Grid>
      <Grid item xs={3}>
  <TextField
    size="small"
    type="number"
    className="custom-text-field"
    name="discount"
    label="Discount (%)"
    value={formData.discount || ""}
    onChange={(e) => {
      const discountPercent = Number(e.target.value) || 0;

      // Include both active form items AND already saved items
      const allItems = [...formData.ofmItems, ...savedItems];

      const baseTotal = allItems.reduce(
        (sum, it) => sum + (Number(it.totalValue) || 0), 0
      );
      const baseListTotal = allItems.reduce(
        (sum, it) => sum + (Number(it.totalListValue) || 0), 0
      );

      const grandTotal = baseTotal - (baseTotal * discountPercent) / 100;
      const grandTotalListPrice = baseListTotal - (baseListTotal * discountPercent) / 100;

      setFormData({
        ...formData,
        discount: e.target.value,
        grandTotal: Number(grandTotal.toFixed(2)),
        grandTotalListPrice: Number(grandTotalListPrice.toFixed(2)),
      });
    }}
  />
</Grid>
      <Grid item xs={3}>
        <TextField size="small" type="number" className="custom-text-field"
          name="sgst" label="SGST [%]" value={formData.sgst || ""} onChange={handleChange} />
      </Grid>
      <Grid item xs={3}>
        <TextField type="number" size="small" className="custom-text-field"
          name="cgst" label="CGST [%]" value={formData.cgst || ""} onChange={handleChange} />
      </Grid>
      <Grid item xs={3}>
        <TextField type="number" size="small" className="custom-text-field"
          name="igst" label="IGST [%]" value={formData.igst || ""} onChange={handleChange} />
      </Grid>
      <Grid item xs={3}>
        <TextField sx={{ width: '100%' }} size="small" className="custom-text-field"
          name="grandTotalListPrice" label="Grand Total List Price"
          value={formData.grandTotalListPrice || ""} disabled InputProps={{ readOnly: true }} />
      </Grid>
      <Grid item xs={3}>
        <TextField sx={{ width: '100%' }} size="small" className="custom-text-field"
          name="grandTotal" label="Grand Total"
          value={formData.grandTotal || ""} disabled InputProps={{ readOnly: true }} />
      </Grid>
    </Grid>


  </Box>
  
)}

      </Grid>
    </div>
    
    <Grid item xs={4}>
          <Grid item xs={4}  >

            {/* {selectedTab === 1?():null} */}

            {!oId && (selectedTab === 2) ? (<Button className="update-btn" onClick={(e) => handleSubmit(e, formData, navigate, savedItems)} sx={{ margin: "1rem 1rem 0rem 1rem" }} type="submit" disabled={!authState?.authorities.includes("OFM_Write")}variant="contained" >Submit</Button>) : (selectedTab === 3) ? (
              <>
                <Button disabled={!authState?.authorities.includes("OFM_Write")} className="update-btn" onClick={(e) => handleUpdate(e, navigate, formData, savedItems)} sx={{ margin: "1rem 1rem 0rem 1rem" }} variant="contained"  >Update</Button>
                <Button className="cancel-btn" variant="contained" onClick={cancelUpdate} >Cancel</Button> </>) : null}
          </Grid>
        </Grid>
   
  </form>
</Container>

  );

}

