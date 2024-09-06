import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import "./CustomerForm.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer, handleSubmit } from '../../../apis/CustomerApi';
import { handleUpdate } from '../../../apis/CustomerApi';



export default function Customer() {

  const navigate = useNavigate();
  let {rId} = useParams();

 
  const [formData, setFormData] = useState({
    branch: '',
    customerName: '',
    customerDetail:[],
    insertedByUserId:'10223',
    lastUpdatedByUserId:'10223',
    insertedOn:'',
    lastUpdatedOn:''
  });
  
  

   useEffect(()=>{
    if(rId!==undefined){
    getCustomer(rId, setFormData)
    }else{

      setFormData({ branch: '',
      customerName: '',
      customerDetail:[],
      insertedByUserId:'10223',
      lastUpdatedByUserId:'10223',
      insertedOn:'',
      lastUpdatedOn:''})

    }
    
    
  },[rId])




  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    if (index === undefined) {
      newFormData[name] = value;
    } else {
      newFormData.customerDetail[index][name] = value;
    }
    setFormData(newFormData);
  };


  const handleAddCustomerDetail = () => {
    setFormData(prevState => ({
      ...prevState,
      customerDetail: [
        ...prevState.customerDetail,
        {
          customerAddress: '',
          contactPerson: '',
          designation: '',
          telephoneNos: '',
          eccNo: '',
          sstNo: '',
          cstNo: '',
          insertedByUserId: '10223',
          lastUpdatedByUserId: '10223',
          gstNo: '',
          industryId: '',
          panNo: ''
        }
      ]
    }));
  };
  

  const handleDeleteCustomerDetail = index => {
    setFormData(prevState => {
      const newCustomerDetail = [...prevState.customerDetail];
      newCustomerDetail.splice(index, 1);
      return { ...prevState, customerDetail: newCustomerDetail };
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
      <form >
        <Grid container spacing={2} >
          <div className='card' style={{width:'100%'}}>
          {!rId ? <h1>New Customer Registration :</h1> : <h1>Update Customer :</h1>}
          <Grid container spacing={2} alignItems="center">
    {rId && (
      <Grid item xs={4}>
        <TextField
          size="small"
          name="customerReferenceNumber"
          className="custom-text-field"
          value={formData.customerReferenceNumber}
          label="Customer Reference No"
          InputLabelProps={{
            shrink: Boolean(formData.customerReferenceNumber),
          }}
          autoFocus={!formData.customerReferenceNumber} // Autofocus if the value exists
        />
      </Grid>
    )}

    <Grid item xs={4}>
      <TextField
        size="small"
        // className="custom-text-field"
        name="branch"
        className='custom-text-field'
        value={formData.branch}
        onChange={handleChange}
        label="Branch"
      />
    </Grid>

    <Grid item xs={4}>
      <TextField
        size="small"
        className="custom-text-field"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        label="Customer Name"
      />
    </Grid>
  </Grid>
            </div>
          {/* </Box> */}
          {formData?.customerDetail?.map((detail, index) => (
            <div className='card'  key = {index}>
          <h3 >Customer Detail {index + 1}</h3>
      <Grid container  spacing={2}>

        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Customer Address</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="customerAddress"
            value={detail.customerAddress}
            onChange={e => handleChange(e, index)}
            label="Customer Address"
            fullWidth
          />

        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Contact Person</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="contactPerson"
            value={detail.contactPerson}
            onChange={e => handleChange(e, index)}
            label='Contact Person'
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Industry Id</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="industryId"
            value={detail.industryId}
            onChange={e => handleChange(e, index)}
            label="Industry Id"
            fullWidth
          />

        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"> Designation</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="designation"
            value={detail.designation}
            onChange={e => handleChange(e, index)}
            label="Designation"
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Telephone Number</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="telephoneNos"
            value={detail.telephoneNos}
            onChange={e => handleChange(e, index)}
            label="Telephone Number"
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Ecc No</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="eccNo"
            value={detail.eccNo}
            onChange={e => handleChange(e, index)}
            label="Ecc No"
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >SSt No</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="sstNo"
            value={detail.sstNo}
            onChange={e => handleChange(e, index)}
            label="SSt No"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >GST No</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="gstNo"
            value={detail.gstNo}
            onChange={e => handleChange(e, index)}
            label="GST No"
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Pan No</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="panNo"
            value={detail.panNo}
            onChange={e => handleChange(e, index)}
            label="Pan No"
            fullWidth
          />

        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >CST No</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="cstNo"
            value={detail.cstNo}
            onChange={e => handleChange(e, index)}
            label="CST No"
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12}>
          <IconButton className="deleteIcon" onClick={() => handleDeleteCustomerDetail(index)} >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>

   
          ))}

          </Grid>
          <Grid item xs={4}>
          <Grid item xs={4}  >
<Button className="add-btn" sx={{margin:"0rem 1rem 1rem 1rem"}}  onClick={handleAddCustomerDetail}><AddIcon/> Add Customer Details</Button>
        
        {!rId ?( <Button className="submit-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained" onClick={(e)=>handleUpdate(e,formData,rId,navigate)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}

