import { useContext, useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import LogIn from "./pages/Login";
import AuthService from "./services/AuthService";
import { AppContextType, MUIThemes } from "./context/types";
import { AppContext } from "./context/AppContext";
import Layout from "./pages/Layout";
import ReviewService from "./services/ReviewService";
import { CssBaseline } from "@mui/material";
function App() {
   const {
      handleAuthChange,
      handleUserDetailsChange,
      handleUpdateReviews,
      selectedTheme,
      handleChangeTheme,
   } = useContext(AppContext) as AppContextType;

   const navigate = useNavigate();

   const theme = createTheme({
      palette: {
         mode: selectedTheme,
         ...(selectedTheme === "light"
            ? {
                 primary: {
                    main: blue[700],
                 },
              }
            : {
                 text: {
                    primary: "#fff",
                    secondary: grey[500],
                 },
              }),
      },
   });

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

   useEffect(() => {
      // update theme preference saved from localStorage
      const savedTheme = localStorage.getItem("theme") as MUIThemes;
      if (savedTheme) handleChangeTheme(savedTheme);
   }, []);

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
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
      </ThemeProvider>
   );
}

export default App;

// TODO: Save conversations to DB + put in sidebar
// TODO: Upload file for review + store in backend / db
// TODO: Fix markdown code blocks getting cut on chatbox
