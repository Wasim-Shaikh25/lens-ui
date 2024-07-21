import { useState } from "react";
import Topbar from "./components/global/TopBar";
import CustomSidebar from "./components/global/SideBar";
import './App.css'                                                                              
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AllRoute from './router/allRoute.js'
import { useEffect } from "react";
import { useAuth } from "./contextApi/AuthContext.js";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "./contextApi/useToken.js";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const isLogin = location.pathname === '/login';
   

  const navigate = useNavigate();
  const token = useToken();

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }

  },[])


  console.log("isSidebar is ",isSidebar)

  return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
        {!isSidebar&&token&&<CustomSidebar  isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}
      {!isLogin&&<Topbar   isSidebar={isSidebar} setIsSidebar={setIsSidebar} /> }
          <AllRoute  isSidebar={isSidebar}/> 
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;