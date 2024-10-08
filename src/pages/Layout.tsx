import { useState, useContext } from "react";
import { Outlet, useOutletContext, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../context/types";

import CustomAppBar from "../components/CustomAppBar";
import CustomDrawer from "../components/CustomDrawer";
import CustomSnackbar from "../components/CustomSnackbar";
import { Box } from "@mui/material";
import { getAccessToken } from "../utils/token";

type ContextType = [isSidebarOpen: boolean, handleSidebarOpen: () => void];


// TODO: Fix order of retrieved reviews on sidebar (should be desc)
// TODO: Fix error on generate process outline

const Layout = () => {
   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

   const { isAuthenticated } = useContext(AppContext) as AppContextType;

   const handleSidebarOpen = () => {
      setIsSidebarOpen((prev) => !prev);
   };

   const token = getAccessToken();

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "flex-start",
            flexShrink: "1",
            width: "100%",
            height: "100%",
         }}
      >
         <CustomDrawer
            handleSidebarToggle={handleSidebarOpen}
            isNavOpen={isSidebarOpen}
         />

         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "flex-start",
               width: "100%",
               height: "100%",
            }}
         >
            <CustomAppBar handleSidebarToggle={handleSidebarOpen} />

            {/* Outlet is all child routes from App.tsx */}
            {/* Auth check, redirect to auth page if not authenticated */}
            {/* {isAuthenticated && <Outlet />} */}
            <Box sx={{ height: "89%", flexGrow: 1 }}>
               {isAuthenticated || token ? (
                  <Outlet context={[isSidebarOpen, handleSidebarOpen]} />
               ) : (
                  <Navigate to={"/auth"} />
               )}
            </Box>
         </Box>

         <CustomSnackbar severity="error" />
      </Box>
   );
};

// for providing props to outlet children / components
export const useSidebar = () => {
   return useOutletContext<ContextType>();
};

export default Layout;
