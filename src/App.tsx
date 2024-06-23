import { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import AuthService from "./services/AuthService";
import { AppContextType } from "./context/types";
import { AppContext } from "./context/AppContext";
import Layout from "./pages/Layout";
import ReviewService from "./services/ReviewService";
function App() {
   const { handleAuthChange, handleUserDetailsChange, handleUpdateReviews } =
      useContext(AppContext) as AppContextType;

   const navigate = useNavigate();

   useEffect(() => {
      AuthService.checkToken()
         .then((response) => {
            handleUserDetailsChange(response.data);
            if (response.data.id) handleAuthChange(true);
            else handleAuthChange(false);

            return ReviewService.getReviews();
         })
         .then((response) => {
            handleUpdateReviews(response.data.response);
         })
         .catch(() => {
            handleAuthChange(false);
            localStorage.removeItem("access_token");
            navigate("/auth");
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

// TODO: Enable custom prompt from chat input
// TODO: Save conversations to DB + put in sidebar
// TODO: Upload file for review + store in backend / db
// TODO: Fix markdown code blocks getting cut on chatbox
// TODO: Dark mode toggle
// TODO: Theme Provider for MUI
