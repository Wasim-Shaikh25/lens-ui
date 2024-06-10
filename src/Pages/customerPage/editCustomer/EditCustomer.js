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
import { getAllCustomer } from '../../../apis/CustomerApi';
import { deleteDetail } from '../../../apis/CustomerApi';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';




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

<div style={{display:"flex", justifyContent:"space-between",flexWrap:"wrap",gap:"16px",padding:"25px",backgroundColor:"white",border:"1px solid #ddd",boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px",margin:"1rem auto", borderRadius:"8px",width:"85%"}}>


<Grid item xs={12} sm={4}>
<InputLabel className="ip-label">Customer Reference No</InputLabel>
    <TextField
      size="small"
      className="text-field"
      name="customerReferenceNumber"
      // value={}
    />
  </Grid>
<Grid item xs={12} sm={4}>
  <InputLabel className="ip-label">Branch</InputLabel>
  <TextField
    size="small"
    className="text-field"
    name="branch"
    // value={}
    // onChange={handleChange}
  />
</Grid>

<Grid item xs={12} sm={4}>
  <InputLabel className="ip-label">Customer Name</InputLabel>
  <TextField
    size="small"
    className="text-field"
    name="customerName"
    // value={}
    // onChange={handleChange}
  />
</Grid>

<Button  style={{width:"100%", color:"white", backgroundColor:"#03C9D7"}} variant="contained">
  Search
</Button>

</div>

    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">Reference Number</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Branch ID</TableCell>
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
                <TableCell align="right">{row.customerReferenceNumber}</TableCell>
                <TableCell align="right">{row.customerName}</TableCell>
                <TableCell align="right">{row.branch}</TableCell>
                <TableCell align="right">{row.insertedOn}</TableCell>
                <TableCell align="right">{row.lastUpdatedOn}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.customerReferenceNumber, data, setIsDeleted, setData)}>
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
        <select value={itemsPerPage} onChange={(e) => paginate(e.target.value)} className="pagination-select">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <label className="pagination-label">Select Page:</label>
        <button className="pagination-button" disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)}>
          <ArrowLeftIcon style={{ height: '1rem' }} />
        </button>
        <span className="pagination-span">{currentPage + 1}</span>
        <button className="pagination-button" disabled={data.length < itemsPerPage && !isDeleted} onClick={() => setCurrentPage(currentPage + 1)}>
          <ArrowRightIcon style={{ height: '1rem' }} />
        </button>
      </div>
      <hr style={{ border: '1px solid lightGray' }} />
    </TableContainer>
  </div>
);
}













// import React, { useState, useEffect } from 'react';
// import { DataGrid, GridToolbar, GridActionsCellItem } from '@mui/x-data-grid';
// import { useNavigate } from 'react-router-dom';
// import { getAllCustomer, deleteDetail } from '../../../apis/CustomerApi';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// export default function EditCustomer() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isDeleted, setIsDeleted] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
//   const navigate = useNavigate();
  

//   const columns = [
//     { field: 'customerId', headerName: 'ID', width: 50 },
//     { field: 'customerReferenceNumber', headerName: 'Reference Number', width: 130 },
//     {
//       field: 'customerName',
//       headerName: 'Name',
//       width: 100,
//     },
//     { field: 'branch', headerName: 'Branch', width: 60 },
//     {
//       field: 'insertedOn',
//       headerName: 'Inserted On',
//       width: 130,
//     },
//     {
//       field: 'lastUpdatedOn',
//       headerName: 'LastUpdated On',
//       width: 130,
//     },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       width: 80,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             style={{color:"blue"}}
//             label="Edit"
//             onClick={() => editDetail(params.row)}
//           />
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             style={{color:"red"}}
//             label="Delete"
//             onClick={() => deleteDetail(params.row.customerReferenceNumber,data,setIsDeleted,setData)}
//           />
//         </>
//       ),
//     },
//   ];


//   useEffect(() => {
//     getAllCustomer(currentPage, itemsPerPage, (fetchedData) => {
//       setData(fetchedData);
//       setIsDeleted(false);
//     });
//   }, [currentPage, itemsPerPage]);


//   const editDetail = (detail) => {
//     console.log("edit detail is ", detail.customerReferenceNumber);
//     navigate(`/Customer/${detail.customerReferenceNumber}`);
//   };


//   const paginate = (items) => {
//     setItemsPerPage(items);
//     setCurrentPage(0);
//   };


//   return (
//     <div  style={{ height: 400, maxWidth: '80%', margin: "3rem auto", padding:"20px",borderRadius:"10px",backgroundColor:"white",boxShadow:"rgba(90, 114, 123, 0.11) 0px 7px 30px 0px" }}>
//       <DataGrid
//       style={{backgroundColor:"white", maxWidth:"fit-content", margin:"0 auto"}}
//         rows={data}
//         getRowId={(row) => row.customerId} // Ensure each row has a unique ID
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         checkboxSelection
//         components={{
//           Toolbar: GridToolbar,
//         }}
//       />
//     </div>
//   );
// }


