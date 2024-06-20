import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
// import '../../css/CustomerFrom.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { getSales, handleSubmit, handleUpdate } from '../../apis/SalesInquiryApi';
import useToken from '../../contextApi/useToken';





export default function CreateSales() {

  const navigate = useNavigate();
  let {sId} = useParams();
  const token = useToken();


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
     getSales(sId,setFormData,token);

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
    <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
   {!sId?<h1 style={{marginLeft:"20px"}}>New Sales Inquiry :</h1> : <h1 style={{marginLeft:"20px"}}>Update Sales Inquiry :</h1> }
      <form  className="form-style">
        <Grid container spacing={2}>
         {sId &&<Grid item xs={4}>
            <InputLabel className="ip-label">Sales Inquiry Number</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="inquiryNumber"
              value={formData.inquiryNumber}
            />
          </Grid>
}          
      <Grid item xs={4}>
            <InputLabel className="ip-label" >Company ID</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
            
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel className="ip-label" >Category ID</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
            />
          </Grid> 

          <Grid item xs={4}>
            <InputLabel className="ip-label">Category Name</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
            />
          </Grid> 


          <Grid item xs={4}>
            <InputLabel className="ip-label">Customer ID</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
            />
          </Grid> 

          <Grid item xs={4}>
            <InputLabel className="ip-label">Customer Name</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </Grid> 


          <Grid item xs={4}>
            <InputLabel className="ip-label">Customer Address</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="customerAddress"
              value={formData.customerAddress}
              onChange={handleChange}
            />
          </Grid> 


          <Grid item xs={4}>
            <InputLabel className="ip-label">Contact Person</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </Grid> 

          <Grid item xs={4}>
            <InputLabel className="ip-label">Designation</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          </Grid> 

          <Grid item xs={4}>
            <InputLabel className="ip-label">Special Comments</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="specialComments"
              value={formData.specialComments}
              onChange={handleChange}
            />
          </Grid> 


          <Grid item xs={4}>
            <InputLabel className="ip-label">Mobile Number</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </Grid> 


          <Grid item xs={4}>
            <InputLabel className="ip-label">Source</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="source"
              value={formData.source}
              onChange={handleChange}
            />
          </Grid>


          <Grid item xs={4}>
            <InputLabel className="ip-label">Branch ID</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
            />
          </Grid> 



          <Grid item xs={4}>
            <InputLabel className="ip-label">Industry</InputLabel >
            <TextField
            size="small"
              className="text-field" 
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </Grid> 

    </Grid>
          </form>
          {formData?.salesItems?.map((detail, index) => (
            <div className='card'  key = {index}>
              {/* <Grid> */}
          <h4 >Sales Item {index + 1}</h4>
      <Grid container  spacing={2}>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label">Quantity</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="quantity"
            value={detail.quantity}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label">Unit</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="unit"
            value={detail.unit}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label" >New or Existing</InputLabel >

          <select name ="newOrExisting" value={detail.newOrExisting} onChange={e => handleChange(e, index)} >
            <option  value="Existing">Existing</option>
            <option  value="New">New</option>
          </select>
        </Grid>

        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Type</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="type"
            value={detail.type}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label">Size</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="size"
            value={detail.size}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label">Header Description</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="headerDescription"
            value={detail.headerDescription}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label">Item Description</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="itemDescription"
            value={detail.itemDescription}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >CI CODE</InputLabel >
          <TextField
          size="small"
            className="text-field" 
            name="ciCode"
            value={detail.ciCode}
            onChange={e => handleChange(e, index)}
            fullWidth
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
 <InputLabel className="ip-label">Moc Type</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="mocType"
   value={elem.mocType}
   fullWidth
 />
</Grid>

  <Grid item xs={12} sm={4}>
 <InputLabel className="ip-label">Mating Ring</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="matingRing"
   value={elem.matingRing}
   onChange={e => handleChange(e,index, idx)}
   fullWidth
 />
</Grid>


  <Grid item xs={12} sm={4}>
 <InputLabel className="ip-label">Seal Ring</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="sealRing"
   value={elem.sealRing}
   onChange={e => handleChange(e, index, idx)}
   fullWidth
 />
</Grid>


  <Grid item xs={12} sm={4}>
 <InputLabel className="ip-label">Elastomer</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="elastomer"
   value={elem.elastomer}
   onChange={e => handleChange(e,index, idx)}
   fullWidth
 />
</Grid>


  <Grid item xs={12} sm={4}>
 <InputLabel className="ip-label">Spring Element</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="springElement"
   value={elem.springElement}
   onChange={e => handleChange(e,index,  idx)}
   fullWidth
 />
</Grid>


  <Grid item xs={12} sm={4}>
 <InputLabel className="ip-label">Hardware</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="hardware"
   value={elem.hardware}
   onChange={e => handleChange(e,index,  idx)}
   fullWidth
 />
</Grid>


  <Grid item xs={12} sm={4}>
 <InputLabel className="ip-label">Fasteners</InputLabel >
 <TextField
 size="small"
   className="text-field" 
   name="fasteners"
   value={elem.fasteners}
   onChange={e => handleChange(e, index,idx)}
   fullWidth
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
          <div style={{display:"flex", alignItems:'center',margin:"0px 10px 20px 10px", justifyContent:'space-between'}}>
            
<Button className="add-btn"  onClick={handleAddSales}><AddIcon/> Add Sales Items</Button>
          <Grid item xs={4}>
          <Grid item xs={4}  >
        
        {!sId ?( <Button className="submit-btn" type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate,token)} variant="contained" >Submit</Button>) : (
          <div >
            <Button className="update-btn" variant="contained" onClick={(e)=>handleUpdate(e,formData,sId,navigate,token)} >Update</Button>
            <Button className="cancel-btn"   variant="contained" onClick={cancelUpdate} >Cancel</Button> </div>)}
          </Grid>
        </Grid>
          </div>
      
    </Container>
  );

}



