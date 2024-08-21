import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';


const OfmSuccess = () => {
    const navigate = useNavigate();

    return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <CheckCircleOutlineIcon style={{ fontSize: 100, color: 'green' }} />
      <Typography variant="h3" gutterBottom style={{ marginTop: '20px' }}>
        Order Forwading Memo Updated Successfully!
      </Typography>
      <Button variant="contained" color="primary" onClick={()=>navigate('/editOfm')}>
        Home
      </Button>
    </Container>
  );
};

export default OfmSuccess;
