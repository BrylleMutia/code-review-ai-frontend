import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";

import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import ChatBoxCard from "./ChatBoxCard";
import ReviewService from "../services/ReviewService";

const ChatBoxPackageDetailsLoading = () => {
   return (
      <React.Fragment>
         <CardContent sx={{ padding: "0" }}>
            <Box
               sx={{
                  backgroundColor: "primary.main",
                  padding: "1em",
                  color: "white",
               }}
            >
               <Skeleton>
                  <Typography
                     sx={{ fontSize: 14 }}
                     color="text.secondary"
                     gutterBottom
                  >
                     Package
                  </Typography>
               </Skeleton>
               <Skeleton>
                  <Typography variant="h5" component="div">
                     Lorem ipsum dolor sit amet.
                  </Typography>
               </Skeleton>
               <Skeleton>
                  <Typography
                     sx={{ mb: 1.5 }}
                     variant="caption"
                     color="text.secondary"
                  >
                     {`LINE COUNT: 121`}
                  </Typography>
               </Skeleton>
            </Box>

            <Box sx={{ padding: "1em" }}>
               <Box sx={{ marginTop: "2em" }}>
                  <Skeleton>
                     <Typography variant="body2" gutterBottom>
                        Referenced Modules:
                     </Typography>
                  </Skeleton>

                  <Skeleton>
                     <Typography variant="body2">
                        • PACKAGE: EBA_CUST_FW
                     </Typography>
                  </Skeleton>
                  <Skeleton>
                     <Typography variant="body2">
                        • PACKAGE: EBA_CUST_FW
                     </Typography>
                  </Skeleton>
                  <Skeleton>
                     <Typography variant="body2">
                        • PACKAGE: EBA_CUST_FW
                     </Typography>
                  </Skeleton>
               </Box>

               <Box sx={{ marginTop: "1em" }}>
                  <Skeleton>
                     <Typography variant="body2" gutterBottom>
                        Referenced Tables:
                     </Typography>
                  </Skeleton>

                  <Skeleton>
                     <Typography variant="body2">
                        • EBA_CUST_VIEWS_LOG
                     </Typography>
                  </Skeleton>
               </Box>
            </Box>
         </CardContent>
         <CardActions>
            <Button size="small" variant="outlined">
               Continue
            </Button>
         </CardActions>
      </React.Fragment>
   );
};

const ChatBoxPackageDetails = () => {
   const {
      packageDetails,
      isSyncLoading,
      handleSetSyncLoading,
      handleUpdatePrompts,
   } = useContext(AppContext) as AppContextType;

   const continueCodeReview = (templateNum: number) => {
      // proceed with the next step after initial code review
      handleSetSyncLoading(true);

      ReviewService.setTemplate(templateNum).then((response) => {
         handleSetSyncLoading(false);
         handleUpdatePrompts({
            prompt: "Initial Review",
            response: response.data.response,
         });
      });
   };

   return (
      <ChatBoxCard>
         {!isSyncLoading && packageDetails ? (
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
                     Continue
                  </Button>
               </CardActions>
            </React.Fragment>
         ) : (
            <ChatBoxPackageDetailsLoading />
         )}
      </ChatBoxCard>
   );
};

export default ChatBoxPackageDetails;
