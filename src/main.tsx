import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import AppContextProvider from "./context/AppContext.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Router>
         <Routes>
            <Route
               path="/*"
               element={
                  <AppContextProvider>
                     <App />
                  </AppContextProvider>
               }
            />
         </Routes>
      </Router>
   </React.StrictMode>
);
