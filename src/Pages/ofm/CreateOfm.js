import React, { useState, useEffect } from 'react';
import { TextField ,Tabs, Tab, Box, Button,  Container, Grid, InputLabel , IconButton, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
// import { getBranches } from '../../apis/SignupApi';
import PersonIcon from "@mui/icons-material/Person";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Radio, RadioGroup, FormControl, FormLabel } from '@mui/material';
import axiosInstance from '../../axios/axiosInstance';



export default function CreateOfm() {

  const navigate = useNavigate();
  let {oId} = useParams();
  const cbranch= ['exports'];
  const prOptions= ['High','Medium','Low'];
  const ivOptions= ['Customer'];
  const oType = ['Regular', 'Annual rate Contract', 'Tender'];
  const catOptions = ["API Plan", "Grafoil", "Mechanical Seal", "Re-conditioning","Rotary Joints"]
  const ptOptions = ['Air Frieght', 'Courier', 'Hand Delivery', 'Insured Registered post Parcel', 'Rail','Sea','Speed Post','Value Payable Parcel']
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  
 
  const [formData, setFormData] = useState({
  
     // General Section
     branch: "",
     poNo: "",
     orderType: "",
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
     statutoryRegulatoryRequirements: true,
     specialInformation: "",
     paymentTerms: "",
     engineer: "",
     oaNo: "",
     industry: "",
     projectOrder: true,
     penaltyApplicable: true,
     poReceived: true,

     // Insurance
     rawMaterialTC: true,
     qcReport: true,
     testReport: true,
     guaranteeCertificate: true,
     fitmentCertificate: true,
     complianceCertificate: true,
 
 // Consignee
     ofmStatus: "",
     externalInspection: true,
     externalInspectionWhere: "",
     externalInspectionByWhom: "",
     consigneeName: "",
     insertedByUserId: "",
     lastUpdatedByUserId: "",
     insurance: true,
     insuranceBy: "",
     insuranceBorneBy: "",
     ofmItems: [
       {
         srNo: 0,
         factor: "",
         type: "",
         size: "",
         face: "",
         description: "",
         ciCode: "",
         drfNo: "",
         quantity: 0,
         unit: "",
         unitPrice: 0,
         unitLPrice: 0,
         discount: 0,
         totalValue: 0
       }
     ]
    });
   
 
 // General Data No found in PDf
 // pre OS Date /company / country / tranasction type /  OFM Date / Po date / 
 
 // Insurance Data Not Found in 


    useEffect(() => {
      if (!isInitialized) {
        // Initialize formData or perform any setup needed
        setIsInitialized(true);
      }
    }, [isInitialized, savedItems]);
  
  
  

   useEffect(()=>{
    if(savedItems.length>1){
      setFormData({
           // General Section
     branch: "",
     poNo: "",
     orderType: "",
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
     statutoryRegulatoryRequirements: true,
     specialInformation: "",
     paymentTerms: "",
     engineer: "",
     oaNo: "",
     industry: "",
     projectOrder: true,
     penaltyApplicable: true,
     poReceived: true,
     
     // Insurance
     rawMaterialTC: true,
     qcReport: true,
     testReport: true,
     guaranteeCertificate: true,
     fitmentCertificate: true,
     complianceCertificate: true,
 
 // Consignee
     ofmStatus: "",
     externalInspection: true,
     externalInspectionWhere: "",
     externalInspectionByWhom: "",
     consigneeName: "",
     insertedByUserId: "",
     lastUpdatedByUserId: "",
     insurance: true,
     insuranceBy: "",
     insuranceBorneBy: "",
     ofmItems: [
       {
         srNo: 0,
         factor: "",
         type: "",
         size: "",
         face: "",
         description: "",
         ciCode: "",
         drfNo: "",
         quantity: 0,
         unit: "",
         unitPrice: 0,
         unitLPrice: 0,
         discount: 0,
         totalValue: 0
       }
     ]
    });
   
 
 // General Data No found in PDf
 // pre OS Date /company / country / tranasction type /  OFM Date / Po date / 
 
 // Insurance Data Not Found in 
    }

    if(oId!==undefined){
    // getCustomer(rId, setFormData)
    }else{

      setFormData({
   // General Section
   branch: "",
   poNo: "",
   orderType: "",
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
   statutoryRegulatoryRequirements: true,
   specialInformation: "",
   paymentTerms: "",
   engineer: "",
   oaNo: "",
   industry: "",
   projectOrder: true,
   penaltyApplicable: true,
   poReceived: true,
   
   // Insurance
   rawMaterialTC: true,
   qcReport: true,
   testReport: true,
   guaranteeCertificate: true,
   fitmentCertificate: true,
   complianceCertificate: true,

// Consignee
   ofmStatus: "",
   externalInspection: true,
   externalInspectionWhere: "",
   externalInspectionByWhom: "",
   consigneeName: "",
   insertedByUserId: "",
   lastUpdatedByUserId: "",
   insurance: true,
   insuranceBy: "",
   insuranceBorneBy: "",
   ofmItems: [
     {
       srNo: 0,
       factor: "",
       type: "",
       size: "",
       face: "",
       description: "",
       ciCode: "",
       drfNo: "",
       quantity: 0,
       unit: "",
       unitPrice: 0,
       unitLPrice: 0,
       discount: 0,
       totalValue: 0
     }
   ]
  });
 

// General Data No found in PDf
// pre OS Date /company / country / tranasction type /  OFM Date / Po date / 

// Insurance Data Not Found in 

    }
    
  },[oId])

 
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
    }else if (type === "radio" && name === "statutoryRegulatoryRequirements") {
        // Handle radio buttons by converting the value to a boolean
        newFormData[name] = value === "true";
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
      ofmItems: [
        ...prevState.ofmItems,
        { itemName: '', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, currency: '', itemCode: '', uom: '', discount: 0, tax: 0 }
      ]
    }));
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
    setSavedItems(newSavedItems);

    formData.ofmItems[index]={ itemName: '', itemDescription: '', quantity: 0, unitPrice: 0, totalPrice: 0, currency: '', itemCode: '', uom: '', discount: 0, tax: 0 }

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
    setFormData({ ...formData, items });
    setSavedItems(savedItems.filter((_, i) => i !== index));
  };

  const handleDelete = (index) => {
    const updatedItems = savedItems.filter((_, i) => i !== index);
    setSavedItems(updatedItems);
  };





  const handleSubmit = async(e)=>{
    e.preventDefault();
    // Update the formData with the new items array
    const updatedFormData = { ...formData, ofmItems: savedItems };

    console.log("Updated formData:", updatedFormData);

    try {
      const res = await axiosInstance.post('lens/Quotation/save',updatedFormData);
      const {data} = res;
      console.log("data is ",data)
      navigate('/quotationSuccess')
    } catch (error) {
      console.log(error)
    }
  
  }



  return (
    <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
      {!oId?<h1 style={{marginLeft:"20px"}}>OFM-[New Mode]</h1> : <h1 style={{marginLeft:"20px"}}>Update OFM</h1> }
      <form  onSubmit={handleSubmit}>
        <div className='card'>
        <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'start',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '2px 10px',            
            minWidth: '15%',
            minHeight: '50px',     // Reduced minHeight to decrease overall tab height
            margin:'0px 1px',
          },
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<PersonIcon />} label="General" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Other" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Items & Charges" iconPosition="start" />
      </Tabs>
      <hr style={{width:'100%'}} />



    <Grid container spacing={2} sx={{marginTop:"0.5rem"}}>
  
{/* General section from start here */}

   {selectedTab === 0 &&<>
    <Grid item xs={4}>
  <InputLabel className="ip-label" >Branch</InputLabel >

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
              <InputLabel className="ip-label" >PoNo</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="poNo"
                value={formData.poNo}
                onChange={handleChange} />
            </Grid> 



            
     <Grid item xs={2.8}>
  <InputLabel className="ip-label" >Order Type</InputLabel >

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

    options={oType.map((type) => type)}
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
    <InputLabel className="ip-label" >Category</InputLabel >
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
    <InputLabel className="ip-label">Invoice To</InputLabel >
  <Autocomplete
    size="small"
    value={formData.invoiceTo || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        invoiceTo: newValue || ''
      });
    }}
    inputValue={formData.category || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        invoiceTo: newInputValue || ''
      });
    }}


    options={ivOptions.map((iv) => iv)}
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
              <InputLabel className="ip-label" >Transport Through</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="transportThrough"
                value={formData.transportThrough}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Customer</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customer"
                value={formData.customer}
                onChange={handleChange} />
            </Grid>

<Grid item xs={4}>
              <InputLabel className="ip-label" >QuotationNo</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="quotationNo"
                value={formData.quotationNo}
                 />
            </Grid>





  <Grid item xs={4}>
              <InputLabel className="ip-label" >kindAttention To</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="kindAttentionTo"
                value={formData.kindAttentionTo}
                onChange={handleChange} />
            </Grid>




   <Grid item xs={6}>
  <InputLabel className="ip-label">Customer Address</InputLabel>
  <TextField
    size="small"
    name="customerAddress"
    value={formData.customerAddress}
    onChange={handleChange}
    style={{ width: '100%' }} // Makes the TextField wide
  />

</Grid>




<Grid item xs={4.8}>
    <InputLabel className="ip-label" >Priority</InputLabel >
  <Autocomplete
    size="small"
    value={formData.priority || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        priority: newValue || ''
      });
    }}

    inputValue={formData.priority || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        priority: newInputValue || ''
      });
    }}

    options={prOptions.map((p) => p)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        variant="outlined"
        placeholder='select any one Priority'
        fullWidth
      />
    )}
  />
  </Grid>


         
<Grid item xs={4.8}>
    <InputLabel className="ip-label" >Transport</InputLabel >
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

    options={ptOptions.map((p) => p)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        variant="outlined"
        placeholder='select any one Priority'
        fullWidth
      />
    )}
  />
  </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Delivery Period</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="deliveryPeriod"
                value={formData.deliveryPeriod}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={5}>
              <InputLabel className="ip-label" >preQANo</InputLabel >
              <TextField
            style={{width:'100%'}}
              size="small"
                className="text-field"
                name="preQANo"
                value={formData.preQANo}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4} sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>

  <FormControl component="fieldset">
    <FormLabel component="legend">Statutory Regulatory Requirements</FormLabel>
    <RadioGroup
      aria-label="statutoryRegulatoryRequirements"
      name="statutoryRegulatoryRequirements"
      value={formData.statutoryRegulatoryRequirements}
      onChange={handleChange}
      row // This makes the radio buttons display horizontally
    >
      <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
      <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
    </RadioGroup>
  </FormControl>
  </Grid>


            <Grid item xs={6}>
              <InputLabel className="ip-label" >Special Information</InputLabel >
              <TextField
              style={{width:'100%'}}
                multiline
                rows={2}
                size="small"
                className="text-field"
                name="specialInformationeer"
                value={formData.specialInformation}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={5}>
              <InputLabel className="ip-label" >Payment Terms</InputLabel >
              <TextField
                style={{width:'100%'}}
                multiline
                rows={2}
                size="small"
                className="text-field"
                name="engineer"
                value={formData.paymentTerms}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Engineer</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="engineer"
                value={formData.engineer}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >oaNo</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="oaNo"
                value={formData.oaNo}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Industry</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="industry"
                value={formData.industry}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
  <FormControlLabel
    control={
      <Checkbox
        checked={!!formData.projectOrder}  // Convert to boolean for compatibility
        onChange={handleChange}
        name="projectOrder"  // Field name
      />
    }
    label="Project Order"
  />
</Grid>

<Grid item xs={4}>
  <FormControlLabel
    control={
      <Checkbox
        checked={!!formData.poReceived}  // Convert to boolean for compatibility
        onChange={handleChange}
        name="poReceived"  // Field name
      />
    }
    label="Po Received"
  />
</Grid>

<Grid item xs={4}>
  <FormControlLabel
    control={
      <Checkbox
        checked={!!formData.someOtherField}  // Replace with the actual field
        onChange={handleChange}
        name="someOtherField"  // Field name
      />
    }
    label="Some Other Field"
  />
</Grid>
      </>
      
      }



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

        {formData?.ofmItems?.map((detail, index) => (
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

        {!oId && (selectedTab===3) ?( <Button className="update-btn" onClick={handleSubmit} sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" variant="contained" >Submit</Button>) : (selectedTab===3) ?(
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained"  >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>):null}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}

