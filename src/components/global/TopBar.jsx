import { Box, IconButton } from "@mui/material";


import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import SearchIcon from "@mui/icons-material/Search";

 const Topbar = () => {

  return (
    <Box 
    display="flex" 
    justifyContent="space-between" 
    p={2} 
    sx={{
      boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)", // Adjust values as needed
    }}
    
    >
  
 

      {/* ICONS */}
      <Box 
      display="flex"
      justifyContent='flex-end'
      marginLeft="85%"
      >

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