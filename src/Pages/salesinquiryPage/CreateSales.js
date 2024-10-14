import React, { useState, useEffect } from 'react';
import { TextField ,Button,Paper,Typography,Container, Grid, InputLabel , IconButton, Autocomplete } from '@mui/material';
// import '../../css/CustomerFrom.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { getSales, handleSubmit, handleUpdate } from '../../apis/SalesInquiryApi';
import '../../App.css'




export default function CreateSales() {

  const navigate = useNavigate();
  let {sId} = useParams();


  const [formData, setFormData] = useState({
        companyId: "",
        categoryId: "",
        categoryName: "",
        customerId: "",
        customerName: "",
        customerAddress: "",
        contactPerson: "",
        designation: "",
        specialComments: "",
        mobileNo: "",
        source: "",
        branchId: "",
        insertedByUserId: "123",
        lastUpdatedByUserId: "1231",
        industry: "",
        salesItems: []
    });
  
  

   useEffect(()=>{
    if(sId!==undefined){
     getSales(sId,setFormData);

    }else{
      setFormData(
        {
          companyId: "",
          categoryId: "",
          categoryName: "",
          customerId: "",
          customerName: "",
          customerAddress: "",
          contactPerson: "",
          designation: "",
          specialComments: "",
          mobileNo: "",
          source: "",
          branchId: "",
          insertedByUserId: "123",
          lastUpdatedByUserId: "1231",
          industry: "",
          salesItems: []
      })

    }
    
    
  },[sId])



  const handleChange = (e, salesIndex, mocIndex) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    if (salesIndex !== undefined && mocIndex !== undefined) {
      newFormData.salesItems[salesIndex].moc[mocIndex][name] = value;
    } else if (salesIndex !== undefined) {
      if (name === 'newOrExisting') {
        newFormData.salesItems[salesIndex] = { ...newFormData.salesItems[salesIndex], [name]: value };
      } else {
        newFormData.salesItems[salesIndex][name] = value;
      }
    } else {
      newFormData[name] = value;
    }
    setFormData(newFormData);
  };




  const handleAddSales = () => {
    setFormData(prevState => ({
      ...prevState,
      salesItems: [
        ...prevState.salesItems,
        {
          quantity: "",
          unit: "",
          newOrExisting: "",
          type: "",
          size: "",
          headerDescription: "",
          itemDescription: "",
          ciCode: "",
          insertedByUserId: "123",
          lastUpdatedByUserId: "132",
          moc: [
            {
              mocType: "IB MOC",
              matingRing: "",
              sealRing: "",
              elastomer: "",
              springElement: "",
              hardware: "",
              fasteners: ""
            }, 
            {
              mocType: "OB MOC",
              matingRing: "",
              sealRing: "",
              elastomer: "",
              springElement: "",
              hardware: "",
              fasteners: ""
            }
          ]
        }
      ]
    }));
  };
  





  const handleDeleteSales = index => {
    setFormData(prevState => {
      const newCustomerDetail = [...prevState.salesItems];
      newCustomerDetail.splice(index, 1);
      return { ...prevState, salesItems: newCustomerDetail };
    });
  };
  




  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }



 
  return (
    <Container className="container">
      <form  className="card">
      {!sId?<h1>New Sales Inquiry :</h1> : <h1>Update Sales Inquiry :</h1> }
        <Grid container spacing={2}>
         {sId &&<Grid item xs={4}>
            <TextField
            size="small"
              className="custom-text-field" 
              name="inquiryNumber"
              InputLabelProps={{
                shrink: Boolean(formData.inquiryNumber),
              }}
              autoFocus={!formData.inquiryNumber} // Autofocus if the value exists
              value={formData.inquiryNumber}
              label="inquiryNumber"
            />
          </Grid>
}          

      <Grid item xs={4}>
            {/* <InputLabel className="ip-label" >Company ID</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              label="Company ID"
            
            />
          </Grid>

          <Grid item xs={4}>
            {/* <InputLabel className="ip-label" >Category ID</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              label="Category ID"
            />
          </Grid> 

          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Category Name</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              label="Category Name"
            />
          </Grid> 


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Customer ID</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              label="Customer ID"
            />
          </Grid> 

          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Customer Name</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              label="Customer Name"
            />
          </Grid> 


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Customer Address</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
              label="Customer Address"
            />
          </Grid> 


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Contact Person</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              label="Contact Person"
            />
          </Grid> 

          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Designation</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              label="Designation"
            />
          </Grid> 

          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Special Comments</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="specialComments"
              value={formData.specialComments}
              onChange={handleChange}
              label="Special Comments"
            />
          </Grid> 


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Mobile Number</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              label="Mobile Number"
            />
          </Grid> 


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Source</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="source"
              value={formData.source}
              onChange={handleChange}
              label="Source"
            />
          </Grid>


          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Branch ID</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              label="Branch ID"
            />
          </Grid> 



          <Grid item xs={4}>
            {/* <InputLabel className="ip-label">Industry</InputLabel > */}
            <TextField
            size="small"
              className="custom-text-field" 
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              label="Industry"
            />
          </Grid> 

    </Grid>
          </form>
          {formData?.salesItems?.map((detail, index) => (
            <div className='card'  key = {index}>
              {/* <Grid> */}
          <h4>Sales Item {index + 1}</h4>
      <Grid container  spacing={2}>
        <Grid item xs={12} sm={4}>

          {/* <InputLabel className="ip-label">Quantity</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="quantity"
            value={detail.quantity}
            onChange={e => handleChange(e, index)}
            fullWidth
            label="Quantity"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Unit</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="unit"
            value={detail.unit}
            onChange={e => handleChange(e, index)}
            fullWidth
            label="Unit"
          />
        </Grid>


        {/* <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label" >New or Existing</InputLabel >

          <select name ="newOrExisting" value={detail.newOrExisting} onChange={e => handleChange(e, index)} >
            <option  value="Existing">Existing</option>
            <option  value="New">New</option>
          </select>
        </Grid> */}

        <Grid item xs={4}>
    {/* <InputLabel className="ip-label" >Transport</InputLabel > */}
  <Autocomplete
    size="small"
    value={formData.newOrExisting || ''}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        newOrExisting: newValue || ''
      });
    }}

    inputValue={formData.newOrExisting || ''}
    onInputChange={(event, newInputValue) => {
      setFormData({
        ...formData,
        newOrExisting: newInputValue || ''
      });
    }}

    options={["New","Existing"].map((src) => src)}
    renderInput={(params) => (
      <TextField
        {...params}
        size="small"
        variant="outlined"
        placeholder='select New or Existing'
        fullWidth
        className='custom-text-field'
        label="New Or Exising"
      />
    )}
  />
  </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Type</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="type"
            value={detail.type}
            onChange={e => handleChange(e, index)}
            label="Type"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Size</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="size"
            value={detail.size}
            onChange={e => handleChange(e, index)}
            label="Size"
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Header Description</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="headerDescription"
            value={detail.headerDescription}
            onChange={e => handleChange(e, index)}
            fullWidth
            label="Header Description"
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Item Description</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="itemDescription"
            value={detail.itemDescription}
            onChange={e => handleChange(e, index)}
            fullWidth
            label="Item Description"
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >CI CODE</InputLabel > */}
          <TextField
          size="small"
            className="custom-text-field" 
            name="ciCode"
            value={detail.ciCode}
            onChange={e => handleChange(e, index)}
            fullWidth
            label="CI CODE"
          />
        </Grid>

          {/* MOC Tyeps    */}
  { detail.moc.map((elem,idx)=>{
   return (
   <div  style={{margin:"1rem 2rem"}} spacing={2}>
    <hr style={{width:"100%",margin:"20px auto"}}/>
    <h3>{elem.mocType}</h3>

    <Grid container spacing={2} direction="row">


  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Moc Type</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="mocType"
   value={elem.mocType}
   fullWidth
   label="Moc Type"
 />
</Grid>

  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Mating Ring</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="matingRing"
   value={elem.matingRing}
   onChange={e => handleChange(e,index, idx)}
   fullWidth
   label="Mating Ring"
 />
</Grid>


  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Seal Ring</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="sealRing"
   value={elem.sealRing}
   onChange={e => handleChange(e, index, idx)}
   fullWidth
   label="Seal Ring"
 />
</Grid>


  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Elastomer</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="elastomer"
   value={elem.elastomer}
   onChange={e => handleChange(e,index, idx)}
   fullWidth
   label="Elastomer"
 />
</Grid>


  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Spring Element</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="springElement"
   value={elem.springElement}
   onChange={e => handleChange(e,index,  idx)}
   fullWidth
   label="Spring Element"
 />
</Grid>


  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Hardware</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="hardware"
   value={elem.hardware}
   onChange={e => handleChange(e,index,  idx)}
   fullWidth
   label="Hardware"

 />
</Grid>


  <Grid item xs={12} sm={4}>
 {/* <InputLabel className="ip-label">Fasteners</InputLabel > */}
 <TextField
 size="small"
   className="custom-text-field" 
   name="fasteners"
   value={elem.fasteners}
   onChange={e => handleChange(e, index,idx)}
   fullWidth
   label="Fasteners"
 />
</Grid>
</Grid>
   </div> 
)
})
           
}   

        
        <Grid item xs={12} style={{marginLeft:"10px"}}>
          <IconButton className="deleteIcon" onClick={() => handleDeleteSales(index)} >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
))}
          <div style={{display:"flex", alignItems:'center',margin:"0px 10px 20px 10px"}}>
            
<Button className="add-btn"  onClick={handleAddSales}><AddIcon/> Add Sales Items</Button>
          <Grid item xs={12}  > 
        {!sId ?( <Button className="submit-btn" type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate)} variant="contained" >Submit</Button>) : (
          <div >
            <Button className="update-btn" variant="contained" onClick={(e)=>handleUpdate(e,formData,sId,navigate)} >Update</Button>
            <Button className="cancel-btn"   variant="contained" onClick={cancelUpdate} >Cancel</Button> </div>)}
          </Grid>
          </div>
      
    </Container>
  );

}



