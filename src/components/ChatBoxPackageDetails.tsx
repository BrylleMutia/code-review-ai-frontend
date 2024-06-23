import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import ChatBoxCard from "./ChatBoxCard";
import ReviewService from "../services/ReviewService";
import ChatBoxCardLoading from "./ChatBoxCardLoading";

const ChatBoxPackageDetails = () => {
   const {
      packageDetails,
      isSyncLoading,
      handleUpdatePrompts,
      handleSetSyncLoading,
   } = useContext(AppContext) as AppContextType;

   const continueCodeReview = (templateNum: number) => {
      handleSetSyncLoading(true);

      // proceed with the next step after initial code review
      // set empty placeholder prompt for loader while waiting for response
      handleUpdatePrompts({
         id: 1,
         prompt: "",
         response: "",
         isLoading: true,
      });

      ReviewService.setTemplate(templateNum).then((response) => {
         // set true prompt details to replace placeholder prompt
         handleUpdatePrompts({
            id: 1,
            prompt: "Initial Review",
            response: response.data.response,
            isLoading: false,
         });

         handleSetSyncLoading(false);
      });
   };

   return (
      <ChatBoxCard>
         {packageDetails ? (
            <React.Fragment>
               <CardContent sx={{ padding: "0" }}>
                  <Box
                     sx={{
                        backgroundColor: "primary.main",
                        padding: "1em",
                        color: "white",
                     }}
                  >
                     <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                     >
                        Package
                     </Typography>
                     <Typography variant="h5" component="div">
                        {packageDetails.package_name}
                     </Typography>
                     <Typography
                        sx={{ mb: 1.5 }}
                        variant="caption"
                        color="text.secondary"
                     >
                        {`LINE COUNT: ${packageDetails.line_count}`}
                     </Typography>
                  </Box>

                  <Box sx={{ padding: "1em" }}>
                     <Box sx={{ marginTop: "2em" }}>
                        <Typography variant="body2" gutterBottom>
                           Referenced Modules:
                        </Typography>

                        {packageDetails.ref_modules.map((module, index) => (
                           <Typography variant="body2" key={index}>
                              {`• ${module.referenced_type}: ${module.referenced_name}`}
                           </Typography>
                        ))}
                     </Box>

                     <Box sx={{ marginTop: "1em" }}>
                        <Typography variant="body2" gutterBottom>
                           Referenced Tables:
                        </Typography>

                        {packageDetails.ref_tables.map((table, index) => (
                           <Typography
                              variant="body2"
                              key={index}
                           >{`• ${table}`}</Typography>
                        ))}
                     </Box>
                  </Box>
               </CardContent>
               <CardActions>
                  <Button
                     size="small"
                     variant="outlined"
                     onClick={() => continueCodeReview(1)}
                  >
                     Review
                  </Button>
               </CardActions>
            </React.Fragment>
         ) : (
            <ChatBoxCardLoading />
         )}
      </ChatBoxCard>
   );
};

export default ChatBoxPackageDetails;
