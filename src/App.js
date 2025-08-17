import { useState, useEffect } from "react";
import Topbar from "./components/global/TopBar";
import CustomSidebar from "./components/global/SideBar";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AllRoute from "./router/allRoute.js";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "./contextApi/useToken.js";
import Cookies from "js-cookie";
import Loader from "./Loader/Loader.js";
import { LoaderProvider, useLoader } from "./LoaderContext/LoaderContext.js";
import { setupInterceptors } from "./axios/axiosInstance";
import GlobalError from "./utils/errorHandler.js";
import { ToastProvider } from "./context/ToastContext";
import { useAuth } from "./contextApi/AuthContext";


function AppContent() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = useToken();
  const savedToken = Cookies.get("access_token");
  const {logout, authState} = useAuth();


  const { showLoader, hideLoader, showError } = useLoader();

  const isLogin = location.pathname === "/login";
  const resetPath = location.pathname === "/reset";
  

  useEffect(() => {
    const hasToken = token && (savedToken && savedToken !== "null");

    if (!hasToken && location.pathname !== "/login" && location.pathname !== "/reset" ) {
      
      navigate("/login", { replace: true });
    } 

    else if (hasToken && location.pathname === "/login") {

      navigate("/", { replace: true }); 
    }

  }, [token, navigate]);

  useEffect(() => {
    // Mark the session as active
    sessionStorage.setItem("isActiveSession", "true");
  
    const handleBeforeUnload = () => {
      // If session flag exists → it's a refresh, skip logout
      if (sessionStorage.getItem("isRefreshing") === "true") {
        return;
      }
  
      // Otherwise → it's a browser/tab close, logout
      logout();
    };
  
    const handleRefresh = () => {
      // Mark as refresh just before unload
      sessionStorage.setItem("isRefreshing", "true");
  
      // Remove flag after a short delay (so next visit is clean)
      setTimeout(() => {
        sessionStorage.removeItem("isRefreshing");
      }, 1000);
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleRefresh);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleRefresh);
    };
  }, []);


  useEffect(() => {
    // Setup axios interceptors with loader functions
    setupInterceptors(showLoader, hideLoader, showError);
  }, [showLoader, hideLoader, showError]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loader />
        <div className="app">
          <GlobalError />
          <main className="content">
          {!isSidebar&&(savedToken!=='null' && savedToken)&&!resetPath&&<CustomSidebar  isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}

          {/* <CustomSidebar  isSidebar={isSidebar} setIsSidebar={setIsSidebar} /> */}


        {(isLogin===false&&resetPath==false)?(<Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />):null }

        {/* <Topbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} /> */}

            <AllRoute isSidebar={isSidebar} />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function App() {
  return (
    <LoaderProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </LoaderProvider>
  );
}

export default App;