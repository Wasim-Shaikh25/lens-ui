import {React,useState,useRef,useContext, useEffect} from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ColorModeContext } from "../../theme";
import EditIcon from "@mui/icons-material/Edit";
import { tokens } from "../../theme";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/AuthContext";
import GroupIcon from '@mui/icons-material/Group';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';



const CustomSidebar = ({isSidebar,setIsSidebar}) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const colorMode = useContext(ColorModeContext);
      const backgroundColor = colorMode === "dark" ? colors.primary[900] : theme.palette.background.default;
      const sidebarRef = useRef(null);
      const {logout, authState} = useAuth();
      const navigate = useNavigate();
    
      const [activeSubMenu, setActiveSubMenu] = useState("");
      const [activeItemMenu, setActiveItemMenu] = useState("");

      
      useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
        return () => {
          document.body.style.backgroundColor = ''; // Reset background color when component unmounts
        };
      }, [backgroundColor]);
    
    

    
      const getSubMenuStyle = (menuName) => ({
        backgroundColor: activeSubMenu === menuName ? '#00CEC3' : 'transparent',
        color: activeSubMenu === menuName ? 'white' : 'black',
        borderRadius: '8px',
        margin: '4px 16px',
        padding:"6px",
      });
    
      const getMenuItemStyle = (menuName) => ({
        color: activeItemMenu === menuName ? '#00CEC3' : 'black',
        margin: '4px 18px',
        borderRadius: '6px',
      });
    
      const handleSubMenuClick = (menuName) => {
        console.log(`SubMenu ${menuName} clicked`);
        setActiveSubMenu(menuName);
      };

      const userLogout = () => {
            logout();
            navigate('/login'); // Redirect to login page after logout

      };

  return (
    <Box
      ref={sidebarRef}
      id="sidebar"
      height="80vh"
      className="sidebarBox"
      bgcolor={backgroundColor}
      pr={2}
      sx={{
        overflowY: 'auto', // Ensure the sidebar is scrollable
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
          padding: "5px 10px",
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
      
      <div style={{ display: "flex", borderRadius: "20px", height: "100vh", width: "20%", justifyContent: "center" }}>
        <Sidebar
          id="custom-sidebar"
          collapsed={isSidebar}
          style={{
            backgroundColor: "#FFFFFF",
            flex: 1,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
            overflowY: 'auto', // Ensure the sidebar is scrollable
          }}
        >
          <Menu iconShape="square">
            {!isSidebar && (
              <Box mb="25px">
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar alt="profile-user" src={hassan_usmani21} sx={{ width: 80, height: 80, cursor: "pointer", boxShadow: 3, marginTop: "1.5rem" }} />
                </Box> */}
                <Box textAlign="center" mt={2}>
                <Typography sx={{ fontSize: '0.7rem' }} color="textSecondary">
                    Created By
                </Typography>
                  <Typography variant="h5" color="black" fontWeight="bold">
                    Synterra
                  </Typography>
                </Box>
              </Box>
            )}
            
            <Box pl={isSidebar ? 0 : 3}>
              <Menu>

                {authState?.designation === 'ADMIN' && (
                <SubMenu label={<Typography variant="body1">Users</Typography>} style={getSubMenuStyle("Users")} onClick={() => handleSubMenuClick("Users")} icon={<GroupIcon />}>
                  <Link to="/CreateUser" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Users")} onClick={() => setActiveItemMenu("Users")}
                    >
                      New
                    </MenuItem>
                    </Link>

                  <Link to="/user" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("editUser")} onClick={() => setActiveItemMenu("editUser")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                 ) } 



                <SubMenu label={<Typography variant="body1">Customer</Typography>} style={getSubMenuStyle("Customer")} onClick={() => handleSubMenuClick("Customer")} icon={<PersonIcon />}>
                  <Link to="/Customer" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Customer")} onClick={() => setActiveItemMenu("Customer")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  <Link to="/editCustomer" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Customer Edit")} onClick={() => setActiveItemMenu("Customer Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                <SubMenu label={<Typography variant="body1">Sales Inquiry</Typography>} style={getSubMenuStyle("Sales")} onClick={() => handleSubMenuClick("Sales")} icon={<LoyaltyIcon />}>
                  <Link to="/SalesInquiry" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Sales Inquiry Create")} onClick={() => setActiveItemMenu("Sales Inquiry Create")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  <Link to="/editSales" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Sales Inquiry Edit")} onClick={() => setActiveItemMenu("Sales Inquiry Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>
                <SubMenu label="Drawing Requisition" style={getSubMenuStyle("Drawing")} onClick={() => handleSubMenuClick("Drawing")} icon={<DescriptionIcon />}>
                  <Link to='/createPump' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Pump Seal Create")} onClick={() => setActiveItemMenu("Pump Seal Create")}
                    >
                      Create PumpSeal
                    </MenuItem>
                  </Link>
                  <Link to='/editPump' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Pump Seal Edit")} onClick={() => setActiveItemMenu("Pump Seal Edit")}
                    >
                      Edit Pump Seal
                    </MenuItem>
                  </Link>
                  <Link to='/createRotary' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Rotary Create")} onClick={() => setActiveItemMenu("Rotary Create")}
                    >
                      Create Rotary Join
                    </MenuItem>
                  </Link>
                  <Link to='/editRotary' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Rotary Edit")} onClick={() => setActiveItemMenu("Rotary Edit")}
                    >
                      Edit Rotary Join
                    </MenuItem>
                  </Link>
                  <Link to='/createApi' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Create Api")} onClick={() => setActiveItemMenu("Create Api")}
                    >
                      Create API Plan
                    </MenuItem>
                  </Link>
                  <Link to='/editApi' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Edit Api")} onClick={() => setActiveItemMenu("Edit Api")}
                    >
                      Edit API Plan
                    </MenuItem>
                  </Link>
                  <Link to="/createAgitator" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Create Agitator")} onClick={() => setActiveItemMenu("Create Agitator")}
                    >
                      Create Agitator Seal
                    </MenuItem>
                  </Link>
                  <Link to="/editAgitator" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Edit Agitator")} onClick={() => setActiveItemMenu("Edit Agitator")}
                    >
                      Edit Agitator Seal
                    </MenuItem>
                  </Link>
                </SubMenu>

                <SubMenu label={<Typography variant="body1">Quotation</Typography>} style={getSubMenuStyle("quotation")} onClick={() => handleSubMenuClick("quotation")} icon={<MonetizationOnIcon />}>
                  <Link to="/quotation" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("quotation")} onClick={() => setActiveItemMenu("quotation")}
                    >
                      New
                    </MenuItem>
                  </Link>
                 
                </SubMenu>


                <SubMenu label={<Typography variant="body1">OFM</Typography>} style={getSubMenuStyle("ofm")} onClick={() => handleSubMenuClick("ofm")} icon={<BusinessCenterIcon />}>
                  <Link to="/createOfm" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("ofm")} onClick={() => setActiveItemMenu("ofm")}
                    >
                      New
                    </MenuItem>
                  </Link>
                  <Link to="/editOfm" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("ofm Edit")} onClick={() => setActiveItemMenu("ofm Edit")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>

                <SubMenu label={<Typography variant="body1">OFM Communication</Typography>} style={getSubMenuStyle("ofmcomm")} onClick={() => handleSubMenuClick("ofmcomm")} icon={<ChatIcon />}>
                  <Link to="ofmComm" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("ofmComs")} onClick={() => setActiveItemMenu("ofmComs")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  </SubMenu>

                {/* <SubMenu label="Sales Order" style={getSubMenuStyle("SalesOrder")} onClick={() => handleSubMenuClick("SalesOrder")} icon={<MonetizationOnIcon />}>
                  <Link to='/createOrder' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<AddBoxIcon />}
                      style={getMenuItemStyle("Create Order")} onClick={() => setActiveItemMenu("Create Order")}
                    >
                      Create
                    </MenuItem>
                  </Link>
                  <Link to='/editOrder' style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Edit Order")} onClick={() => setActiveItemMenu("Edit Order")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu> */}

                <SubMenu label="Logout" style={{color:'black',fontFamily:"Times New Roman",borderRadius: '8px',margin: '4px 16px',padding: "15px 6px",width:"88%",color:"red"}} onClick={userLogout} icon={<PowerSettingsNewIcon />}></SubMenu>
              </Menu>
            </Box>
          </Menu>
        </Sidebar>
      </div>
    </Box>
  );
};

export default CustomSidebar;

