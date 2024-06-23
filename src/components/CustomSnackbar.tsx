import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";

export type SnackbarSeverity = "error" | "info" | "success" | "warning";
export type SnackbarVariant = "filled" | "outlined" | "standard";
const VERTICAL_ORIGIN = "bottom";
const HORIZONTAL_ORIGIN = "center";

type CustomSnackbarProps = {
   severity?: SnackbarSeverity;
   variant?: SnackbarVariant;
};

export default function CustomSnackbar({
   severity = "success",
   variant = "filled",
}: CustomSnackbarProps) {
   const { handleChangeSnackbar, snackBarDetails } = useContext(
      AppContext
   ) as AppContextType;

   const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
   ) => {
      if (reason === "clickaway") {
         return;
      }

      handleChangeSnackbar({ isShown: false, message: "" });
   };

   return (
      <div>
         <Snackbar
            open={snackBarDetails.isShown}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{
               vertical: VERTICAL_ORIGIN,
               horizontal: HORIZONTAL_ORIGIN,
            }}
         >
            <Alert
               onClose={handleClose}
               severity={severity}
               variant={variant}
               sx={{ width: "100%" }}
            >
               {snackBarDetails.message}
            </Alert>
         </Snackbar>
      </div>
   );
}
