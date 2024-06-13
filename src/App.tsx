import React, { useState } from "react";
import "./App.css";
import CustomAppBar from "./components/CustomAppBar";
import CustomDrawer from "./components/CustomDrawer";
import { Box } from "@mui/material";

function App() {
   const [isNavOpen, setIsNavToggle] = useState(true);

   const handleNavToggle = () => {
      setIsNavToggle((prev) => !prev);
   };

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
            handleNavToggle={handleNavToggle}
            isNavOpen={isNavOpen}
         />
         <CustomAppBar handleNavToggle={handleNavToggle} />
      </Box>
   );
}

export default App;

// TODO: Implement react-router
// TODO: Add auth pages using material UI