import React from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, Button, InputLabel } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';



function ResetPassword() {

    const defaultTheme = createTheme();
    const[formData,setFormData]= useState({

        empId: '',
        oldPassword: "",
        newPassword: "",
       }) 
     const navigate = useNavigate();

     
 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post('http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/auth/resetPassword',formData);
      const {data} = res;
      navigate('/login')
      console.log("response is ",data)
    }
    catch(err){

    }
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <div className='card' sx={{
           padding: "2px", borderRadius: "8px", border: "1px solid #ddd",
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
              Reset Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    value={formData.empId}
                    size="small"
                    required
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                  value={formData.oldPassword}
                    size="small"
                    required
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                    name="oldPassword"
                    label="Old Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                  value={formData.newPassword}
                    size="small"
                    required
                    onChange={(e)=>handleChange(e)}
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    autoComplete="new-password"
                  />
                </Grid>

              </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Set New Password
              </Button>
                </Box>
                </Box>
                </div>
                </Container>
                </ThemeProvider>


  )
}

export default ResetPassword