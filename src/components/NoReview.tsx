import { Box } from "@mui/material";
import NoMessageImg from "../assets/empty.png";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { AppContextType } from "../context/types";

const NoReview = () => {
   const { selectedTheme } = useContext(AppContext) as AppContextType;

   return (
      <Box sx={{ opacity: "0.25", textAlign: "center", marginY: "auto" }}>
         <img
            style={{
               filter: selectedTheme === "dark" ? "invert(1)" : "invert(0)",
               marginBottom: "1em",
            }}
            src={NoMessageImg}
            alt="no-review"
         />
         <p>Please select a review or create a new one.</p>
      </Box>
   );
};

export default NoReview;
