import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const RegistrationSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Registration Successful!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
        Thank you for registering with us, Your Customer Reference Number is <b>: {id}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/')}>
        Home
      </Button>
    </Container>
  );
};

export default RegistrationSuccessPage;
