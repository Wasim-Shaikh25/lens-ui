// import React, { useEffect, useRef, useContext, useState } from "react";
// import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import { Box, IconButton, Typography, useTheme, Avatar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { tokens } from "../../theme";
// import { ColorModeContext } from "../../theme";
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import EditIcon from '@mui/icons-material/Edit';
// import DescriptionIcon from '@mui/icons-material/Description';
// import hassan_usmani21 from "../../assets/hassan_usmani21.webp";
// import PersonIcon from '@mui/icons-material/Person';
// import LoyaltyIcon from '@mui/icons-material/Loyalty';
// import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

// const CustomSidebar = ({ isSidebar, setIsSidebar }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const colorMode = useContext(ColorModeContext);
//   const backgroundColor = colorMode === "dark" ? colors.primary[900] : theme.palette.background.default;
//   const sidebarRef = useRef(null);

//   const [activeSubMenu, setActiveSubMenu] = useState("");
//   const [activeItemMenu, setActiveItemMenu] = useState("");

  
//   useEffect(() => {
//     document.body.style.backgroundColor = backgroundColor;
//     return () => {
//       document.body.style.backgroundColor = ''; // Reset background color when component unmounts
//     };
//   }, [backgroundColor]);

  
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebar(true); // Collapse the sidebar
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [sidebarRef, setIsSidebar]);

//   const getSubMenuStyle = (menuName) => ({
//     backgroundColor: activeSubMenu === menuName ? '#00CEC3' : 'transparent',
//     color: activeSubMenu === menuName ? 'white' : 'black',
//     borderRadius: '8px',
//     margin: '4px 16px',
//     padding:"6px",
//   });

//   const getMenuItemStyle = (menuName) => ({
//     color: activeItemMenu === menuName ? '#00CEC3' : 'black',
//     margin: '4px 18px',
//     borderRadius: '6px',
//   });

//   const handleSubMenuClick = (menuName) => {
//     console.log(`SubMenu ${menuName} clicked`);
//     setActiveSubMenu(menuName);
//   };

//   return (
//     <Box
//       ref={sidebarRef}
//       id="sidebar"
//       height="100vh"
//       bgcolor={backgroundColor}
//       style={{
//         overflowY: "hidden",
//         position: "fixed",
//         top: 0 ,
//         left: 0,
//         width: "100%",
//         bottom: 0,
//         display:"flex",
//         maxHeight:"85vh",
//         paddingRight: '0px',
//         margin:"4.5rem 0 1rem 0rem",
//       }}
//       pr={2}
//       sx={{
//         "& .css-dip3t8": {
//           backgroundColor: "transparent !important",
//         },
//         "& ul, & ul ul": {
//           padding: 0,
//           margin: 0,
//           listStyle: "none !important", // Remove bullet points
//         },
//         "& li": {
//           listStyle: "none !important", // Remove bullet points
//         },
//         "& .pro-sidebar-content": {
//           padding: 0, // Additional specificity
//         },
//         "& .pro-menu": {
//           padding: 0, // Additional specificity
//         },
//         "& .pro-menu-item": {
//           padding: "5px 10px",
//           borderRadius: '8px',
//           margin: '4px 0',
//           "&:hover": {
//             backgroundColor: '#03C9D7',
//             color: 'white',
//           },
//         },
//         "& .pro-menu-item-active": {
//           backgroundColor: '#03C9D7 !important',
//           color: 'white !important',
//         },
//       }}
//     >
//     <div style={{ display: "flex", borderRadius:"20px",height:"85vh",width:"25%", justifyContent: "center"  }}>
//         <Sidebar
//           id="custom-sidebar"
//           collapsed={isSidebar}
//           style={{
//             backgroundColor: "#FFFFFF",
//             flex: 1,
//             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
//             // display: !isSidebar ? "block" : "none",
//           }}>

//           <Menu iconShape="square">
//             {!isSidebar && (
//               <Box mb="25px" >
//                 <Box display="flex" justifyContent="center" alignItems="center">
//                   <Avatar alt="profile-user" src={hassan_usmani21} sx={{ width: 80, height: 80, cursor: "pointer", boxShadow:3, marginTop:"1.5rem" }} />
//                 </Box>
//                 <Box textAlign="center" mt={2}>
//                   <Typography variant="h6" color="black" fontWeight="bold">
//                     PK
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     Hassan Admin
//                   </Typography>
//                 </Box>
//               </Box>
//             )}
            
//             <Box pl={isSidebar ? 0 : 3}>
//               <Menu>
//                 {/* Customer */}
//                 <SubMenu label={<Typography variant="body1">Customer</Typography>} style={getSubMenuStyle("Customer")} onClick={() => handleSubMenuClick("Customer")} icon={<PersonIcon />}>
//                   <Link to="/Customer" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<AddBoxIcon />}
//                       style={getMenuItemStyle("Customer")} onClick={() => setActiveItemMenu("Customer")}
//                     >
//                       Create
//                     </MenuItem>
//                   </Link>

//                   <Link to="/editCustomer" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<EditIcon />}
//                       style={getMenuItemStyle("Customer Edit")} onClick={() => setActiveItemMenu("Customer Edit")}
//                     >
//                       Edit
//                     </MenuItem>
//                   </Link>
//                 </SubMenu>

//                 {/* Sales Inquiry */}
//                 <SubMenu label={<Typography variant="body1">Sales Inquiry</Typography>} style={getSubMenuStyle("Sales")} onClick={()=>handleSubMenuClick("Sales")} icon={<LoyaltyIcon />}>
//                   <Link to="/SalesInquiry" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<AddBoxIcon />}
//                       style={getMenuItemStyle("Sales Inquiry Create")} onClick={() => setActiveItemMenu("Sales Inquiry Create")}
//                     >
//                       Create
//                     </MenuItem>
//                   </Link>

//                   <Link to="/editSales" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<EditIcon />}
//                       style={getMenuItemStyle("Sales Inquiry Edit")} onClick={() => setActiveItemMenu("Sales Inquiry Edit")}
//                     >
//                       Edit
//                     </MenuItem>
//                   </Link>
//                 </SubMenu>

//                 {/* Drawing Requisition */}
//                 <SubMenu label="Drawing Requisition" style={getSubMenuStyle("Drawing")} onClick={() => handleSubMenuClick("Drawing")} icon={<DescriptionIcon />}>
//                   <Link to='/createPump' onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<AddBoxIcon />}
//                       style={getMenuItemStyle("Pump Seal Create")} onClick={() => setActiveItemMenu("Pump Seal Create")}
//                     >
//                       Create PumpSeal 
//                     </MenuItem>
//                   </Link>

//                   <Link to='/editPump' onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
                    
//                       icon={<EditIcon />}
//                       style={getMenuItemStyle("Pump Seal Edit")} onClick={() => setActiveItemMenu("Pump Seal Edit")}
//                     >
//                       Edit Pump Seal
//                     </MenuItem>
//                   </Link>

//                   <Link to='/createRotary' onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<AddBoxIcon />}
//                       style={getMenuItemStyle("Rotary Create")} onClick={() => setActiveItemMenu("Rotary Create")}
//                     >
//                       Create Rotary Join 
//                     </MenuItem>
//                   </Link>

//                   <Link to='/editRotary' onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<EditIcon />}
//                       style={getMenuItemStyle("Rotary Edit")} onClick={() => setActiveItemMenu("Rotary Edit")}
//                     >
//                       Edit Rotary Join
//                     </MenuItem>
//                   </Link>

//                   <Link to='/createApi' onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<AddBoxIcon />}
//                       style={getMenuItemStyle("Create Api")} onClick={() => setActiveItemMenu("Create Api")}
//                     >
//                       Create API Plan 
//                     </MenuItem>
//                   </Link>

//                   <Link to='/editApi' onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<EditIcon />}
//                       style={getMenuItemStyle("Edit Api")} onClick={() => setActiveItemMenu("Edit Api")}
//                     >
//                       Edit API Plan
//                     </MenuItem>
//                   </Link>

//                   <Link to="/" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                   <MenuItem
//                     icon={<AddBoxIcon />}
//                     style={getMenuItemStyle("Create Agitator")} onClick={() => setActiveItemMenu("Create Agitator")}
//                   >
//                     Create Agitator Seal 
//                   </MenuItem>
//                   </Link>
//                   <Link to="/" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                   <MenuItem
//                     icon={<EditIcon />}
//                     style={getMenuItemStyle("Edit Agitator")} onClick={() => setActiveItemMenu("Edit Agitator")}
//                   >
//                     Edit Agitator
//                   </MenuItem>
//                   </Link>
//                 </SubMenu>

//                 {/* Quotation */}
//                 <SubMenu label="Quotation" style={getSubMenuStyle("Quotation")} onClick={() => handleSubMenuClick("Quotation")} icon={<MonetizationOnIcon />}>
//                   <Link to="/Quotation" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<AddBoxIcon />}
//                       style={getMenuItemStyle("Create quote")} onClick={() => setActiveItemMenu("Create quote")}
//                     >
//                       Create Quotation
//                     </MenuItem>
//                   </Link>

//                   <Link to="/Quotation" onClick={()=>setIsSidebar(!isSidebar)} style={{ color: 'inherit', textDecoration: "none" }}>
//                     <MenuItem
//                       icon={<EditIcon />}
//                       style={getMenuItemStyle("Edit quote")} onClick={() => setActiveItemMenu("Edit quote")}
//                     >
//                       Edit Quotation
//                     </MenuItem>
//                   </Link>
//                 </SubMenu>
//               </Menu>
//             </Box>
//           </Menu>
//         </Sidebar>
//       </div>

//        <div style={{width:"75%",zIndex:"-5",background:"linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),white"}}>

//         </div>       

//     </Box>
//   );
// };

// export default CustomSidebar;




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
import hassan_usmani21 from "../../assets/hassan_usmani21.webp"; // Adjust the import according to your project
import { useAuth } from "../../contextApi/AuthContext";
import GroupIcon from '@mui/icons-material/Group';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';



const CustomSidebar = ({isSidebar,setIsSidebar}) => {
      const theme = useTheme();
      const colors = tokens(theme.palette.mode);
      const colorMode = useContext(ColorModeContext);
      const backgroundColor = colorMode === "dark" ? colors.primary[900] : theme.palette.background.default;
      const sidebarRef = useRef(null);
    
      const [activeSubMenu, setActiveSubMenu] = useState("");
      const [activeItemMenu, setActiveItemMenu] = useState("");
    
      
      useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
        return () => {
          document.body.style.backgroundColor = ''; // Reset background color when component unmounts
        };
      }, [backgroundColor]);
    
      
      // useEffect(() => {
      //   const handleClickOutside = (event) => {
      //     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      //       setIsSidebar(true); // Collapse the sidebar
      //     }
      //   };
    
      //   document.addEventListener("mousedown", handleClickOutside);
      //   return () => {
      //     document.removeEventListener("mousedown", handleClickOutside);
      //   };
      // }, [sidebarRef, setIsSidebar]);

    
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
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Avatar alt="profile-user" src={hassan_usmani21} sx={{ width: 80, height: 80, cursor: "pointer", boxShadow: 3, marginTop: "1.5rem" }} />
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

                {authState?.authorities === 'ADMIN' && (<SubMenu label={<Typography variant="body1">Users</Typography>} style={getSubMenuStyle("Users")} onClick={() => handleSubMenuClick("Users")} icon={<GroupIcon />}>
                  <Link to="/user" style={{ color: 'inherit', textDecoration: "none" }}>
                    <MenuItem
                      icon={<EditIcon />}
                      style={getMenuItemStyle("Users")} onClick={() => setActiveItemMenu("Users")}
                    >
                      Edit
                    </MenuItem>
                  </Link>
                </SubMenu>)
                }



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
                <SubMenu label="Sales Order" style={getSubMenuStyle("SalesOrder")} onClick={() => handleSubMenuClick("SalesOrder")} icon={<MonetizationOnIcon />}>
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
                </SubMenu>
                <SubMenu label="Logout" style={{color:'black',fontFamily:"Times New Roman",borderRadius: '8px',margin: '4px 16px',padding: "6px"}} onClick={userLogout} icon={<PowerSettingsNewIcon />}></SubMenu>
              </Menu>
            </Box>
          </Menu>
        </Sidebar>
      </div>
    </Box>
  );
};

export default CustomSidebar;

