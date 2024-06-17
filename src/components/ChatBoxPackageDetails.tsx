import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import { Box } from "@mui/material";
import ChatBoxCard from "./ChatBoxCard";

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
            <Button size="small">Learn More</Button>
         </CardActions>
      </React.Fragment>
   );
};

const ChatBoxPackageDetails = () => {
   const { packageDetails, isSyncLoading } = useContext(
      AppContext
   ) as AppContextType;

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

                        {packageDetails.ref_modules.map((module) => (
                           <Typography variant="body2">
                              {`• ${module.referenced_type}: ${module.referenced_name}`}
                           </Typography>
                        ))}
                     </Box>

                     <Box sx={{ marginTop: "1em" }}>
                        <Typography variant="body2" gutterBottom>
                           Referenced Tables:
                        </Typography>

                        {packageDetails.ref_tables.map((table) => (
                           <Typography variant="body2">{`• ${table}`}</Typography>
                        ))}
                     </Box>
                  </Box>
               </CardContent>
               <CardActions>
                  <Button size="small">Learn More</Button>
               </CardActions>
            </React.Fragment>
         ) : (
            <ChatBoxPackageDetailsLoading />
         )}
      </ChatBoxCard>
   );
};

export default ChatBoxPackageDetails;
