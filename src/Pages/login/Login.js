import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Autocomplete, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Importing named export




// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Login() {
  const navigate = useNavigate();

  const[formData,setFormData] = useState({
    empId:'',
    password:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async(e) => {
  e.preventDefault();

    try{
      const res = await axios.post('http://lens-env.eba-fanbcwd6.ap-south-1.elasticbeanstalk.com/auth/authenticate',formData);
      const {data} = res;
      const decodedToken = jwtDecode(data.access_token);
      Cookies.set('access_token', data.access_token);
      Cookies.set('decoded_token', JSON.stringify(decodedToken));
      console.log("Token is ", data.access_token);
      console.log("Decoded Token is ", decodedToken);
      navigate('/')
    }
    catch(err){
      console.log(err)
    }

  };

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
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={2}>
              
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    value={formData.empId}
                    required
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    onChange={(e)=>handleChange(e)}
                    name="empId"
                    autoComplete="empId"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    value={formData.password}
                    required
                    fullWidth
                    onChange={(e)=>handleChange(e)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
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
                Login
              </Button>
              <Grid container justifyContent="center" flexDirection="column" alignItems="center">
              <Grid item>
                  <Link to={`/reset/${formData.empId}`} style={{cursor:"pointer"}}  variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link  to="/signup" style={{cursor:"pointer"}} variant="body2">
                    Dont have an account? Sign up
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