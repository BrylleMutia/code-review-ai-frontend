import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import Markdown from "react-markdown";

import ChatBoxCard from "./ChatBoxCard";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import ReviewService from "../services/ReviewService";

type ChatBoxPromptProps = {
   prompt: string;
   response: string;
};

const ChatBoxPrompt = ({ prompt, response }: ChatBoxPromptProps) => {
   const {
      packageDetails,
      isSyncLoading,
      handleSetSyncLoading,
      handleUpdatePrompts,
   } = useContext(AppContext) as AppContextType;

   const continueCodeReview = (templateNum: number) => {
      // proceed with the next step after initial code review
      // 2: Issues
      // 3: Comments
      handleSetSyncLoading(true);

      switch (templateNum) {
         case 2:
            prompt = "What are the top issues in the current package?";
            break;
         case 3:
            prompt =
               "Specific parts of the code that would benefit from more comments:";
            break;
         default:
            prompt = "";
      }

      if (prompt) {
         ReviewService.sendPrompt(prompt).then((response) => {
            handleSetSyncLoading(false);
            handleUpdatePrompts({
               prompt,
               response: response.data.response,
            });
         });
      }
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
                        Prompt
                     </Typography>
                     <Typography variant="h5" component="div">
                        {prompt}
                     </Typography>
                  </Box>

                  <Box sx={{ padding: "1em" }}>
                     <Box sx={{ marginTop: "2em", paddingX: "2em" }}>
                        <Typography variant="body2" gutterBottom>
                           <Markdown>{response}</Markdown>
                        </Typography>
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

export default ChatBoxPrompt;
