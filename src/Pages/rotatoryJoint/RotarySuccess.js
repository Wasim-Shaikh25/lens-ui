import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const RotarySuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Rotary Joint Created Successfully!
      </Typography>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
          Rotary DRF Number is <b>: {id}</b>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editRotary')}>
         Rotary Details
      </Button>
    </Container>
  );
};

export default RotarySuccessPage;
