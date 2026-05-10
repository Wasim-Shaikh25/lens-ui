import React, { useState, useEffect } from 'react';
import { TextField, Tabs, Tab, Box, Button, Container, Grid, InputLabel, IconButton, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
// import { getBranches } from '../../apis/SignupApi';
import PersonIcon from "@mui/icons-material/Person";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { handleSubmit, handleUpdate } from '../../apis/QuotationApi';
import { getQuotation } from '../../apis/QuotationApi';
import { useAuth } from '../../contextApi/AuthContext';
import axiosInstance from '../../axios/axiosInstance';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { getData } from 'country-list';
import { DatePicker } from '@mui/x-date-pickers';



export default function CreateQuotation() {

  const navigate = useNavigate();
  let { qId } = useParams();
  const cbranch = ['exports'];
  const qOptions = ['Email', 'Phone', 'Verbal', 'Visit'];
  const catOptions = ["API Plan", "Grafoil", "Mechanical Seal", "Re-conditioning", "Rotary Joints"]
  const ptOptions = ["C&F (Cost and Frieght)", "C&I (Cost and Insurance)", "CIF (Cost, Insurance & Frieght)", "Ex-Works(Mumbai)", "Ex-Works (Palanpur, Gujrat)", "FOB (Free on Board)", "FOR (Free on Road/Rail)"]
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedItems, setSavedItems] = useState([]);
  const { authState } = useAuth();

  const [baseTotal, setBaseTotal] = useState(0);

  const countries = getData().map(({ name }) => name);
const [custAddress, setCustAddress] = useState([])
const [addressInputValue, setAddressInputValue] = useState('');


  const [formData, setFormData] = useState({
    quotationId:  null,
    transactiontype:"",
    category: "",
    quotationDate: moment(),
   country:"",
   company:"",
    customerEnquiryNo: "",
    salesInquiryNumber:"",
    branch: "",
    enquiryNo: "",
    enquiryDate:null,
    customer: "",
    customerAddress: "",
    kindAttentionTo: "",
    designation: "",
    dueOn: null,
    transport: "",
    specialComments: "",
    revisionNo: "",
    revisionDate:null,
    validityWeeks: "",
    quotationSource: "",
    deliverySchedule: "",
    engineer: "",
    budgetaryOffer: false,
    paymentTerms: "",
    priceTerm: "",
    startStatement: "",
    endStatement: "",
    statement: "",
    freight: 0,
    discount: 0,
    sgst: 0,
    cgst: 0,
    igst: 0,
    grandTotal: 0,
    name: "",
    signatoryDesignation: "",
    insertedByUserId: "",
    lastUpdatedByUserId: "",
    items: [{ // Static item at index 0
      itemName: '',
      itemDescription: '',
      quantity: '',
      unitPrice: '',
      totalPrice: '',
      currency: '',
      itemCode: '',
      uom: '',
      discount: '',
      tax: '',
    }],
    guaranteeWarranty: true,
    guarantee: "",
    warranty: "",
    pandF: ''

  });

  useEffect(() => {
    if (!isInitialized) {
      // Initialize formData or perform any setup needed
      setIsInitialized(true);
    }
  }, [isInitialized, savedItems]);




  useEffect(() => {
    if (savedItems.length > 1) {
      setFormData({
        quotationId:  null,
        transactiontype:"",
        category: "",
        quotationDate: moment(),
       country:"",
        company:"",
        revisionDate:null,
        enquiryDate:null,
        customerEnquiryNo: "",
        salesInquiryNumber:"",
        branch: "",
        enquiryNo: "",
        customer: "",
        customerAddress: "",
        kindAttentionTo: "",
        designation: "",
        dueOn: null,
        transport: "",
        specialComments: "",
        revisionNo: "",
        validityWeeks: "",
        quotationSource: "",
        deliverySchedule: "",
        engineer: "",
        budgetaryOffer: false,
        paymentTerms: "",
        priceTerm: "",
        startStatement: "",
        endStatement: "",
        statement: "",
        freight: 0,
        discount: 0,
        sgst: 0,
        cgst: 0,
        igst: 0,
        grandTotal: 0,
        name: "",
        signatoryDesignation: "",
        insertedByUserId: "",
        lastUpdatedByUserId: "",
        items: [{ // Static item at index 0
          itemName: '',
          itemDescription: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          currency: '',
          itemCode: '',
          uom: '',
          discount: '',
          tax: ''
        }],
        guaranteeWarranty: true,
        guarantee: "",
        warranty: "",
        pandF: ''

      })
    }

    if (qId !== undefined) {
      getQuotation(qId, setFormData, setSavedItems)
    } else {

      setFormData({
        quotationId: null,
       transactiontype:"",
        category: "",
       country:"",
       company:"",
        quotationDate: moment(),
        enquiryDate:null,
        revisionDate:null,
        customerEnquiryNo: "",
        salesInquiryNumber:"",
        branch: "",
        enquiryNo: "",
        customer: "",
        customerAddress: "",
        kindAttentionTo: "",
        designation: "",
        dueOn: null,
        transport: "",
        specialComments: "",
        revisionNo: "",
        validityWeeks: "",
        quotationSource: "",
        deliverySchedule: "",
        engineer: "",
        budgetaryOffer: false,
        paymentTerms: "",
        priceTerm: "",
        startStatement: "",
        endStatement: "",
        statement: "",
        freight: '',
        discount: '',
        sgst: '',
        cgst: '',
        igst: '',
        grandTotal: '',
        name: "",
        signatoryDesignation: "",
        insertedByUserId: "",
        lastUpdatedByUserId: "",
        items: [{ // Static item at index 0
          itemName: '',
          itemDescription: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
          currency: '',
          itemCode: '',
          uom: '',
          discount: '',
          tax: ''
        }],
        guaranteeWarranty: true,
        guarantee: "",
        warranty: "",
        pandF: ""

      })

    }

  }, [qId])


  useEffect(() => {
    // Runs for both update mode (sets value) and reset (clears value)
    setAddressInputValue(formData.customerAddress || "");
  }, [formData.customerAddress]);


  useEffect(() => {
    const newBaseTotal = savedItems.reduce((acc, item) => acc + item.totalPrice, 0);
    setBaseTotal(newBaseTotal);
  
    // Re-apply existing discount when items change
    const discountedTotal = newBaseTotal - (newBaseTotal * formData.discount) / 100;
    setFormData(prev => ({
      ...prev,
      grandTotal: discountedTotal,
    }));
  }, [savedItems]);

  console.log("form Data from outside is ", formData)



  const handleChange = (e, index) => {
//console.log("target object is ",e.target)

if (!e?.target) {
  const newFormData = { ...formData };
  newFormData.dueOn = e ? moment(e).format("YYYY-MM-DDTHH:mm:ss") : null;
  setFormData(newFormData);
  return;
}


    const { name, type, checked, value } = e.target;
    const newFormData = { ...formData };

    // if (type === "checkbox") {
    //   newFormData[name] = checked; // For checkboxes, use 'checked' instead of 'value'
    // } else if (index === undefined) {
    //   newFormData[name] = value;
    // } else {
    //   // Extract the property name and update the specific item
    //   newFormData.items[index][name] = value;
    // }

    console.log("name is ",name)

    if (type === "checkbox") {
      newFormData[name] = checked;
    }
    else if (name === "discount") {
      const discountValue = Number(value);
      const baseTotal = savedItems.reduce((acc, item) => acc + item.totalPrice, 0);
  
      console.log("the discount is ",discountValue)
      console.log("the  is ",discountValue)
      setFormData(prev => ({
        ...prev,
        discount: value,     
        grandTotal: baseTotal - (baseTotal * discountValue) / 100
      }));
      return ;
    }
    else if (name === "warranty" || name === "guarantee") {
      newFormData.guarantee = name === "guarantee" ? value : "";
      newFormData.warranty = name === "warranty" ? value : "";
    } else if (index === undefined) {
      newFormData[name] = value;
    } else {
      // Update specific item in items array
      newFormData.items[index] = {
        ...newFormData.items[index],
        [name]: value
      };
    }


    setFormData(newFormData);
    console.log("Updated form data:", newFormData);
  };



  const handleAddItems = () => {
    setFormData(prevState => ({
      ...prevState,
      items: [
        ...prevState.items,
        { itemName: '', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, currency: '', itemCode: '', uom: '', discount: 0, tax: 0 }
      ]
    }));
  };

  
  const handleFetch = async (apiItem) => {

    try {
      const { data } = await axiosInstance(`lens/salesInquiry/get?itemReferenceNo=${apiItem}`)

      console.log("response is ", data)
      // setFormData({
      //   ...formData,
      //   pumpInquiryItem: { ...data?.pumpInquiry }
      // })

    } catch (err) {
      console.log(err)
    }

  }
  const getAddress = async (custName) => {
    try {
      const encodedName = custName.trim().replace(/\s+/g, '%20');
      // OR use: encodeURIComponent(custName.trim())
      
      const { data } = await axiosInstance(`lens/customer/keyword?startkeyword=${encodedName}`);
  
      const allAddresses = data.flatMap((customer) =>
        customer.contactDetail.map((contact) => ({
          ...contact,
          customerName: customer.customerName,
          branch: customer.branch
        }))
      );
  
      setCustAddress(allAddresses);
    } catch (err) {
      console.log(err);
    }
  };




  const handleDeleteItems = index => {
    setFormData(prevState => {
      const newItemDetails = [...prevState.items];
      newItemDetails.splice(index, 1);
      return { ...prevState, items: newItemDetails };
    });
  };

  const handleSaveItem = (index) => {
    // Save the current item to the savedItems array
    const newSavedItems = [...savedItems, formData.items[index]];
    setSavedItems(newSavedItems);
    const newGrandTotal =  newSavedItems.reduce((acc, item) => acc + item.totalPrice, 0);


    console.log("Saved items:", newSavedItems);
    setFormData(prev => ({
      ...prev,
      grandTotal: newGrandTotal,   
      items: prev.items.map((item, i) =>
        i === index
          ? { itemName: '', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, currency: '', itemCode: '', uom: '', discount: 0, tax: 0 }
          : item
      )
    }));
  };

console.log("formData",formData)


  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  console.log("tab No is ", selectedTab)

  const cancelUpdate = () => {

    const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
    // If user confirms, navigate to the home page and reload the window
    if (confirmCancel) {
      navigate('/');
      window.location.reload();
    }
  }

  const handleEditItem = (index) => {
    const itemToEdit = savedItems[index];
    const items = [...formData.items];
    items[0] = itemToEdit;
    setFormData({ ...formData, items });
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    const updatedItems = savedItems.filter((_, i) => i !== index);
    setSavedItems(updatedItems);
  };


  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
  
    // convert numbers properly
    if (["quantity", "unitPrice", "unitLPrice", "discount", "tax"].includes(field)) {
      value = Number(value);
    }
  
    updatedItems[index][field] = value;
    
    // Recalculate Total Value
    const { quantity, unitPrice, discount } = updatedItems[index];
    const gross = quantity * unitPrice;
    const net = gross - (gross * discount) / 100;
    
    updatedItems[index].totalPrice = Number(net.toFixed(2));

    if (updatedItems[index].totalPrice){
      
    }
  
    setFormData({
      ...formData,
      ...formData.grandTotal,
      items: updatedItems
    });
  };
  



  return (
    <Container className="container" sx={{ marginTop: "10px", backgroundColor: "rgb(250, 251, 251)" }}>
      <form onSubmit={handleSubmit}>
        <div className='card'>
          {!qId ? <h1 style={{ marginLeft: "8px", color: "#03346E" }}>Quotation</h1> : <h1 style={{ marginLeft: "15px" }}>Update Quotation</h1>}
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            underline="none"
            indicatorColor="transparent"
            textColor="primary"
            centered
          >
            <Tab icon={<PersonIcon />} label="General" iconPosition="start" />
            <Tab icon={<PersonIcon />} label="Items & Charges" iconPosition="start" />
            <Tab icon={<PersonIcon />} label="Terms & Conditions" iconPosition="start" />
            <Tab icon={<PersonIcon />} label="Covering Letter" iconPosition="start" />
          </Tabs>
          {/* <hr style={{width:'100%'}} /> */}


          <Grid container spacing={2} sx={{ marginTop: "0.5rem" }}>

            {selectedTab === 0 && <>

              <Grid item xs={4}>

              <TextField
  size="small"
  className="custom-text-field"
  disabled
  id="disableItem"
  name="quotationId"
  InputLabelProps={{
    shrink: Boolean(qId && formData?.quotationId), // shrink only when qId exists AND has value
  }}
  label="Quotation ID"
  autoFocus={!formData?.quotationId}
  value={qId && formData?.quotationId ? formData.quotationId : ""}  // "" not null
  onChange={handleChange}
/>
</Grid>

            <Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="Quotation Date"
      value={formData.quotationDate}
      format="DD-MMM-YYYY"
      disabled
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field",
           id:"disableItem"
        }
      }}
    />
  </LocalizationProvider>
</Grid>


            <Grid item xs={4}>
<Autocomplete
  size="small"
  value={formData.transactiontype || ''}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      transactiontype: newValue || ''
    });
  }}
  inputValue={formData.transactiontype || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      transactiontype: newInputValue || ''
    });
  }}

  options={["Quotation AHD","Quotation ASM","Quotation BCH","Quotation BIH","Quotation BLR","Quotation BRD","Quotation BSR","Quotation CBE","Quotation CHN","Quotation CNG","Quotation DEL","Quotation EER","Quotation EXP","Quotation GOA","Quotation HLD","Quotation HO","Quotation HUB","Quotation HYD","Quotation HYD2","Quotation IDR","Quotation JMR","Quotation KCH","Quotation KLP","Quotation KLC","Quotation KOP","Quotation KTA","Quotation LKW","Quotation MFG","Quotation MLR","Quotation MUM","Quotation NAG","Quotation NEL","Quotation NSK","Quotation PUN","Quotation AHD","Quotation RAJ","Quotation RPR","Quotation SDG","Quotation SLP","Quotation SRT","Quotation SUL","Quotation VAP","Quotation VIS"].map((trans) => trans)}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Transaction Type"
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
                size="small"
                className="custom-text-field"
                label="Sales Inquiry Reference No."
                name="salesInquiryNumber"
                value={formData.salesInquiryNumber}
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
                      disabled={!formData.salesInquiryNumber}
                      onClick={() => handleFetch(formData?.salesInquiryNumber)} // Your function here
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
  value={formData.category || ''}
  onChange={(event, newValue) => {
    setFormData({
      ...formData,
      category: newValue || ''
    });
  }}
  inputValue={formData.category || ''}
  onInputChange={(event, newInputValue) => {
    setFormData({
      ...formData,
      category: newInputValue || ''
    });
  }}

  options={["API Plan","Bearing Isolators","Grafoil","Mechanical Seal","Re-Conditioning","Rotary Joints"].map((cat) => cat)}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Category"
      className="custom-text-field"
      placeholder='Category'
      variant="outlined"
      fullWidth
    />
  )}
/>
</Grid>


 <Grid item xs={4}>
  <Autocomplete
    size="small"
    value={formData.country || ''}
    onChange={(_, newValue) => setFormData({ ...formData, country: newValue || '' })}
    options={countries}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        label="Country"
        className="custom-text-field"
        placeholder="Select Country"
        variant="outlined"
        fullWidth
      />
    )}
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
      placeholder='Select a Company'
      variant="outlined"
      fullWidth
    />
  )}
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
                {/* <InputLabel className="ip-label" >Revision Number</InputLabel > */}
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  className="custom-text-field"
                  name="revisionNo"
                  value={formData.revisionNo}
                  onChange={handleChange}
                  label="Revision Number"
                />
              </Grid>



              <Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="Revision Date"
      value={formData.revisionDate ? moment(formData.revisionDate) : null}
      onChange={(newValue) => {
        setFormData({
          ...formData,
          revisionDate: newValue ? newValue.toISOString() : null  // "2026-04-12T00:00:00.000Z"
        });
      }}
      format="DD-MMM-YYYY"  
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field"
        }
      }}
    />
  </LocalizationProvider>
</Grid>


<Grid item xs={4}>
   
                <TextField
                  size="small"
                  variant="outlined"
                  className='custom-text-field'      // form css class applied          
                  fullWidth
                  name="customerEnquiryNo"
                  value={formData.customerEnquiryNo}
                  onChange={handleChange}
                  label="Customer Enquiry Number"
                />
              </Grid>


              
              <Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="Enquiry Date"
      value={formData.enquiryDate ? moment(formData.enquiryDate) : null}
      onChange={(newValue) => {
        setFormData({
          ...formData,
          enquiryDate: newValue ? newValue.toISOString() : null 
        });
      }}
      format="DD-MMM-YYYY"  
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field"
        }
      }}
    />
  </LocalizationProvider>
</Grid>



<Grid item xs={4}>
  <TextField
    size="small"
    variant="outlined"
    fullWidth
    className='custom-text-field'
    name="customer"
    value={formData.customer}
    onChange={handleChange}
    label="Customer"
  />
</Grid>

<Grid item xs={4}>
<Autocomplete
  size="small"
  value={custAddress.find(a => a.customerAddress === formData.customerAddress) || null}
  inputValue={addressInputValue}
  onOpen={() => getAddress(formData.customer)}
  onChange={(event, newValue) => {
    setFormData({ ...formData, customerAddress: newValue?.customerAddress || '' });
    setAddressInputValue(newValue?.customerAddress || '');
  }}
  onInputChange={(event, newInputValue, reason) => {
    if (reason === 'input') {
      setAddressInputValue(newInputValue);
      getAddress(newInputValue);
    }
  }}
  options={custAddress}
  getOptionLabel={(option) => option?.customerAddress || ''}
  renderOption={(props, option) => (
    <li {...props} key={option.contactDetailId}>
      <div style={{ fontWeight: 600 }}>{option.customerAddress}</div>
    </li>
  )}
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      label="Customer Address"
      className="custom-text-field"
      placeholder="Search by customer name"
      variant="outlined"
      fullWidth
    />
  )}
/>
</Grid>

              <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  className="custom-text-field"
                  name="kindAttentionTo"
                  onInput={e => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')}
                  value={formData.kindAttentionTo}
                  onChange={handleChange}
                  label="Kind Attention To"
                />
              </Grid>

              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Designation</InputLabel > */}
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  className='custom-text-field'
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  label="Designation"
                />
              </Grid>


              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Quotation Source</InputLabel > */}
                <Autocomplete
                  size="small"
                  value={formData.quotationSource || ''}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      quotationSource: newValue || ''
                    });
                  }}

                  inputValue={formData.quotationSource || ''}
                  onInputChange={(event, newInputValue) => {
                    setFormData({
                      ...formData,
                      quotationSource: newInputValue || ''
                    });
                  }}


                  options={qOptions.map((src) => src)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      variant="outlined"
                      className='custom-text-field'
                      label="Quotation Source"
                      placeholder='select any one source'
                      fullWidth
                    />
                  )}
                />
              </Grid>

              {/* <Grid item xs={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  className="custom-text-field"
                  name="dueOn"
                  value={formData.dueOn}
                  onChange={handleChange}
                  label="Due On"
                />
              </Grid> */}

<Grid item xs={4}>
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <DatePicker
      label="Due On"
      value={formData.dueOn ? moment(formData.dueOn) : null}
      onChange={(newValue) => {
        setFormData({
          ...formData,
          dueOn: newValue ? newValue.toISOString() : null  // "2026-04-12T00:00:00.000Z"
        });
      }}
      format="DD-MMM-YYYY"  
      slotProps={{
        textField: {
          size: "small",
          fullWidth: true,
          className: "custom-text-field"
        }
      }}
    />
  </LocalizationProvider>
</Grid>



              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Transport</InputLabel > */}
                <Autocomplete
                  size="small"
                  value={formData.transport || ''}
                  onChange={(event, newValue) => {
                    setFormData({
                      ...formData,
                      transport: newValue || ''
                    });
                  }}

                  inputValue={formData.transport || ''}
                  onInputChange={(event, newInputValue) => {
                    setFormData({
                      ...formData,
                      transport: newInputValue || ''
                    });
                  }}

                  options={qOptions.map((src) => src)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      label="Transport"
                      className="custom-text-field"
                      variant="outlined"
                      placeholder='select any one transport'
                      fullWidth
                    />
                  )}
                />
              </Grid>


              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Validity [weeks]</InputLabel > */}
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  className="custom-text-field"
                  name="validityWeeks"
                  value={formData.validityWeeks}
                  onChange={handleChange}
                  label="Validity [weeks]"
                />
              </Grid>




              <Grid item xs={6}>
                {/* <InputLabel className="ip-label">Delivery Schedule</InputLabel> */}
                <TextField
                  size="small"
                  variant="outlined"
                  multiline
                  rows={3}
                  fullWidth
                  className="custom-text-field"
                  name="deliverySchedule"
                  value={formData.deliverySchedule}
                  onChange={handleChange}
                  label="Delivery Schedule"
                />

              </Grid>





              <Grid item xs={6}>
                {/* <InputLabel className="ip-label">Special Comments</InputLabel> */}
                <TextField
                  multiline
                  rows={3} // Sets the TextField to be two lines tall
                  size="small"
                  name="specialComments"
                  value={formData.specialComments}
                  onChange={handleChange}
                  className='custom-text-field'
                  label="Special Comments"
                />
              </Grid>


              <Grid item xs={4}>
                {/* <InputLabel className="ip-label" >Engineer</InputLabel > */}
                <TextField
                  size="small"
                  className="custom-text-field"
                  name="engineer"
                  value={formData.engineer}
                  label="Engineer"
                  onInput={e => e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')}
                  onChange={handleChange} />
              </Grid>

              <Grid item xs={4} sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formData.budgetaryOffer}
                      checked={formData.budgetaryOffer}
                      onChange={handleChange}
                      name="budgetaryOffer"
                      color="primary"
                    />
                  } label="Budgetary Offer" />
              </Grid>
            </>}


            {selectedTab === 1 && (
              <>
                <h2 style={{ marginLeft: '2%' }}>Items:</h2>

                {(savedItems.length > 0) && <TableContainer component={Paper} style={{ maxWidth: '97%', margin: '1em auto' }}>
                  <Table>
                    <TableHead >
                      <TableRow style={{ backgroundColor: "#000045" }}>
                        <TableCell style={{ color: "white" }}>Sr No</TableCell>
                        <TableCell style={{ color: "white" }}>Item Name</TableCell>
                        <TableCell style={{ color: "white" }}>Item Code</TableCell>
                        <TableCell style={{ color: "white" }}>Total Price</TableCell>
                        <TableCell style={{ color: "white" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {savedItems?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{item?.itemName}</TableCell>
                          <TableCell>{item?.itemCode}</TableCell>
                          <TableCell>{item?.totalPrice}</TableCell>
                          <TableCell>

                            <Button
                              className='mui-btn--small'
                              style={{ maxWidth: '25px', maxHeight: '25px', backgroundColor: '#000050', color: 'white', marginRight: '15px' }}
                              onClick={() => handleEditItem(index)}
                            >
                              Edit
                            </Button>

                            <Button style={{ maxWidth: '25px', maxHeight: '25px', backgroundColor: 'red', color: 'white', marginRight: '15px' }}
                              onClick={() => handleDelete(index)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                }

                {formData?.items?.map((detail, index) => (
                  <Grid container spacing={2} key={index} style={{ maxWidth: '100%', margin: '0px 1.8em', border: "1px solid #C4C4C4", borderRadius: "7px", padding: '1px 12px' }}>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        label="Sr Number"
                        value={index + 1} // Access detail for each item
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="itemName" // Unique name for each item
                        label="Item Name"
                        value={detail.itemName || ''} // Access detail for each item
                        onChange={(e) => handleChange(e, index)}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="quantity" // Unique name for each item
                        label="Quantity"
                        type="number"
                        value={detail.quantity || ''} // Access detail for each item
                        onChange={(e) => handleItemChange(index,"quantity",e.target.value)} // Handle item change
                      />
                    </Grid>

                    <Grid item xs={8}>
                      <TextField
                        rows={2}
                        style={{ width: "100%" }}
                        size="small"
                        className="custom-text-field"
                        name="itemDescription" // Unique name for each item
                        label="Item Description"
                        value={detail.itemDescription || ''} // Access detail for each item
                        onChange={(e) => handleChange(e, index)} // Handle item change
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="unitPrice" // Unique name for each item
                        label="Unit Price"
                        tye="number"
                        value={detail.unitPrice || ''} // Access detail for each item
                        onChange={(e) => handleItemChange(index,"unitPrice",e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="totalPrice" // Unique name for each item
                        label="Total Price"
                        type="number"
                        value={detail.totalPrice || ''} // Access detail for each item
                        onChange={(e) =>handleItemChange(index,"totalPrice",e.target.value)}

                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="currency" // Unique name for each item
                        label="Currency"
                        value={detail.currency || ''} // Access detail for each item
                        onChange={(e) => handleChange(e, index)} // Handle item change
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="itemCode" // Unique name for each item
                        label="Item Code"
                        value={detail.itemCode || ''} // Access detail for each item
                        onChange={(e) => handleChange(e, index)} // Handle item change
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="uom" // Unique name for each item
                        label="UOM"
                        value={detail.uom || ''} // Access detail for each item
                        onChange={(e) => handleChange(e, index)} // Handle item change
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="discount" // Unique name for each item
                        label="Discount [%]"
                        value={detail.discount || ''} // Access detail for each item
                        onChange={(e) => handleItemChange(index,"discount",e.target.value)} // Handle item change
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        size="small"
                        className="custom-text-field"
                        name="tax" // Unique name for each item
                        label="Tax"
                        value={detail.tax || ''} // Access detail for each item
                        onChange={(e) => handleItemChange(index, "tax", e.target.value)}  
                      />
                    </Grid>

                    <Button onClick={() => handleSaveItem(index)} style={{ backgroundColor: "black", color: "white", height: "8%", margin: '4% 2%' }}> Save Item</Button>
                    <Button style={{ backgroundColor: "black", color: "white", height: "8%", margin: '4% 2%' }} onClick={() => handleDeleteItems(index)}>close</Button>
                  </Grid>
                ))}
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  {selectedTab === 1 && <Button className="add-btn" sx={{ margin: "0em 2em", width: "60%" }} onClick={handleAddItems}><AddIcon /> Add Item Details</Button>
                  }
                  <h2 style={{ marginLeft: '4%', width: "100%" }}>Other Charges and Discount:</h2>
                </div>

                <Grid container spacing={2} style={{ maxWidth: '97%', margin: '1em auto', padding: "2.5% 10px", border: "1px solid #C4C4C4", borderRadius: "7px" }}>

                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      className="custom-text-field"
                      type="number"
                      name="pandF"
                      label="P&F [%]"
                      value={formData.pandF}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      sx={{ width: "100%" }}
                      size="small"
                      type="number"
                      className="custom-text-field"
                      name="freight"
                      label="Freight"
                      value={formData.freight}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      type="number"
                      className="custom-text-field"
                      name="discount"
                      label="Discount (%)"
                      value={formData.discount}
                      onChange={handleChange}
                    />
                    </Grid>

                  <Grid item xs={3}>
                    <TextField
                      size="small"
                      type="number"
                      className="custom-text-field"
                      name="sgst"
                      label="SGST [%]"
                      value={formData.sgst}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                    type="number"
                      size="small"
                      className="custom-text-field"
                      name="cgst"
                      label="CGST [%]"
                      value={formData.cgst}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                    type="number"
                      size="small"
                      className="custom-text-field"
                      name="igst"
                      label="IGST [%]"
                      value={formData.igst}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      sx={{ width: '100%' }}
                      size="small"
                      type="number"
                      className="custom-text-field"
                      name="grandTotal"
                      label="Grand Total"
                      value={formData.grandTotal}
                    />
                  </Grid>

                </Grid>

              </>

            )}



            {selectedTab === 2 && <>
              <h2 style={{ marginLeft: "2%" }}>Terms:</h2>
              <Grid container spacing={1.5} style={{ maxWidth: '97%', margin: '0.5em auto', padding: "1.7%", border: "1px solid #C4C4C4", borderRadius: "7px" }}>
                <Grid item xs={6}>
                  {/* <InputLabel className="ip-label">Price Terms</InputLabel > */}
                  <Autocomplete
                    size="small"
                    value={formData.priceTerm || ''}
                    onChange={(event, newValue) => {
                      setFormData({
                        ...formData,
                        priceTerm: newValue || ''
                      });
                    }}

                    inputValue={formData.priceTerm || ''}
                    onInputChange={(event, newInputValue) => {
                      setFormData({
                        ...formData,
                        priceTerm: newInputValue || ''
                      });
                    }}

                    options={ptOptions.map((src) => src)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        variant="outlined"
                        className='custom-text-field'
                        label="Price Terms"
                        placeholder='select any one transport'
                        fullWidth
                      />
                    )}
                  />
                </Grid>


                <Grid item xs={6}>
                  {/* <InputLabel className="ip-label" >Payment Terms</InputLabel > */}
                  <TextField
                    size="small"
                    multiline
                    rows={2}
                    className="custom-text-field"
                    name="paymentTerms"
                    label="Payment Terms"
                    value={formData.paymentTerms}
                    onChange={handleChange} />
                </Grid>

              </Grid>



              <h2 style={{ marginLeft: "2%" }}>Guarantee/Warranty:</h2>

              <Grid container spacing={1.5} style={{ maxWidth: '97%', margin: '0.5em auto', padding: "1.7%", border: "1px solid #C4C4C4", borderRadius: "7px" }}>

                <Grid item sx={10}>
                  {/* <FormLabel component="legend">Select Option</FormLabel> */}
                  <RadioGroup
                    aria-label="warranty-guarantee"
                    name="warrantyGuarantee"
                    value={formData.guarantee ? 'guarantee' : formData.warranty ? 'warranty' : ''}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="guarantee"
                      control={<Radio />}
                      label="Guarantee"
                      name="guarantee"
                    />
                    <FormControlLabel
                      value="warranty"
                      control={<Radio />}
                      label="Warranty"
                      name="warranty"
                    />
                  </RadioGroup>
                </Grid>

                <Grid item xs={10}>
                  {/* <InputLabel className="ip-label" >Statement</InputLabel > */}
                  <TextField
                    size="small"
                    multiline
                    rows={3}
                    className="custom-text-field"
                    name="statement"
                    label="Statement"
                    value={formData.statement}
                    onChange={handleChange} />
                </Grid>

              </Grid>

            </>
            }

            {selectedTab === 3 && <>
              <h3 style={{ marginLeft: "2%" }}>Start Statement will be printed before item(s) Listing and End Statement Will be printed after Commercial Term(s) Section</h3>
              <Grid container spacing={1.5} style={{ maxWidth: '97%', margin: '1em auto', padding: "2.5% 10px", border: "1px solid #C4C4C4", borderRadius: "7px" }}>
                <Grid item xs={6}>
                  {/* <InputLabel className="ip-label" >Start Statement</InputLabel > */}
                  <TextField
                    sx={{ width: '100%' }}
                    size="small"
                    multiline
                    rows={2}
                    label="Start Statement"
                    className="custom-text-field"
                    name="startStatement"
                    value={formData.startStatement}
                    onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  {/* <InputLabel className="ip-label" >End Statement</InputLabel > */}
                  <TextField
                    size="small"
                    label="End Statement"
                    multiline
                    rows={2}
                    className="custom-text-field"
                    name="endStatement"
                    value={formData.endStatement}
                    onChange={handleChange} />
                </Grid>

              </Grid>

              <h2 style={{ marginLeft: '2%' }}>Signatory</h2>
              <Grid container spacing={1.5} style={{ maxWidth: '97%', margin: '0.5em auto', padding: "2.5% 10px", border: "1px solid #C4C4C4", borderRadius: "7px" }}>
                <Grid item xs={6}>
                  {/* <InputLabel className="ip-label" >Name</InputLabel > */}
                  <TextField
                    size="small"
                    label="Name"
                    className="custom-text-field"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} />
                </Grid>

                <Grid item xs={6}>
                  {/* <InputLabel className="ip-label" >Designation</InputLabel > */}
                  <TextField
                    size="small"
                    className="custom-text-field"
                    label="Designation"
                    name="signatoryDesignation"
                    value={formData.signatoryDesignation}
                    onChange={handleChange} />
                </Grid>
              </Grid>

            </>
            }


          </Grid>
        </div>


        <Grid item xs={4}>
          <Grid item xs={4}  >

            {/* {selectedTab === 1?():null} */}

            {!qId && (selectedTab === 3) ? (<Button className="update-btn" onClick={(e) => handleSubmit(e, navigate, formData, savedItems)} sx={{ margin: "1rem 1rem 0rem 1rem" }} type="submit" disabled={!authState?.authorities.includes("Quotation_Write")}variant="contained" >Submit</Button>) : (selectedTab === 3) ? (
              <>
                <Button disabled={!authState?.authorities.includes("Quotation_Write")} className="update-btn" onClick={(e) => handleUpdate(e, navigate, formData, savedItems)} sx={{ margin: "1rem 1rem 0rem 1rem" }} variant="contained"  >Update</Button>
                <Button className="cancel-btn" variant="contained" onClick={cancelUpdate} >Cancel</Button> </>) : null}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}
