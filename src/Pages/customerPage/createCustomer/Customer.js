import React, { useState, useEffect } from 'react';
import { TextField ,Button,  Container, Grid, InputLabel ,Typography, IconButton, Autocomplete } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import "./CustomerForm.css";
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomer, handleSubmit } from '../../../apis/CustomerApi';
import { handleUpdate } from '../../../apis/CustomerApi';
import { black } from '@mui/material/colors';
import moment from 'moment';
import axiosInstance from '../../../axios/axiosInstance';
import { useAuth } from '../../../contextApi/AuthContext';



export default function Customer() {

  const navigate = useNavigate();
  let {rId} = useParams();
  const dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
  const [options, setOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [errors, setErrors] = useState({});
    const { authState } = useAuth();




 
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
      lastUpdatedOn:''
    })

    }
    
    
  },[rId])




  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    let validationError = validateField(name, value);



    if (index === undefined) {
      newFormData[name] = value;
    } else {
      newFormData.customerDetail[index][name] = value;
    }
    setFormData(newFormData);

      // Update errors
      setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError
  }));

  };


  const handleAddCustomerDetail = () => {
    setFormData(prevState => ({
      ...prevState,
      customerDetail: [
        ...prevState.customerDetail,
        {
          alternateCustomerAddress: "",
          contactPerson: "",
          designation: "",
          mobileNumber: "",
          alternateMobileNumber: "",
          emailId: "",
          alternateemailId: "",
          eccNo: "",
          sstNo: "",
          cstNo: "",
          insertedByUserId: "",
          lastUpdatedByUserId: "",
          gstNo: "",
          industryName: "",
          panNo: "",
          referenceDrawingNo: "",
          customerAddress: ""
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
  

  const validateField = (name, value) => {
    let error = '';
  
    switch (name) {
      case 'customerName':
      case 'industryName':
      case 'contactPerson':
      case 'branch':
      case 'designation':
        // Allow only letters and spaces
        if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = `${name} cannot contain numbers or special characters`;
        }
        break;
  
      case 'mobileNumber':
      case 'alternateMobileNumber':
        // Allow only numbers and check length
        if (!/^\d{0,10}$/.test(value)) {
          error = `${name} should only contain numbers and must be 10 digits or less`;
        }
        break;
      
        case 'emailId':
          case 'alternateemailId':
            // Check if value is empty
            if (value.trim() === '') {
              error = ''; // No error if the field is empty
            } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
              error = `Please Enter a Valid Email Id`;
            }
            break;
      
  
      default:
        break;
    }
  
    return error;
  };
  


  const cancelUpdate = ()=>{

      const confirmCancel = window.confirm("Are you sure you want to cancel the update?");
   // If user confirms, navigate to the home page and reload the window
  if (confirmCancel) {
    navigate('/');
    window.location.reload();
  }
  }



const getDataByName = async (newInputValue) => {
  const validInputRegex = /^[a-zA-Z\s]*$/;

  if (!validInputRegex.test(newInputValue)) {
    setErrorMessage('Customer name cannot contain numbers or special characters');
  } else {
    setErrorMessage(''); // Clear error if valid input
  }

  try {
    const { data } = await axiosInstance.get(`lens/customer/keyword?startkeyword=${newInputValue}`);
    const customerNames = data.map((item) => item.customerName); // Only customer names
    setOptions(customerNames);  // Options is now array of strings
  } catch (err) {
    console.error(err);
  }
};



 // Fetch customer data when a customer is selected
  const handleCustomerSelect = async (event, newValue) => {
    if (newValue) {
      try {
        const { data } = await axiosInstance.get(`lens/customer/keyword?startkeyword=${newValue}`);
        if (data && data.length > 0) {
          setFormData(data[0]); // Assuming the data[0] contains the full form data of the customer
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  console.log("Options is "+options)

  return (
    <Container className="container" sx= {{marginTop:"20px", backgroundColor:"rgb(250, 251, 251)"}}>
      <form onSubmit={(e)=>handleSubmit(e,formData,navigate,setErrors,validateField)}>
        <Grid container spacing={2} >
          <div className='card' style={{width:'100%'}}>
          {!rId ? <h1>New Customer Registration </h1> : <h1>Update Customer </h1>}
          <Grid container spacing={2} alignItems="center">

    {/* {rId && ( */}
      <Grid item xs={4}>
        <TextField
          size="small"
          name="customerReferenceNumber"
          className="custom-text-field"
          id="disableItem"
          value={rId?formData.customerReferenceNumber:''}
          label="Customer Reference No"
          InputLabelProps={{
            shrink: Boolean(formData.customerReferenceNumber),
          }}
          autoFocus={formData.customerReferenceNumber} // Autofocus if the value exists
          InputProps={{
            readOnly: true,  // Prevent user input
          }}
        />
      </Grid>



    {/* )} */}

    <Grid item xs={4}>
      <TextField
        size="small"
        className="custom-text-field"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
        error={Boolean(errors['customerName'])}  // Show red border if error exists
        helperText={errors['customerName']} 
        label="Customer Name"
      />
    </Grid>


          
    {/* <Grid item xs={4}>
<Autocomplete
  size="small"
  value={formData.customerName || ''} // This is for the selected value
  onChange={handleCustomerSelect} // Handle customer selection
  inputValue={formData.customerName || ''} // Input-controlled value
  onInputChange={(event, newInputValue) => {
    setFormData({ ...formData, customerName: newInputValue });
    getDataByName(newInputValue); // Fetch options when typing
  }}
  options={options} // Correct: Use `options` directly, assuming it holds string values.
  getOptionLabel={(option) => option || ''} // Display the correct label
  renderInput={(params) => (
    <>
      <TextField
        {...params}
        size="small"
        variant="outlined"
        placeholder="Select Customer"
        fullWidth
        label="Customer Name"
        error={Boolean(errorMessage)}
      />
      {errorMessage && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>
      )}
    </>
  )}
/>


    </Grid> */}




    <Grid item xs={4}>
      <TextField
        size="small"
        // className="custom-text-field"
        name="branch"
        className='custom-text-field'
        value={formData.branch}
        onChange={handleChange}
        label="Branch"
        error={Boolean(errors['branch'])}  // Show red border if error exists
        helperText={errors['branch']} 
      />
    </Grid>

    <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"> Designation</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            value={dateTime}
            label="Current Date & Time"
            id="disableItem"
            fullWidth
            InputProps={{
              readOnly: true,  // Prevent user input
            }}
          />
        </Grid>

   
        <Grid item xs={4}>
        <TextField
          size="small"
          className="custom-text-field"
          id="disableItem"
          value={authState?.sub}
          label="Created By UserId"
          InputLabelProps={{
            shrink: Boolean(authState?.sub),
          }}
          autoFocus={!authState?.sub} // Autofocus if the value exists
          InputProps={{
            readOnly: true,  // Prevent user input
          }}
        />
      </Grid>


  </Grid>
            </div>
          {/* </Box> */}
          {formData?.customerDetail?.map((detail, index) => (
            <div className='card'  key = {index}>
          <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Customer Detail {index + 1}</div></div>

      <Grid container  spacing={2}>

      <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Contact Person</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="contactPerson"
            value={detail.contactPerson}
            onChange={e => handleChange(e, index)}
            label='Contact Person'
            error={Boolean(errors['contactPerson'])}  // Show red border if error exists
            helperText={errors['contactPerson']} 
            fullWidth
          />
        </Grid>


      <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label">Industry Id</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="industryName"
            value={detail.industryName}
            onChange={e => handleChange(e, index)}
            label="Industry Name"
            error={Boolean(errors['industryName'])}  // Show red border if error exists
            helperText={errors['industryName']} 
            required
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
            error={Boolean(errors['designation'])}  // Show red border if error exists
            helperText={errors['designation']} 
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"> Designation</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="referenceDrawingNo"
            value={detail.referenceDrawingNo}
            onChange={e => handleChange(e, index)}
            label="Reference Drawing Number"
            fullWidth
          />
        </Grid>
       
        </Grid>

        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Address & Contact Details</div></div>


        <Grid container  spacing={2}>

        <Grid item xs={12} sm={8}>
          {/* <InputLabel className="ip-label">Customer Address</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="customerAddress"
            multiline
            rows={4}
            value={detail.customerAddress}
            onChange={e => handleChange(e, index)}
            label="Customer Address"
            fullWidth
          />

        </Grid>



        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Telephone Number</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="mobileNumber"
            value={detail.mobileNumber}
            onChange={e => handleChange(e, index)}
            label="Mobile Number"
            fullWidth
            error={Boolean(errors['mobileNumber'])}  // Show red border if error exists
            helperText={errors['mobileNumber']} 
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Telephone Number</InputLabel > */}
          <TextField
            size="small" 
            type="email"
            className="custom-text-field" 
            name="emailId"
            value={detail.emailId}
            onChange={e => handleChange(e, index)}
            label="Email Id"
            error={Boolean(errors['emailId'])}  // Show red border if error exists
            helperText={errors['emailId']} 
            fullWidth
          />
        </Grid>
        </Grid>


        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Alternate Address & Contact Details</div></div>

        <Grid container  spacing={2}>

        <Grid item xs={12} sm={8}>
          {/* <InputLabel className="ip-label">Customer Address</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="alternateCustomerAddress"
            multiline
            rows={4}
            value={detail.alternateCustomerAddress}
            onChange={e => handleChange(e, index)}
            label="Alternate Customer Address"
            fullWidth
          />

        </Grid>



        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Telephone Number</InputLabel > */}
          <TextField
            size="small" 
            className="custom-text-field" 
            name="alternateMobileNumber"
            value={detail.alternateMobileNumber}
            onChange={e => handleChange(e, index)}
            label="Alternate Mobile Number"
            error={Boolean(errors['alternateMobileNumber'])}  // Show red border if error exists
            helperText={errors['alternateMobileNumber']} 
            fullWidth
          />
        </Grid>


        <Grid item xs={12} sm={4}>
          {/* <InputLabel className="ip-label"  >Telephone Number</InputLabel > */}
          <TextField
            size="small" 
            type="email"
            className="custom-text-field" 
            name="alternateemailId"
            value={detail.alternateemailId}
            onChange={e => handleChange(e, index)}
            label="Alternate Email Id"
            error={Boolean(errors['alternateemailId'])}  // Show red border if error exists
            helperText={errors['alternateemailId']} 
            fullWidth
          />
        </Grid>

        </Grid>



        <div className="MuiBox-root css-2e6lci"><svg width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle "><g><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></g></svg><div class="MuiBox-root css-1isemmb">Tax Details</div></div>

        <Grid container  spacing={2}>

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
        
        {!rId&&!formData.customerReferenceNumber?(<Button className="submit-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} type="submit" onClick ={(e)=>handleSubmit(e,formData,navigate,setErrors,validateField)} variant="contained" >Submit</Button>) : (
          <>
            <Button className="update-btn" sx={{margin:"1rem 1rem 0rem 1rem"}} variant="contained" onClick={(e)=>handleUpdate(e,formData,rId,navigate)} >Update</Button>
            <Button className="cancel-btn"  variant="contained" onClick={cancelUpdate} >Cancel</Button> </>)}
          </Grid>
        </Grid>
      </form>
    </Container>
  );

}

