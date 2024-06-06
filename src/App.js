import { useState } from "react";
import Topbar from "./components/global/TopBar";
import CustomSidebar from "./components/global/SideBar";
import './app.css'                                                                              
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AllRoute from './router/AllRoute.js'


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  console.log("isSidebar is ",isSidebar)

  return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
        {!isSidebar&&<CustomSidebar  isSidebar={isSidebar} setIsSidebar={setIsSidebar} />}
          <Topbar   isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
          <AllRoute  isSidebar={isSidebar}/> 
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;