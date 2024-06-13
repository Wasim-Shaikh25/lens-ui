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





// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
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
                    size="small"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    required
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
                    size="small"
                    required
                    fullWidth
                    id="designation"
                    label="Designation"
                    name="designation"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    size="small"
                    required
                    fullWidth
                    id="empId"
                    label="Employee ID"
                    name="empId"
                    autoComplete="family-name"
                  />
                </Grid>

                <Grid item xs={12}>
                  {/* <InputLabel className="ip-label" >Department</InputLabel > */}

                  <Autocomplete
                    size="small"
                    // value={formData.pumpType}
                    // onChange={(event, newValue) => {
                    //   setFormData({
                    //     ...formData,
                    //     pumpType: newValue
                    //   });
                    // }}
                    // onFocus={()=>getColumnData('Pump Type', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
                    // inputValue={formData.pumpType || ''}
                    // onInputChange={(event, newInputValue) => {
                    //   setFormData({
                    //     ...formData,
                    //     pumpType: newInputValue
                    //   });
                    // }}
                    // options={ptOption}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        label="Department"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </Grid>


                <Grid item xs={12}>
                  {/* <InputLabel className="ip-label" >Department</InputLabel > */}

                  <Autocomplete
                    size="small"
                    // value={formData.pumpType}
                    // onChange={(event, newValue) => {
                    //   setFormData({
                    //     ...formData,
                    //     pumpType: newValue
                    //   });
                    // }}
                    // onFocus={()=>getColumnData('Pump Type', setptOption,setarOption,setsaOption,setstOption,setstgOption,setcstOption,setpfOption,setfnOption)}
                    // inputValue={formData.pumpType || ''}
                    // onInputChange={(event, newInputValue) => {
                    //   setFormData({
                    //     ...formData,
                    //     pumpType: newInputValue
                    //   });
                    // }}
                    // options={ptOption}
                    renderInput={(params) => (
                      <TextField
                        size="small"
                        {...params}
                        label="Branch"
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
                sx={{ mt: 2, mb: 1 }}
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