import { useState, useContext } from "react";
import { Outlet, useOutletContext, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../context/types";

import CustomAppBar from "../components/CustomAppBar";
import CustomDrawer from "../components/CustomDrawer";
import { Box } from "@mui/material";
import { getAccessToken } from "../utils/token";

type ContextType = [isSidebarOpen: boolean, handleSidebarOpen: () => void];

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
               width: "100%",
            }}
         >
            <CustomAppBar handleSidebarToggle={handleSidebarOpen} />

            {/* Outlet is all child routes from App.tsx */}
            {/* Auth check, redirect to auth page if not authenticated */}
            {/* {isAuthenticated && <Outlet />} */}
            <main className="flex justify-center w-full grow bg-white h-full">
               {isAuthenticated || token ? (
                  <Outlet context={[isSidebarOpen, handleSidebarOpen]} />
               ) : (
                  <Navigate to={"/auth"} />
               )}
            </main>
         </Box>
      </Box>
   );
};

// for providing props to outlet children / components
export const useSidebar = () => {
   return useOutletContext<ContextType>();
};

export default Layout;
