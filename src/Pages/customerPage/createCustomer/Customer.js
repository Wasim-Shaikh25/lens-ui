import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
// import '../../css/CustomerFrom.css';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import axios from 'axios';
import "./customerFrom.css";
import { useNavigate, useParams } from 'react-router-dom';
import {Box} from '@mui/material';



export default function Customer() {

  const navigate = useNavigate();
  let {rId} = useParams();
 


  const [formData, setFormData] = useState({
    branchId: '',
    name: '',
    customerDetail:[],
    insertedByUserId:'10223',
    lastUpdatedByUserId:'10223',
    insertedOn:'',
    lastUpdatedOn:''
  });
  
  

   useEffect(()=>{
    if(rId!==undefined){
      axios.get(`https://lens-svc.azurewebsites.net/lens-svc/customer/get?customerRefrenceNumber=${rId}`)
      .then(res=>{
        const {data} = res;
          setFormData(data);
          console.log("the rId fetched data is ",data)

      }) 
      .catch(err=>{
        console.log(err)
      })

    }else{
      setFormData({ branchId: '',
      name: '',
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
          address: '',
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
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    

    if (formData.customerDetail && formData.customerDetail.length > 0) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.customerDetail[formData.customerDetail.length -1].lastUpdatedOn = dateTime;
      formData.customerDetail[formData.customerDetail.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;
    
  
    
    const res = await axios.post("https://lens-svc.azurewebsites.net/lens-svc/customer/save", formData);
    console.log("response is ",res.data);
    navigate(`/registerSuccess/${res.data}`);

    console.log(formData);
    // Add form submission logic here

  };



  const handleUpdate = async (e)=>{
    e.preventDefault();
    const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (formData.customerDetail && formData.customerDetail.length > 0) {
      // Update insertedOn and lastUpdatedOn for the last item in customerDetail
      formData.customerDetail[formData.customerDetail.length -1].lastUpdatedOn = dateTime;
      // formData.customerDetail[formData.customerDetail.length -1].insertedOn = dateTime;
    } 
      // If customerDetail is not defined or empty, set insertedOn and lastUpdatedOn for formData
      // formData.insertedOn = dateTime;
      formData.lastUpdatedOn = dateTime;

    const res = await axios.put("https://lens-svc.azurewebsites.net/lens-svc/customer/Update", formData);
    console.log("response from update is ",res.data);

    
    console.log(formData);
    rId=null;
    navigate(`/updateSuccess/${formData.customerReferenceNumber}`);
  }

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
      {!rId?<h1 style={{marginLeft:"20px"}}>New Customer Registration :</h1> : <h1 style={{marginLeft:"20px"}}>Update Customer :</h1> }
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

        <Box sx={{width:"100%", display:"flex !important",margin:"20px 20px 0px 20px !important",
  padding:"10px 25px 25px 25px !important",
  borderRadius:"8px !important",border:"1px solid #ddd !important",backgroundColor:"white !important",
    boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px !important"}}>
            {rId && (
              <Box sx={{ flex: 1 }}>
                <InputLabel className="ip-label">Customer Reference No</InputLabel>
                <TextField
                  size="small"
                  className="text-field"
                  name="customerReferenceNumber"
                  value={formData.customerReferenceNumber}
                />
              </Box>
            )}
            <Box sx={{ flex: 1 }}>
              <InputLabel className="ip-label">Branch ID</InputLabel>
              <TextField
                size="small"
                className="text-field"
                name="branchId"
                value={formData.branchId}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: 1, margin:"2px 0px" }}>
              <InputLabel className="ip-label">Name</InputLabel>
              <TextField
                size="small"
                className="text-field"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Box>
          </Box>
          {formData?.customerDetail?.map((detail, index) => (
            <div className='card'  key = {index}>
          <h3 >Customer Detail {index + 1}</h3>
      <Grid container  spacing={2}>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Address</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="address"
            value={detail.address}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Contact Person</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="contactPerson"
            value={detail.contactPerson}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Industry Id</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="industryId"
            value={detail.industryId}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Designation</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="designation"
            value={detail.designation}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Telephone Number</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="telephoneNos"
            value={detail.telephoneNos}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Ecc No</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="eccNo"
            value={detail.eccNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >SSt No</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="sstNo"
            value={detail.sstNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >GST No</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="gstNo"
            value={detail.gstNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >Pan No</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="panNo"
            value={detail.panNo}
            onChange={e => handleChange(e, index)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputLabel className="ip-label"  >CST No</InputLabel >
          <TextField
            size="small" 
            className="text-field" 
            name="cstNo"
            value={detail.cstNo}
            onChange={e => handleChange(e, index)}
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
        
        {!rId ?( <Button className="submit-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" onClick ={handleSubmit} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained" onClick={handleUpdate} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}

