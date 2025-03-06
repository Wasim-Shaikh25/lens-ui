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

function AppContent() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = useToken();
  const savedToken = Cookies.get("access_token");

  const { showLoader, hideLoader, showError } = useLoader();

  const isLogin = location.pathname === "/login";
  const resetPath = location.pathname === "/reset";
  

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  
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