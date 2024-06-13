import React, { useState } from "react";
import "./App.css";
import CustomAppBar from "./components/CustomAppBar";
import CustomDrawer from "./components/CustomDrawer";

function App() {
   const [isNavOpen, setIsNavToggle] = useState(false);

   const handleNavToggle = () => {
      setIsNavToggle((prev) => !prev);
   };

   return (
      <>
         <CustomAppBar handleNavToggle={handleNavToggle} />
         <CustomDrawer
            handleNavToggle={handleNavToggle}
            isNavOpen={isNavOpen}
         />
      </>
   );
}

export default App;
