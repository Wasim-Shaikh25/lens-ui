import { useState } from "react";
import Topbar from "./components/global/TopBar";
import CustomSidebar from "./components/global/SideBar";
import Dashboard from "./components/dashboard";
// import {AllRoutes} from './route/AllRoutes'

// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AllRoute from '../src/router/allRoute'
// import Calendar from "./scenes/calendar/calendar";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
          <CustomSidebar isSidebar={isSidebar} />
          <Topbar setIsSidebar={setIsSidebar} />
              <AllRoute/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;