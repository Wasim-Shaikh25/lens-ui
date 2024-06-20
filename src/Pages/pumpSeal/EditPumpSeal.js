
import {React, createContext, useContext} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { getAll, deleteDetail, searchFilter } from '../../apis/PumpSealApi';
import'../../App.css'
import useToken from '../../contextApi/useToken';



export default function EditPump() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);  
  const [isDeleted, setIsDeleted] = useState(false);  
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const navigate = useNavigate();  
  const [pumpSealDrfNumber, setPumpSealDrfNumber] = useState();
  const [customerName, setcustomerName] = useState();
  const [branch, setBranch] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const token = useToken();



  // useEffect(() => {
  //   getAll(currentPage, itemsPerPage,setData, setIsDeleted)
    
  // }, []);
  

  useEffect(() => {
    searchFilter(startDate, endDate, branch, customerName, pumpSealDrfNumber, currentPage, itemsPerPage, setData, token);
  }, [currentPage, itemsPerPage]);



  const handleSearch = () => {
    setCurrentPage(0);  // Reset to first page on new search
    searchFilter(startDate, endDate, branch, customerName, pumpSealDrfNumber, 0, itemsPerPage, setData,token);
  };

  
  
  
  const editDetail = (detail) => {
    // setEditData(detail.customerReferenceNumber);
    console.log("edit detail is ", detail.pumSealDrfNo);
    navigate(`/createPump/${detail.pumpSealDrfNumber}`)
  };
  
    const handleItemsPerPageChange = (e) => {
      setItemsPerPage(Number(e.target.value));
      setCurrentPage(0);  // Reset to first page when items per page change
    };



return (
  <div >
    <h2 style={{margin:"1rem 5rem"}}>Search and Filter</h2>

<div style={{backgroundColor:"white",border:"1px solid #ddd",boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px",margin:"1rem auto", borderRadius:"8px",width:"85%"}}>
<div style={{display:"flex", justifyContent:"space-between",flexWrap:"wrap",gap:"18px",padding:"25px",}}>



<Grid item xs={12} sm={4}>
<InputLabel className="ip-label">Pump Seal Drf No</InputLabel>
    <TextField
      size="small"
      className="text-field"
      name="pumpSealDrfNumber"
      value={pumpSealDrfNumber}
      onChange={(e)=>setPumpSealDrfNumber(e.target.value)}
    />
  </Grid>
<Grid item xs={12} sm={4}>
  <InputLabel className="ip-label">Branch</InputLabel>
  <TextField
    size="small"
    className="text-field"
    name="branch"
    value={branch}
    onChange={(e)=>setBranch(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <InputLabel className="ip-label">Customer Name</InputLabel>
  <TextField
    size="small"
    className="text-field"
    name="customerName"
    value={customerName}
    onChange={(e)=>setcustomerName(e.target.value)}
  />
</Grid>

<Grid item xs={12} sm={5}>
        <InputLabel className="ip-label">Start Date</InputLabel>
        <TextField
        size="small"
        type="datetime-local"
        value={startDate}
        onChange={(e)=>setStartDate(e.target.value)}
      />
      </Grid>

<Grid item xs={12} sm={4}>
        <InputLabel className="ip-label">End Date</InputLabel>
        <TextField
        size="small"
        type="datetime-local"
        value={endDate}
        onChange={(e)=>setEndDate(e.target.value)}
      />
      </Grid>

</div>

<Button onClick={handleSearch}  style={{width:"15%",margin:"1rem 2rem", color:"white", backgroundColor:"#03C9D7"}} variant="contained">
  Search
</Button>





    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">PumpSeal Drf Number</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Branch</TableCell>
            <TableCell align="right">Inserted On</TableCell>
            <TableCell align="right">Last Updated On</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>


        {data.length ? (
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="table-row">
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{row.pumpSealDrfNumber}</TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.branch}</TableCell>
                <TableCell align="right">{row.insertedOn}</TableCell>
                <TableCell align="right">{row.lastUpdatedOn}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.pumpSealDrfNumber, data,setData, token)}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <h2 style={{ textAlign: 'center' }}>No More Data Found!</h2>
        )}
      </Table>
      <hr style={{ border: '1px solid lightGray' }} />

      <div className="pagination-container">
        <label className="pagination-label">Items Per Page:</label>
        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="pagination-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <label className="pagination-label">Select Page:</label>
        <button className="pagination-button" disabled={currentPage <= 0}  onClick={() =>setCurrentPage(currentPage-1)}>
          <KeyboardDoubleArrowLeftIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
        <span className="pagination-span">{currentPage + 1}</span>
        <button className="pagination-button" disabled={data.length < itemsPerPage && !isDeleted} onClick={() =>setCurrentPage(currentPage+1) }>
          <KeyboardDoubleArrowRightIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
      </div>
      <hr style={{ border: '1px solid lightGray' }} />
    </TableContainer>
    </div>

  </div>
);
}






