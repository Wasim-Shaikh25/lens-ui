import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../../App.css'
import { getAllQuotation } from '../../apis/QuotationApi';
import { deleteDetail } from '../../apis/QuotationApi';



function EditQuotation() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  
    const [isDeleted, setIsDeleted] = useState(false);  
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
    const navigate = useNavigate();  
    
  
  
    useEffect(() => {
        getAllQuotation(setData);
  
      }, [currentPage, itemsPerPage]);
      
  
    
      const editDetail = (detail) => {
              // setEditData(detail.customerReferenceNumber);
              console.log("edit detail is ", detail.inquiryNumber);
              navigate(`/quotation/${detail.quotationId}`)
            };
            
       
          const paginate = (items)=>{
             setItemsPerPage(items);
              setCurrentPage(0)
          }
  
  
  return (
    <div className='editContainer' style={{ width:'83%', marginLeft:'5%'}} >

    <h2>Quotation Details :</h2>
  
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead className="table-header">
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell align="right">Quotation Id</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Branch ID</TableCell>
              <TableCell align="right">Inserted On</TableCell>
              <TableCell align="right">Last Updated On</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
  
  
          {data?.length ? (
            <TableBody>
              {data?.map((row, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.quotationId}</TableCell>
                  <TableCell align="right">{row.customer}</TableCell>
                  <TableCell align="right">{row.branch}</TableCell>
                  <TableCell align="right">{row.insertedOn}</TableCell>
                  <TableCell align="right">{row.lastUpdatedOn}</TableCell>
                  <TableCell align="right">
                    <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                      <EditIcon style={{ color: 'blue' }} />
                    </button>
                    <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.quotationId,data,setData, setIsDeleted)}>
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

        {/* <hr style={{ border: '1px solid lightGray' }} /> */}
  
        {/* <div className="pagination-container">
          <label className="pagination-label">Items Per Page:</label>
          <select value={itemsPerPage} onChange={(e) => paginate(e.target.value)} className="pagination-select">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
  
          <label className="pagination-label">Select Page:</label>
          <button className="pagination-button" disabled={currentPage <= 0} onClick={() => setCurrentPage(currentPage - 1)}>
            <KeyboardDoubleArrowLeftIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
          </button>
          <span className="pagination-span">{currentPage + 1}</span>
          <button className="pagination-button" disabled={data.length < itemsPerPage && !isDeleted} onClick={() => setCurrentPage(currentPage + 1)}>
            <KeyboardDoubleArrowRightIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
          </button>
        </div>
        <hr style={{ border: '1px solid lightGray' }} /> */}
      </TableContainer>
    </div>
    // </div>
  );
}

export default EditQuotation