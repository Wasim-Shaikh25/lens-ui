import { Box, Button, IconButton, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate } from "react-router-dom";
import { alpha } from '@mui/material/styles';
import { useAuth } from '../../contextApi/AuthContext';


 const Topbar = ({isSidebar, setIsSidebar}) => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate()  

  console.log("loggedIn user is ", authState);


  const iconStyle={ 
    width:"1.6em",
    height:"100%",
    color: '#5A5A5A',
          position: "sticky",
          padding:"5px",
          borderRadius:"5px",
          cursor:"pointer",
        }


        const userLogout = () => {
          logout()
          navigate('/login'); // Redirect to login page after logout
        };

        

  return (
    <Box 
    display="flex" 
    justifyContent="space-between"
    position="fixed"
    top="0"
    zIndex="100"
    backgroundColor="white"
    p={2} 
    sx={{
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Adjust values as needed
      width:"100%" }}>
  
  
 {isSidebar? 
         <MenuIcon onClick={() =>setIsSidebar(!isSidebar)}   sx={iconStyle}/>
  :
        <KeyboardBackspaceIcon  onClick={() =>setIsSidebar(!isSidebar)} sx={iconStyle}/>
 }


      {/* ICONS */}
      <Box 
      display="flex"
      justifyContent='flex-end'
      >
        <Link to='signup'>  <Button size="small"  sx={{backgroundColor:"#03C9D7",color:"white",marginTop:"4px",
      '&:hover': {
        backgroundColor: alpha("#03C9D7", 0.8) // Adjust the alpha value to make it slightly darker
      }}}>SignUp</Button>
</Link>
     
     { !authState? <Link to='/login'>  <Button size="small"  sx={{backgroundColor:"#03C9D7",color:"white",margin:"4px",
      '&:hover': {
        backgroundColor: alpha("#03C9D7", 0.8) // Adjust the alpha value to make it slightly darker
      }}}>Login</Button>
</Link> :
       <Button onClick={userLogout} size="small"  sx={{backgroundColor:"#FF0000",color:"white",margin:"4px",
      '&:hover': {
        backgroundColor: alpha("#FF0000", 0.8) // Adjust the alpha value to make it slightly darker
      }}}>Logout</Button>
}
        <IconButton>
         <NotificationsOutlinedIcon /> 
        </IconButton> 
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />  {authState? <span style={{fontSize:'0.8rem', marginLeft:'0.5rem'}}>Welcome, <b>{authState.authorities}</b></span> : null}
        </IconButton>
      </Box>
    </Box>
  );
};


export default Topbar;