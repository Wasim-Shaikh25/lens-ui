import {React, createContext, useContext} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function EditRotary() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const [isDeleted, setIsDeleted] = useState(false);  
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();  
  // const { editData, setEditData } = useContext(AppContext); // Accessing context values


  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  useEffect(() => {
    axios.get(`https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/getAllRotaryJointByFilter?pageNo=${currentPage}&pageSize=${itemsPerPage}`)
      .then(res => {
        setData(res.data);
        console.log("the fetched data is ",res.data);
        setIsDeleted(false)
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }, [currentPage, itemsPerPage]);
    
    
    
    
    const editDetail = (detail) => {
      // setEditData(detail.customerReferenceNumber);
      console.log("edit detail is ", detail.rotaryDrfNumber);
      navigate(`/createRotary/${detail.rotaryDrfNumber}`)
    };
    


  // const deleteDetail =async (crId) => {
  //   axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/pumSeal/delete?pumSealDrfNo=${crId}`)
  //   .then(res=>{
  //     console.log(res)
  //     console.log("data is",data)
  //     const newData = data.filter(item => item.pumSealDrfNo !== crId);
  //     console.log("New data is",newData)
  //     setIsDeleted(true)
  //     setData(newData);

  //   }).catch(err=>{
  //     console.log(err)
  //   })


    
  //   console.log("customer reference id of deletion elem is ", crId);
  // };



  const deleteDetail = async (crId) => {
    try {
      await axios.delete(`https://lens-svc.azurewebsites.net/lens-svc/rotaryJoint/delete?rotaryJointDrfNo=${crId}`);
      const newData = data.filter(item => item.rotaryDrfNumber !== crId);
      console.log("data is ",data)
      console.log("New data is ",newData)
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  };



  const paginate = (items)=>{
     setItemsPerPage(items);
      setCurrentPage(0)
  }



  return (
    <div>
      <TableContainer component={Paper} style={{ width: '86%', margin: '10px auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No</StyledTableCell>
              <StyledTableCell align="right">Rotary Drf Number</StyledTableCell>
              <StyledTableCell align="right">Branch</StyledTableCell>
              <StyledTableCell align="right">model</StyledTableCell>
              <StyledTableCell align="right">Equipment</StyledTableCell>
              <StyledTableCell align="right">Equipment</StyledTableCell>
              <StyledTableCell align="right">Speed</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>

        {data.length?
          <TableBody>
            {data.map((row,index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index+1}
                </StyledTableCell>
              
                <StyledTableCell align="right">{row.rotaryDrfNumber}</StyledTableCell>
                <StyledTableCell align="right">{row.branch}</StyledTableCell>
                <StyledTableCell align="right">{row.model}</StyledTableCell>
                <StyledTableCell align="right">{row.equipment}</StyledTableCell>
                <StyledTableCell align="right">{row.speed}</StyledTableCell>
                <StyledTableCell align="right">{row.flowRate}</StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={() => editDetail(row)} style={{margin:'0px 3px', border:'none', backgroundColor:'transparent', cursor:'pointer'}}><EditIcon style={{ color: 'blue' }} /></button>
                  <button style={{border:'none', backgroundColor:'transparent', cursor:'pointer'}} 
                  onClick={() => deleteDetail(row.rotaryDrfNumber)}><DeleteIcon style={{ color: 'red' }} /></button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody> :

          <h2 style={{textAlign:"center"}}>No More Data Found!</h2>
        }
        </Table>
      </TableContainer>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center', marginTop: '20px' }}>

      <label style={{margin:'0px 5px'}}>
          Items Per Page :
        </label>

        <select
    value={itemsPerPage}
    onChange={(e) => paginate(e.target.value)}
    style={{
      cursor: 'pointer',
      padding: '5px 10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      marginRight:'5rem',
      borderRadius: '5px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }} >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
</select>
        


        <label style={{margin:'0px 5px'}}>
          Select Page :
        </label>
    <button style={{color:"white",backgroundColor:"black", padding:"5px",border:'2px solid', borderRadius:'5px',  margin:"0px 5px", cursor:'pointer' }} disabled={currentPage<=0} onClick={()=>setCurrentPage(currentPage-1)}>&larr; Previous</button>
      <span style={{padding:'2px 5px',border:'1px solid black', color:'black'}}>{currentPage + 1}</span>
    <button  style={{color:"white",backgroundColor:"black", padding:"5px",border:'2px solid', borderRadius:'5px', margin:"0px 5px", cursor:'pointer' }} disabled={data.length < itemsPerPage && !isDeleted} onClick={()=>setCurrentPage(currentPage+1)}>Next &rarr;</button>

</div>

    </div>
  );
}
