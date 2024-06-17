import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App.tsx";
import AppContextProvider from "./context/AppContext.js";
import theme from "./theme/index.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Router>
         <Routes>
            <Route
               path="/*"
               element={
                  <ThemeProvider theme={theme}>
                     <AppContextProvider>
                        <App />
                     </AppContextProvider>
                  </ThemeProvider>
               }
            />
         </Routes>
      </Router>
   </React.StrictMode>
);
