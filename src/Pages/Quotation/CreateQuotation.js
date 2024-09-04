import React, { useState, useEffect } from 'react';
import { TextField ,Tabs, Tab, Box, Button,  Container, Grid, InputLabel , IconButton, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
// import { getBranches } from '../../apis/SignupApi';
import PersonIcon from "@mui/icons-material/Person";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import { handleSubmit } from '../../apis/QuotationApi';



export default function CreateQuotation() {

  const navigate = useNavigate();
  let {qId} = useParams();
  const cbranch= ['exports'];
  const qOptions = ['Email', 'Phone', 'Verbal', 'Visit'];
  const catOptions = ["API Plan", "Grafoil", "Mechanical Seal", "Re-conditioning","Rotary Joints"]
  const ptOptions = ["C&F (Cost and Frieght)", "C&I (Cost and Insurance)", "CIF (Cost, Insurance & Frieght)", "Ex-Works(Mumbai)","Ex-Works (Palanpur, Gujrat)","FOB (Free on Board)","FOR (Free on Road/Rail)"]
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  
 
  const [formData, setFormData] = useState({
    
      category: "",
      customerEnquiryNo: "",
      branch: "",
      enquiryNo: "",
      customer: "",
      customerAddress: "",
      kindAttentionTo: "",
      designation: "",
      dueOn: "",
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
      items: [  { // Static item at index 0
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
    
    });

    useEffect(() => {
      if (!isInitialized) {
        // Initialize formData or perform any setup needed
        setIsInitialized(true);
      }
    }, [isInitialized, savedItems]);
  
  
  

   useEffect(()=>{
    if(savedItems.length>1){
      setFormData({
    
        category: "",
        customerEnquiryNo: "",
        branch: "",
        enquiryNo: "",
        customer: "",
        customerAddress: "",
        kindAttentionTo: "",
        designation: "",
        dueOn: "",
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
        items: [  { // Static item at index 0
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

    if(qId!==undefined){
    // getCustomer(rId, setFormData)
    }else{

      setFormData({
    
      category: "",
      customerEnquiryNo: "",
      branch: "",
      enquiryNo: "",
      customer: "",
      customerAddress: "",
      kindAttentionTo: "",
      designation: "",
      dueOn: "",
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
      items: [  { // Static item at index 0
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
    
  },[qId])

 
console.log("form Data from outside is ",formData)



  const handleChange = (e, index) => {
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

    if (type === "checkbox") {
      newFormData[name] = checked;
  } else if (name === "warranty" || name === "guarantee") {
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

    formData.items[index]={ itemName: '', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, currency: '', itemCode: '', uom: '', discount: 0, tax: 0 }

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
    const items = [...formData.items];
    items[0] = itemToEdit;
    setFormData({ ...formData, items });
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    const updatedItems = savedItems.filter((_, i) => i !== index);
    setSavedItems(updatedItems);
  };





 



  return (
    <Container className="container" sx= {{marginTop:"10px", backgroundColor:"rgb(250, 251, 251)"}}>
      <form  onSubmit={handleSubmit}>
        <div className='card'>
      {!qId?<h1 style={{marginLeft:"8px",color:"#03346E"}}>Quotation</h1> : <h1 style={{marginLeft:"15px"}}>Update Quotation</h1> }
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


    <Grid container spacing={2} sx={{marginTop:"0.5rem"}}>

   {selectedTab === 0 &&<>
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

    options={cbranch.map((branch) => branch)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
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
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
  name="revisionNo"
  value={formData.revisionNo}
  onChange={handleChange}
  label="Revision Number"
/>
            </Grid> 


    <Grid item xs={4}>
    {/* <InputLabel className="ip-label" >Category</InputLabel > */}
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


    options={catOptions.map((cat) => cat)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        placeholder='select a Category'
        variant="outlined"
        fullWidth
      />
    )}
  />
  </Grid>
            
            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Customer</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customer"
                value={formData.customer}
                onChange={handleChange} /> */}
<TextField
  size="small"
  variant="outlined"
  fullWidth
  className='custom-text-field'   //form css class applied
  name="customer"
  value={formData.customer}
  onChange={handleChange}
  label="Customer"
/>
            </Grid>

            <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Customer Enquiry Number</InputLabel > */}
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
              {/* <InputLabel className="ip-label" >Customer Address</InputLabel > */}
              <TextField
  size="small"
  variant="outlined"
  fullWidth
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
  name="customerAddress"
  value={formData.customerAddress}
  onChange={handleChange}
  label="Customer Address"
/>
            </Grid>


            <Grid item xs={4}>
            <TextField
  size="small"
  variant="outlined"
  fullWidth
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
  name="kindAttentionTo"
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
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
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
        placeholder='select any one source'
        fullWidth
      />
    )}
  />
  </Grid>

  <Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Due On</InputLabel > */}
              <TextField
  size="small"
  variant="outlined"
  fullWidth
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
  name="dueOn"
  value={formData.dueOn}
  onChange={handleChange}
  label="Due On"
/>
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
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
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
  rows={2}
  fullWidth
  sx={{
    borderRadius: "4px",
    borderColor: "#ccc",
    "& .MuiOutlinedInput-root": {
      paddingRight: "10px",
      paddingLeft: "10px",
    },
  }}
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
    rows={2} // Sets the TextField to be two lines tall
    size="small"
    name="specialComments"
    value={formData.specialComments}
    onChange={handleChange}
    style={{ width: '100%' }} // Makes the TextField wide
    label="Special Comments"
  />
</Grid>


<Grid item xs={4}>
              {/* <InputLabel className="ip-label" >Engineer</InputLabel > */}
              <TextField
              size="small"
                className="text-field"
                name="engineer"
                value={formData.engineer}
                label="Engineer"
                onChange={handleChange} />
            </Grid>

<Grid item xs={4} sx={{display:"flex",justifyContent:'center',alignItems:'center'}}>
    <FormControlLabel
      control={
        <Checkbox
        value={formData.budgetaryOffer}
          checked={formData.budgetaryOffer}
          onChange={handleChange}
          name="budgetaryOffer"
          color="primary"
        />
      }label="Budgetary Offer"/>
          </Grid>
      </>}


      {selectedTab === 1 && (
  <>
  <h2 style={{marginLeft:'2%'}}>Items:</h2>

{(savedItems.length>0)&&<TableContainer component={Paper} style={{ maxWidth: '97%', margin: '1em auto' }}>
          <Table>
            <TableHead >
              <TableRow style={{backgroundColor:"#000045"}}>
                <TableCell style={{color:"white"}}>Sr No</TableCell>
                <TableCell style={{color:"white"}}>Item Name</TableCell>
                <TableCell style={{color:"white"}}>Item Code</TableCell>
                <TableCell style={{color:"white"}}>Total Price</TableCell>
                <TableCell style={{color:"white"}}>Actions</TableCell>
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
style={{maxWidth:'25px', maxHeight: '25px',  backgroundColor: '#000050', color:'white', marginRight: '15px' }} 
                      onClick={() => handleEditItem(index)}
                    >
                      Edit
                    </Button>
               
                    <Button style={{maxWidth:'25px', maxHeight: '25px',  backgroundColor: 'red', color:'white', marginRight: '15px' }} 
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
  <Grid container spacing={2} key={index} style={{  maxWidth:'97%',margin:'1em auto', border:"1px solid #C4C4C4",borderRadius:"7px" }}>

      <Grid item xs={4} >
        <InputLabel className="ip-label">Sr Number</InputLabel>
        <TextField
          size="small"
          className="text-field"
          value={index+1} // Access detail for each item
          />
      </Grid>
      <Grid item xs={4} >
        <InputLabel className="ip-label">Item Name</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`itemName`} // Unique name for each item
          value={detail.itemName || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} />
      </Grid>

      <Grid item xs={4} >
        <InputLabel className="ip-label">Quantity</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`quantity`} // Unique name for each item
          value={detail.quantity || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

      <Grid item xs={8} >
        <InputLabel className="ip-label">Item Description</InputLabel>
        <TextField
        rows={2}
        style={{width:"100%"}}
          size="small"
          className="text-field"
          name={`itemDescription`} // Unique name for each item
          value={detail.itemDescription || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

     

      <Grid item xs={4}>
        <InputLabel className="ip-label">Unit Price</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`unitPrice`} // Unique name for each item
          value={detail.unitPrice || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

      <Grid item xs={4}>
        <InputLabel className="ip-label">Total Price</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`totalPrice`} // Unique name for each item
          value={detail.totalPrice || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

      <Grid item xs={4}>
        <InputLabel className="ip-label">Currency</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`currency`} // Unique name for each item
          value={detail.currency || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

      <Grid item xs={4}>
        <InputLabel className="ip-label">Item Code</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`itemCode`} // Unique name for each item
          value={detail.itemCode || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

      <Grid item xs={4}>
        <InputLabel className="ip-label">UOM</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`uom`} // Unique name for each item
          value={detail.uom || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>

      <Grid item xs={4}>
        <InputLabel className="ip-label">Discount</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`discount`} // Unique name for each item
          value={detail.discount || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      </Grid>


      <Grid item xs={4}>
        <InputLabel className="ip-label">Tax</InputLabel>
        <TextField
          size="small"
          className="text-field"
          name={`tax`} // Unique name for each item
          value={detail.tax || ''} // Access detail for each item
          onChange={(e) => handleChange(e, index)} // Handle item change
        />
      {/* </Grid> */}
    </Grid>
    <Button onClick={()=>handleSaveItem(index)} style={{backgroundColor:"black", color:"white",height:"8%",margin:'4% 2%'}}> Save Item</Button>
    <Button style={{backgroundColor:"black", color:"white",height:"8%",margin:'4% 2%'}} onClick={()=>handleDeleteItems(index)}>close</Button>
    </Grid>
    ))}
<div style={{display:'flex', flexDirection:'column'}}>

{selectedTab === 1 &&<Button className="add-btn" sx={{margin:"0em 2em", width:"60%"}}  onClick={handleAddItems}><AddIcon/> Add Item Details</Button>
}
<h2 style={{marginLeft:'4%', width:"100%"}}>Other Charges and Discount:</h2>
</div>

<Grid container spacing={2} style={{ maxWidth:'97%',margin:'1em auto',padding:"2.5% 10px", border:"1px solid #C4C4C4",borderRadius:"7px" }}>

      <Grid item xs={3}>
              <InputLabel className="ip-label" >P&F.[%]</InputLabel >
              <TextField
                // sx={{width:"100%"}}
              size="small"
                className="text-field"
                name="pandF"
                value={formData.pandF}
                onChange={handleChange} />
            </Grid> .

      <Grid item xs={6}>
              <InputLabel className="ip-label" >Freight</InputLabel >
              <TextField
              sx={{width:"100%"}}
              size="small"
                className="text-field"
                name="freight"
                value={formData.freight}
                onChange={handleChange} />
            </Grid> 

      <Grid item xs={2}>
              <InputLabel className="ip-label" >Discount(%)</InputLabel >
              <TextField
              sx={{width:"100%"}}

              size="small"
                className="text-field"
                name="discount"
                value={formData.discount}
                onChange={handleChange} />
            </Grid> 


      <Grid item xs={3}>
              <InputLabel className="ip-label" >SGST[%]</InputLabel >
              <TextField

              size="small"
                className="text-field"
                name="sgst"
                value={formData.sgst}
                onChange={handleChange} />
            </Grid> 


      <Grid item xs={3}>
              <InputLabel className="ip-label" >CGST[%]</InputLabel >
              <TextField

              size="small"
                className="text-field"
                name="cgst"
                value={formData.cgst}
                onChange={handleChange} />
            </Grid> 

      <Grid item xs={3}>
              <InputLabel className="ip-label" >IGST[%]</InputLabel >
              <TextField

              size="small"
                className="text-field"
                name="igst"
                value={formData.igst}
                onChange={handleChange} />
            </Grid> 

      <Grid item xs={3}>
              <InputLabel className="ip-label" >Grand Total</InputLabel >
              <TextField
                            sx={{width:'100%'}}

              size="small"
                className="text-field"
                name="grandTotal"
                value={formData.grandTotal}
                onChange={handleChange} />
            </Grid> 


            </Grid> 
  </>

)}



{selectedTab === 2 &&<>
<h2 style={{marginLeft:"2%"}}>Terms:</h2>
<Grid container spacing={1.5} style={{  maxWidth:'97%',margin:'0.5em auto',padding:"1.7%", border:"1px solid #C4C4C4",borderRadius:"7px" }}>
<Grid item xs={6}>
    <InputLabel className="ip-label">Price Terms</InputLabel >
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
        placeholder='select any one transport'
        fullWidth
      />
    )}
  />
  </Grid>

  <Grid item xs={6}>
              <InputLabel className="ip-label" >Payment Terms</InputLabel >
              <TextField
               sx={{width:'100%'}}
              size="small"
              multiline
              rows={2}
                className="text-field"
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleChange} />
            </Grid> 

  </Grid>



            <h2 style={{marginLeft:"2%"}}>Guarantee/Warranty:</h2>

            <Grid container spacing={1.5} style={{  maxWidth:'97%',margin:'0.5em auto',padding:"1.7%", border:"1px solid #C4C4C4",borderRadius:"7px" }}>

            <Grid item sx={10}>
            <FormLabel component="legend">Select Option</FormLabel>
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
              <InputLabel className="ip-label" >Statement</InputLabel >
              <TextField
               sx={{width:'100%'}}
              size="small"
              multiline
              rows={2}
                className="text-field"
                name="statement"
                value={formData.statement}
                onChange={handleChange} />
            </Grid> 

            </Grid>

</>
}

{selectedTab === 3 &&<>
<h3 style={{marginLeft:"2%"}}>Start Statement will be printed before item(s) Listing and End Statement Will be printed after Commercial Term(s) Section</h3>
  <Grid container spacing={1.5} style={{ maxWidth:'97%',margin:'1em auto',padding:"2.5% 10px", border:"1px solid #C4C4C4",borderRadius:"7px" }}>
  <Grid item xs={6}>
              <InputLabel className="ip-label" >Start Statement</InputLabel >
              <TextField
               sx={{width:'100%'}}
              size="small"
              multiline
              rows={2}
                className="text-field"
                name="startStatement"
                value={formData.startStatement}
                onChange={handleChange} />
            </Grid> 

  <Grid item xs={6}>
              <InputLabel className="ip-label" >End Statement</InputLabel >
              <TextField
               sx={{width:'100%'}}
              size="small"
              multiline
              rows={2}
                className="text-field"
                name="endStatement"
                value={formData.endStatement}
                onChange={handleChange} />
            </Grid> 

  </Grid>

    <h2 style={{marginLeft:'2%'}}>Signatory</h2>
  <Grid container spacing={1.5} style={{ maxWidth:'97%',margin:'0.5em auto',padding:"2.5% 10px", border:"1px solid #C4C4C4",borderRadius:"7px" }}>
  <Grid item xs={6}>
              <InputLabel className="ip-label" >Name</InputLabel >
              <TextField
               sx={{width:'100%'}}
              size="small"
                className="text-field"
                name="name"
                value={formData.name}
                onChange={handleChange} />
            </Grid> 

  <Grid item xs={6}>
              <InputLabel className="ip-label" >Designation</InputLabel >
              <TextField
               sx={{width:'100%'}}
              size="small"
                className="text-field"
                name="designation"
                value={formData.designation}
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

        {!qId && (selectedTab===3) ?( <Button className="update-btn" onClick={(e)=>handleSubmit(e, navigate, formData, savedItems)} sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" variant="contained" >Submit</Button>) : (selectedTab===3) ?(
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained"  >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>):null}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}
