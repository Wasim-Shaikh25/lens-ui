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
import {useNavigate} from 'react-router-dom';
import { getAllCustomer } from '../../../apis/CustomerApi';
import { deleteDetail } from '../../../apis/CustomerApi';



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




export default function EditCustomer() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const [isDeleted, setIsDeleted] = useState(false);  
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();  


  useEffect(() => {
    getAllCustomer(currentPage, itemsPerPage, setData, setIsDeleted);
    }, [currentPage, itemsPerPage]);
    
    
    
    
    const editDetail = (detail) => {
      // setEditData(detail.customerReferenceNumber);
      console.log("edit detail is ", detail.customerReferenceNumber);
      navigate(`/Customer/${detail.customerReferenceNumber}`)
    };
    

  const paginate = (items)=>{
     setItemsPerPage(items);
      setCurrentPage(0)
  }



  return (
    <div>
      <TableContainer component={Paper} style={{maxWidth:'80%',margin: '10px auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr No</StyledTableCell>
              <StyledTableCell align="right">Reference Number</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Branch ID</StyledTableCell>
              <StyledTableCell align="right">Inserted On</StyledTableCell>
              <StyledTableCell align="right">Last Updated On</StyledTableCell>
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
              
                <StyledTableCell align="right">{row.customerReferenceNumber}</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.branchId}</StyledTableCell>
                <StyledTableCell align="right">{row.insertedOn}</StyledTableCell>
                <StyledTableCell align="right">{row.lastUpdatedOn}</StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={() => editDetail(row)} style={{margin:'0px 3px', border:'none', backgroundColor:'transparent', cursor:'pointer'}}><EditIcon style={{ color: 'blue' }} /></button>
                  <button style={{border:'none', backgroundColor:'transparent', cursor:'pointer'}} onClick={() => deleteDetail(row.customerReferenceNumber,data,setIsDeleted,setData)}><DeleteIcon style={{ color: 'red' }} /></button>
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
