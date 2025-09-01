import {React, useState, useEffect} from 'react'
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { deleteDetail, getAllUser } from '../../apis/UserDashboardApi';

import { TextField ,Button,  Container, Grid, InputLabel , IconButton } from '@mui/material';
import { searchFilter } from '../../apis/UserDashboardApi';


function UserDashboard(){
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);  
    const [isDeleted, setIsDeleted] = useState(false);  
    const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
    const navigate = useNavigate();  

    const [empId, setEmpId] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [branch, setBranch] = useState();
    const [designation,setDesignation] = useState();
    const [department, setDepartment] = useState();
    const [role, setRole] = useState();



    useEffect(() => {
      searchFilter(empId,branch,firstName,lastName,designation,department,role,currentPage,itemsPerPage,setData)
        }, [currentPage, itemsPerPage])
        
        
        console.log("row data is",data)



    const editDetail = (detail) => {
        console.log("edit detail is ", detail.empId);
        navigate(`/CreateUser/${detail.empId}`)
      };
     
        const paginate = (items)=>{
           setItemsPerPage(items);
            setCurrentPage(0)
        }


return (    
  <div className='editContainer' style={{ width:'83%', marginLeft:'5%'}} >
    <h1 style={{marginLeft:'2.5%'}}>User Details :</h1>


    <Grid container spacing={2} >

    <Grid container spacing={2} alignItems="center" sx={{mx:3, my:1}}>

<Grid item  xs={12} sm={3} >
    <TextField
      size="small"
      className="custom-text-field"
      name="empId"
      value={empId}
      onChange={(e)=>setEmpId(e.target.value)}
      label="Employee ID"
    />
  </Grid>


<Grid item  xs={12} sm={3} >
    <TextField
      size="small"
      className="custom-text-field"
      name="firstName"
      value={firstName}
      onChange={(e)=>setFirstName(e.target.value)}
      label="First Name"
    />
  </Grid>



  <Grid item  xs={12} sm={3}>
  {/* <InputLabel className="ip-label">Customer Name</InputLabel> */}
  <TextField
    size="small"
    className="custom-text-field"
    name="lastName"
    value={lastName}
    onChange={(e)=>setLastName(e.target.value)}
    label="Last Name"
  />
</Grid>


<Grid item  xs={12} sm={3} >
{/* <InputLabel className="ip-label">Customer Reference No</InputLabel> */}
    <TextField
      size="small"
      className="custom-text-field"
      name="designation"
      value={designation}
      onChange={(e)=>setDesignation(e.target.value)}
      label="Designation"
    />
  </Grid>

  

<Grid item xs={12} sm={3} >
  {/* <InputLabel className="ip-label">Branch</InputLabel> */}
  <TextField
    size="small"
    className="custom-text-field"
    name="department"
    value={department}
    onChange={(e)=>setDepartment(e.target.value)}
    label="Department"
  />
</Grid>

<Grid item xs={12} sm={3} >
  {/* <InputLabel className="ip-label">Branch</InputLabel> */}
  <TextField
    size="small"
    className="custom-text-field"
    name="role"
    value={role}
    onChange={(e)=>setRole(e.target.value)}
    label="Role"
  />
</Grid>


      </Grid>

      
<Button onClick={()=>searchFilter(empId,branch,firstName,lastName,designation,department,role,currentPage,itemsPerPage,setData)}  style={{width:"15%",margin:"0.8rem 2.5rem", color:"white", backgroundColor:"#03C9D7"}} variant="contained">
  Search
</Button>

    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead className="table-header">
          <TableRow>
            <TableCell>Sr No</TableCell>
            <TableCell align="right">Employee ID</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Designation</TableCell>
            <TableCell align="right">Department</TableCell>
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
                <TableCell align="right">{row?.empId}</TableCell>
                <TableCell align="right">{row?.firstName}</TableCell>
                <TableCell align="right">{row?.lastName}</TableCell>
                <TableCell align="right">{row?.designation.designationName}</TableCell>
                <TableCell align="right">{row?.departments[0]?.departmentName}</TableCell>
                <TableCell align="right">{row?.updatedOn}</TableCell>
                <TableCell align="right">
                  <button onClick={() => editDetail(row)} style={{ margin: '0px 3px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
                    <EditIcon style={{ color: 'blue' }} />
                  </button>
                  <button style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => deleteDetail(row.empId,data,setData, setIsDeleted)}>
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
          <KeyboardDoubleArrowLeftIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
        <span className="pagination-span">{currentPage + 1}</span>
        <button className="pagination-button" disabled={data?.length < itemsPerPage && !isDeleted} onClick={() => setCurrentPage(currentPage + 1)}>
          <KeyboardDoubleArrowRightIcon style={{ height: '0.9rem', marginTop:'0.1rem' }} />
        </button>
      </div>
      <hr style={{ border: '1px solid lightGray' }} />
    </TableContainer>
    </Grid>
  </div>   
)
}

export default UserDashboard