import { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import AuthService from "./services/AuthService";
import { AppContextType } from "./context/types";
import { AppContext } from "./context/AppContext";
import Layout from "./pages/Layout";

function App() {
   const { handleAuthChange, handleUserDetailsChange } = useContext(
      AppContext
   ) as AppContextType;

   useEffect(() => {
      AuthService.checkToken()
         .then((response) => {
            handleUserDetailsChange(response.data);
            if (response.data.id) handleAuthChange(true);
            else handleAuthChange(false);
         })
         .catch(() => {
            handleAuthChange(false);
         });
   }, []);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            {/* PROTECTED ROUTES, auth checked on Layout */}
            <Route index element={<Home />} />
         </Route>

         <Route path="auth">
            <Route index element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
         </Route>

         {/* Catch all - replace with 404 component if you want */}
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
   );
}

export default App;

// TODO: Implement homepage UI with chat
// TODO: Theme Provider for MUI