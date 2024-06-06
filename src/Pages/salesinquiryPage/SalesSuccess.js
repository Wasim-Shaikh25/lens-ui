import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const SalesSuccessPage = () => {
    const {sId} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Sales Entry Successful!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
        Thank you for Connecting with us, Your Sales Number is <b>: {sId}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editSales')}>
        Home
      </Button>
    </Container>
  );
};

export default SalesSuccessPage;
