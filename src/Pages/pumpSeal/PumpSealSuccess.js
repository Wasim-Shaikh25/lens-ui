import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const PumpSealSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Seal Pump Added Successfully!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
         Your Pump Seal ID is <b>: {id}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editPump')}>
         Pump Seal Details
      </Button>
    </Container>
  );
};

export default PumpSealSuccessPage;
