import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { tokens } from "../../theme";
import { ColorModeContext } from "../../theme";
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import hassan_usmani21 from "../../assets/hassan_usmani21.webp";
import PersonIcon from '@mui/icons-material/Person';
import { useParams } from "react-router-dom";


const CustomSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const colorMode = useContext(ColorModeContext);
  const backgroundColor = colorMode === "dark" ? colors.primary[900] : theme.palette.background.default;
  const navigate = useNavigate();

  
  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color when component unmounts
    };
  }, [backgroundColor]);




  

  // Set the background color for sub-menu items in dark mode
  const subMenuItemStyle = colorMode === "dark" ? { backgroundColor: colors.primary[900] } : {};

  
    // const handleMenuItemClick = () => {
    //   // Hide the sidebar when a menu item is clicked
    //   setIsCollapsed(true);
    // };

    
  
  

  return (
    <Box
      id="sidebar"
      height="100vh"
      bgcolor={backgroundColor}
      style={{
        overflowY: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 2,
        paddingRight:'0px'
      }}
      pr={2}

      sx={{
        // ... (previous styles)
        "& .css-dip3t8": {
          backgroundColor: "transparent !important",
        }

      }}>


      <div style={{ display: "flex", height: "100vh", justifyContent: "center" }}>
        <Sidebar
          id="custom-sidebar"
          collapsed={isCollapsed}
          style={{
            backgroundColor:
              colorMode === "dark" ? colors.primary[900] : theme.palette.background.default,
            flex: 1,
            overflowY: "auto",
          }}

        
          
        >
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],

              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Admin
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={hassan_usmani21}
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    color={colors.red}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Ed Roh
                  </Typography>
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    VP Fancy Admin
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}
            sx={{
              "& .css-1097eso": {
                display: 'inline',
              },
            }}
          
            >
              <Menu>
                {/* Customer */}
                <SubMenu label="Customer" icon={<PersonIcon />} styles={{ subMenu: subMenuItemStyle,}}

                >
                  <MenuItem icon={<AddBoxIcon />}
                  onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/Customer">New</Link> 
                  </MenuItem>


                  <MenuItem icon={<EditIcon />}
                   onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/editCustomer">Edit</Link>
                  </MenuItem>

                  
                </SubMenu>

                {/* Sales Inquiry */}
                <SubMenu label="Sales Inquiry" 
                icon={<PersonIcon />} 
                styles={{ subMenu: subMenuItemStyle }}>
 
                <MenuItem icon={<AddBoxIcon />}
                  onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/SalesInquiry">New</Link>
                  </MenuItem>

                  <MenuItem icon={<EditIcon />}  onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/editSales">Edit</Link></MenuItem>
                </SubMenu>

                {/* Drawing Requisition */}
                <SubMenu label="Drawing Requisition" icon={<ImageIcon />} styles={{ subMenu: subMenuItemStyle }}>
                  <Link to ='/createPump'><MenuItem icon={<AddBoxIcon />}>PumpSeal New </MenuItem></Link>
                  <Link to ='/editPump'><MenuItem icon={<AddBoxIcon />}>Edit</MenuItem></Link>
                  <Link to ='/createRotary'><MenuItem icon={<AddBoxIcon />}>Rotary Join New</MenuItem></Link>
                  <Link to ='/editRotary'><MenuItem icon={<AddBoxIcon />}>Edit Rotary Join</MenuItem></Link>
                  <Link to ='/createApi'><MenuItem icon={<AddBoxIcon />}>API Plan New</MenuItem></Link>
                  <Link to ='/editApi'><MenuItem icon={<AddBoxIcon />}>Edit API Plan</MenuItem></Link>
                  <MenuItem icon={<AddBoxIcon />}>Agitator Seal New</MenuItem>
                  <MenuItem icon={<AddBoxIcon />}>Status</MenuItem>
                  <MenuItem icon={<AddBoxIcon />}>Status</MenuItem>
                  <MenuItem icon={<AddBoxIcon />}>Status Filter</MenuItem>
                </SubMenu>

                {/* Quotation */}
                <SubMenu label="Quotation" 
                icon={<PersonIcon />} 
                styles={{ subMenu: subMenuItemStyle }}>
                   <MenuItem icon={<EditIcon />}
                  onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/Quotation">Edit</Link>
                  </MenuItem>
                  <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                </SubMenu>

                {/* Ofm */}
                <SubMenu label="Ofm" icon={<PersonIcon />} styles={{ subMenu: subMenuItemStyle }}>
                <MenuItem icon={<EditIcon />}
                  onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/OfmId">Edit</Link>
                  </MenuItem>
                  <MenuItem icon={<EditIcon />}>Edit</MenuItem>
                </SubMenu>

                {/* Ofm Communication */}
                <SubMenu label="Ofm Communication" icon={<PersonIcon />} styles={{ subMenu: subMenuItemStyle }}>
                  <MenuItem icon={<AddBoxIcon />}>Dashboard</MenuItem>
                  <MenuItem icon={<EditIcon />}
                  onClick={() => setIsCollapsed(!isCollapsed)}>
                    <Link to="/OfmCommunication">Ofm Communication List</Link>
                  </MenuItem>
                  <MenuItem icon={<EditIcon />}>Ofm To OA-Link</MenuItem>
                </SubMenu>

              </Menu>
            </Box>
          </Menu>
        </Sidebar>
      </div>
    </Box>
  );
};

export default CustomSidebar;