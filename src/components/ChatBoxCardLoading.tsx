import React from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import LinearLoader from "./LinearLoader";

const ChatBoxCardLoading = () => {
   return (
      <Box sx={{ width: "100%", textAlign: "center" }}>
         <Typography variant="caption">Generating response...</Typography>
         <LinearLoader />
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
               <Button size="small" variant="outlined" disabled>
                  Continue
               </Button>
            </CardActions>
         </React.Fragment>
      </Box>
   );
};

export default ChatBoxCardLoading;
