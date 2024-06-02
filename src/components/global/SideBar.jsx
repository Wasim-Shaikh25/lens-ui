import React, { useEffect, useRef, useContext, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import { ColorModeContext } from "../../theme";
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DescriptionIcon from '@mui/icons-material/Description';
import hassan_usmani21 from "../../assets/hassan_usmani21.webp";
import PersonIcon from '@mui/icons-material/Person';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const CustomSidebar = ({ isSidebar, setIsSidebar }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const backgroundColor = colorMode === "dark" ? colors.primary[900] : theme.palette.background.default;
  const sidebarRef = useRef(null);

  const [activeSubMenu, setActiveSubMenu] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = ''; // Reset background color when component unmounts
    };
  }, [backgroundColor]);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebar(true); // Collapse the sidebar
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef, setIsSidebar]);

  const getSubMenuStyle = (menuName) => ({
    backgroundColor: activeSubMenu === menuName ? '#00C292' : 'transparent',
    color: activeSubMenu === menuName ? 'white' : 'black',
    borderRadius: '8px',
    margin: '4px 6px',
  });

  return (
    <Box
      ref={sidebarRef}
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
        paddingRight: '0px'
      }}
      pr={2}
      sx={{
        "& .css-dip3t8": {
          backgroundColor: "transparent !important",
        },
        "& ul, & ul ul": {
          padding: 0,
          margin: 0,
          listStyle: "none !important", // Remove bullet points
        },
        "& li": {
          listStyle: "none !important", // Remove bullet points
        },
        "& .pro-sidebar-content": {
          padding: 0, // Additional specificity
        },
        "& .pro-menu": {
          padding: 0, // Additional specificity
        },
        "& .pro-menu-item": {
          padding: "10px 20px",
          borderRadius: '8px',
          margin: '4px 0',
          "&:hover": {
            backgroundColor: '#03C9D7',
            color: 'white',
          },
        },
        "& .pro-menu-item-active": {
          backgroundColor: '#03C9D7 !important',
          color: 'white !important',
        },
      }}
    >
      <div style={{ display: "flex", height: "100vh", justifyContent: "center", listStyle: "none" }}>
        <Sidebar
          id="custom-sidebar"
          collapsed={isSidebar}
          style={{
            backgroundColor: "#FFFFFF",
            flex: 1,
            overflowY: "auto",
            listStyle: 'none',
            boxShadow: 3,
          }}
        >
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setIsSidebar(!isSidebar)}
              icon={isSidebar ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: 'black',
                listStyleType: "none"
              }}
            >
              {!isSidebar && (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px" pr="15px">
                  <Typography variant="h6" color="black" fontWeight="bold">
                    Admin Panel
                  </Typography>
                  <IconButton onClick={() => setIsSidebar(!isSidebar)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
              <hr />
            </MenuItem>

            {!isSidebar && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar alt="profile-user" src={hassan_usmani21} sx={{ width: 80, height: 80, cursor: "pointer", boxShadow: 3 }} />
                </Box>
                <Box textAlign="center" mt={2}>
                  <Typography variant="h6" color="black" fontWeight="bold">
                    PK
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Hassan Admin
                  </Typography>
                </Box>
              </Box>
            )}
            
            <Box pl={isSidebar ? 0 : 3}>
              <Menu>
                {/* Customer */}
                <SubMenu label={<Typography variant="body1">Customer</Typography>} icon={<PersonIcon />}>
                  <Link to="/Customer" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getSubMenuStyle("Customer New")}
                      onClick={() => setActiveSubMenu("Customer New")}
                    >
                      New
                    </MenuItem>
                  </Link>

                  <Link to="/editCustomer" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getSubMenuStyle("Customer Edit")}
                      onClick={() => setActiveSubMenu("Customer Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>

                {/* Sales Inquiry */}
                <SubMenu label={<Typography variant="body1">Sales Inquiry</Typography>} icon={<LoyaltyIcon />}>
                  <Link to="/SalesInquiry" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getSubMenuStyle("Sales Inquiry New")}
                      onClick={() => setActiveSubMenu("Sales Inquiry New")}
                    >
                      New
                    </MenuItem>
                  </Link>

                  <Link to="/editSales" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getSubMenuStyle("Sales Inquiry Edit")}
                      onClick={() => setActiveSubMenu("Sales Inquiry Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                {/* Drawing Requisition */}
                <SubMenu label="Drawing Requisition" icon={<DescriptionIcon />}>
                  <Link to='/createPump' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getSubMenuStyle("Drawing Requisition PumpSeal New")}
                      onClick={() => setActiveSubMenu("Drawing Requisition PumpSeal New")}
                    >
                      PumpSeal New
                    </MenuItem>
                  </Link>

                  <Link to='/editPump' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getSubMenuStyle("Drawing Requisition Edit")}
                      onClick={() => setActiveSubMenu("Drawing Requisition Edit")}
                    >
                      Edit Pump Seal
                    </MenuItem>
                  </Link>

                  <Link to='/createRotary' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getSubMenuStyle("Drawing Requisition Rotary Join New")}
                      onClick={() => setActiveSubMenu("Drawing Requisition Rotary Join New")}
                    >
                      Rotary Join New
                    </MenuItem>
                  </Link>

                  <Link to='/editRotary' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getSubMenuStyle("Drawing Requisition Edit Rotary Join")}
                      onClick={() => setActiveSubMenu("Drawing Requisition Edit Rotary Join")}
                    >
                      Edit Rotary Join
                    </MenuItem>
                  </Link>

                  <Link to='/createApi' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getSubMenuStyle("Drawing Requisition API Plan New")}
                      onClick={() => setActiveSubMenu("Drawing Requisition API Plan New")}
                    >
                      API Plan New
                    </MenuItem>
                  </Link>

                  <Link to='/editApi' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getSubMenuStyle("Drawing Requisition Edit API Plan")}
                      onClick={() => setActiveSubMenu("Drawing Requisition Edit API Plan")}
                    >
                      Edit API Plan
                    </MenuItem>
                  </Link>

                  <MenuItem
                    icon={<AddBoxIcon />}
                    style={getSubMenuStyle("Drawing Requisition Agitator Seal New")}
                    onClick={() => setActiveSubMenu("Drawing Requisition Agitator Seal New")}
                  >
                    Agitator Seal New
                  </MenuItem>
                  <MenuItem
                    icon={<EditIcon />}
                    style={getSubMenuStyle("Drawing Requisition Edit Agitator")}
                    onClick={() => setActiveSubMenu("Drawing Requisition Edit Agitator")}
                  >
                    Edit Agitator
                  </MenuItem>
                </SubMenu>

                {/* Quotation */}
                <SubMenu label="Quotation" icon={<MonetizationOnIcon />}>
                  <Link to="/Quotation" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getSubMenuStyle("Quotation New")}
                      onClick={() => setActiveSubMenu("Quotation New")}
                    >
                      New
                    </MenuItem>
                  </Link>

                  <Link to="/Quotation" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getSubMenuStyle("Quotation Edit")}
                      onClick={() => setActiveSubMenu("Quotation Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
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




