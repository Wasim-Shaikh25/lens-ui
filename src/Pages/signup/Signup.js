import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, InputLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function SignUp() {
  const [designation, setDesignation] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();


 const[formData,setFormData]= useState({

  firstName: "",
  lastName: "",
  empId: "",
  password: "",
  designation: '',
  insertedByUserId: "",
  lastUpdatedByUserId: "",
  resetPasswordRequired: false,
  departments: [
  {
      departmentName:""
    }
  ],
  branches: [
    {
      branchName: "",
      region: ""
    }
  ]
 }) 

 
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value
  }));
};


 //get All Designation
 const getDesignation = async()=>{
  try{
    const res = await axios.get('http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/user/allDesignations');
    const{data} = res;
    setDesignation(data);
    console.log(formData)
  }
  catch(err){
    console.log(err);
  }

 }


 //get All Departments
 const getDepartments = async()=>{
  try{
    const res = await axios.get('http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/user/getAllDepartments');
    const{data} = res;
    setDepartments(data);
    console.log(data)
  }
  catch(err){
    console.log(err);
  }
 }


 //get All Branches
 const getBranches = async()=>{
  try{
    const res = await axios.get('http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/user/getAllBranches');
    const{data} = res;
    setBranches(data);
    console.log(data)
  }
  catch(err){
    console.log(err);
  }
 }




  const handleSubmit = async(e) => {
    e.preventDefault();
    formData.departments[0].region = formData.departments[0].departmentName;
    formData.lastUpdatedByUserId = formData.empId;
    

    try{
      const res = await axios.post('http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/user/createAccount',formData);
      const{data} = res;
      console.log("response Data ",data);
      navigate('/reset')
    }
    catch(err){
      console.log(err);

    }

  };

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div className='card' sx={{
           padding: "2px", marginBottom:"5rem", borderRadius: "8px", border: "1px solid #ddd",
          backgroundColor: "white", boxShadow: "rgba(90, 114, 123, 0.11) 0px 7px 30px 0px"
        }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography component="h5" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    autoComplete="given-name"
                    name="firstName"
                    required
                    value={formData.firstName}
                    fullWidth
                    id="firstName"
                    onChange={(e)=>handleChange(e)}
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={formData.lastName}
                    size="small"
                    onChange={(e)=>handleChange(e)}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={formData.email}
                    size="small"
                    required
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  value={formData.password}
                    size="small"
                    required
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                  value={formData.empId}
                    size="small"
                    required
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    autoComplete="family-name"
                  />
                </Grid>

                  
      <Grid item xs={12} sm={6}>
        <Autocomplete
          size="small"
          value={formData.designation}
          onChange={(event, newValue) => {
            setFormData({
              ...formData,
              designation: newValue
            });
          }}
          inputValue={formData.designation || ''}
          onInputChange={(event, newInputValue) => {
            setFormData({
              ...formData,
              designation: newInputValue
            });
          }}
          options={designation}
          onFocus={getDesignation}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Designation"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>

              

      <Grid item xs={12}>
                  <Autocomplete
                    size="small"
                    value={formData.departments[0].departmentName}
                    onChange={(event, newValue) => {
                      setFormData({
                        ...formData,
                        departments: [{ departmentName: newValue }]
                      });
                    }}
                    inputValue={formData.departments[0].departmentName}
                    onInputChange={(event, newInputValue) => {
                      setFormData({
                        ...formData,
                        departments: [{ departmentName: newInputValue }]
                      });
                    }}
                    options={departments.map((department) => department.departmentName)}
                    onFocus={getDepartments}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        label="Department"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>

      <Grid item xs={12} >
        <Autocomplete
          size="small"
          value={formData.branches[0].branchName}
          onChange={(event, newValue) => {
            setFormData({
              ...formData,
              branches:[{branchName: newValue}]
            });
          }}
          inputValue={formData.branches[0].branchName || ''}
          onInputChange={(event, newInputValue) => {
            setFormData({
              ...formData,
              branches:[{branchName: newInputValue}]
            });
          }}
          options={branches.map((branch) => branch.branchName)}
          onFocus={getBranches}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              label="Branches"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>




              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/login" style={{cursor:"pointer"}}  variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </div>
      </Container>
    </ThemeProvider>
  );
}