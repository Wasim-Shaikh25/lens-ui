import React, { useState, useEffect } from 'react';
import { TextField ,Tabs, Tab, Box, Button,  Container, Grid, InputLabel , IconButton, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import '../../App.css'
import { getBranches, handleSubmit } from '../../apis/SignupApi';
import { height } from '@mui/system';
import PersonIcon from "@mui/icons-material/Person";




export default function CreateQuotation() {

  const navigate = useNavigate();
  let {qId} = useParams();
  const [cbranch,setcBranch] = useState([]);
  const qOptions = ['Email', 'Phone', 'Verbal', 'Visit'];
  const catOptions = ["API Plan", "Grafoil", "Mechanical Seal", "Re-conditioning","Rotary Joints"]
  const [selectedTab, setSelectedTab] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  
 
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
  
  

   useEffect(()=>{
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
    
  },[qId])

  useEffect(() => {
    if (!isInitialized) {
      // Initialize formData or perform any setup needed
      setIsInitialized(true);
    }
  }, [isInitialized]);



  const handleChange = (e, index) => {
    const { name, type, checked, value } = e.target;
    const newFormData = { ...formData };
  
    if (type === "checkbox") {
      newFormData[name] = checked; // For checkboxes, use 'checked' instead of 'value'
    } else if (index === undefined) {
      newFormData[name] = value;
    } else {
      // Extract the property name and update the specific item
      newFormData.items[index][name] = value;
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






  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("form data is ",formData);

  }

  return (
    <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
      {!qId?<h1 style={{marginLeft:"20px"}}>Quotation-[New Mode]</h1> : <h1 style={{marginLeft:"20px"}}>Update Quotation</h1> }
      <form  onSubmit={handleSubmit}>
        <div className='card'>
        <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'center',
          },
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '5px 12px',            
            minWidth: '100px',
            minHeight: '36px',     // Reduced minHeight to decrease overall tab height
            margin:'0px 3px',
          },
        }}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab icon={<PersonIcon />} label="General" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Items & Charges" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Terms & Conditions" iconPosition="start" />
        <Tab icon={<PersonIcon />} label="Covering Letter" iconPosition="start" />
      </Tabs>

    <Grid container spacing={2} sx={{marginTop:"0.5rem"}}>

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

    options={cbranch.map((branch) => branch.branchName)}
    onFocus={() => getBranches(setcBranch)}
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
              <InputLabel className="ip-label" >Revision Number</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="revisionNo"
                value={formData.revisionNo}
                onChange={handleChange} />
            </Grid> 


    <Grid item xs={3.5}>
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
              <InputLabel className="ip-label" >Customer</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customer"
                value={formData.customer}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Customer Enquiry Number</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customerEnquiryNo"
                value={formData.customerEnquiryNo}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Customer Address</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="customerAddress"
                value={formData.customerAddress}
                onChange={handleChange} />
            </Grid>


            <Grid item xs={4}>
              <InputLabel className="ip-label" >Kind Attention To</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="kindAttentionTo"
                value={formData.kindAttentionTo}
                onChange={handleChange} />
            </Grid>

            <Grid item xs={4}>
              <InputLabel className="ip-label" >Designation</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="designation"
                value={formData.designation}
                onChange={handleChange} />
            </Grid>


          <Grid item xs={3.2}>
    <InputLabel className="ip-label" >Quotation Source</InputLabel >
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
              <InputLabel className="ip-label" >Due On</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="dueOn"
                value={formData.dueOn}
                onChange={handleChange} />
            </Grid>


            
          <Grid item xs={4}>
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
              <InputLabel className="ip-label" >Validity [weeks]</InputLabel >
              <TextField
              size="small"
                className="text-field"
                name="validityWeeks"
                value={formData.validityWeeks}
                onChange={handleChange} />
            </Grid>




   <Grid item xs={6}>
  <InputLabel className="ip-label">Delivery Schedule</InputLabel>
  <TextField
    multiline
    rows={2} // Sets the TextField to be two lines tall
    size="small"
    name="deliverySchedule"
    value={formData.deliverySchedule}
    onChange={handleChange}
    style={{ width: '100%' }} // Makes the TextField wide
  />

</Grid>




   <Grid item xs={6}>
  <InputLabel className="ip-label">Special Comments</InputLabel>
  <TextField
    multiline
    rows={2} // Sets the TextField to be two lines tall
    size="small"
    name="specialComments"
    value={formData.specialComments}
    onChange={handleChange}
    style={{ width: '100%' }} // Makes the TextField wide
  />
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
    <Button style={{backgroundColor:"black", color:"white",height:"8%",margin:'4% 2%'}}> Save Item</Button>
    <Button style={{backgroundColor:"black", color:"white",height:"8%",margin:'4% 2%'}} onClick={()=>handleDeleteItems(index)}>close</Button>
    </Grid>
    ))}
  </>

)}
{selectedTab === 1 &&<Button className="add-btn" sx={{margin:"0em 2em"}}  onClick={handleAddItems}><AddIcon/> Add Item Details</Button>
}


{selectedTab === 2 &&
<>

 terms and condition ka form

</>
}

{selectedTab === 3 &&<>

 covering letter ka form

</>
}


          </Grid>
            </div>


          <Grid item xs={4}>
          <Grid item xs={4}  >

      {/* {selectedTab === 1?():null} */}

        {!qId && (selectedTab===3) ?( <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" variant="contained" >Submit</Button>) : (selectedTab===3) ?(
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained"  >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>):null}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}



