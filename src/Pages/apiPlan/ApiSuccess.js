import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const ApiSuccessPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    
    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        API plan Created Successfully!
      </Typography>
          API Plan DRF Number is <b>: {id}</b>
      <Typography variant="body1" style={{ marginBottom: '20px' }}>
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editApi')}>
         API plan Details
      </Button>
    </Container>
  );
};

export default ApiSuccessPage;
