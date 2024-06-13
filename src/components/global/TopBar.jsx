import { Box, Button, IconButton, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from "react-router-dom";
import { alpha } from '@mui/material/styles';



 const Topbar = ({isSidebar, setIsSidebar}) => {

  const iconStyle={ 
    width:"1.6em",
    height:"100%",
    color: '#5A5A5A',
          position: "sticky",
          padding:"5px",
          borderRadius:"5px",
          cursor:"pointer",
        }


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
        <Link to='login'>  <Button size="small"  sx={{backgroundColor:"#03C9D7",color:"white",margin:"4px",
      '&:hover': {
        backgroundColor: alpha("#03C9D7", 0.8) // Adjust the alpha value to make it slightly darker
      }}}>Login</Button>
</Link>
        <IconButton>
         <NotificationsOutlinedIcon /> 
        </IconButton> 
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};


export default Topbar;