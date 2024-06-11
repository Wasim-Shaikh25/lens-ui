import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const AgitatorSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Agitator Seal Created Successfully!
      </Typography>
          Agitator DRF Number is <b>: {id}</b>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editAgitator')}>
         Agitator Details
      </Button>
    </Container>
  );
};

export default AgitatorSuccessPage;
