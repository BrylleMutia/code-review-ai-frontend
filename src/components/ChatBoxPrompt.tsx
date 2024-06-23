import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Markdown from "react-markdown";

import ChatBoxCard from "./ChatBoxCard";
import { AppContextType, Prompt } from "../context/types";
import { AppContext } from "../context/AppContext";
import ReviewService from "../services/ReviewService";
import ChatBoxCardLoading from "./ChatBoxCardLoading";
import { errorHandler } from "../utils/error";

type ChatBoxPromptProps = {} & Prompt;

const ChatBoxPrompt = ({
   id,
   prompt,
   response,
   isLoading,
}: ChatBoxPromptProps) => {
   const {
      packageDetails,
      handleUpdatePrompts,
      handleSetSyncLoading,
      handleChangeSnackbar,
      promptResponses,
   } = useContext(AppContext) as AppContextType;

   const continueCodeReview = (templateNum: number) => {
      // proceed with the next step after initial code review
      // 2: Issues
      // 3: Comments

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

      handleSetSyncLoading(true);

      // set empty placeholder prompt for loader while waiting for response
      // prompt id is last prompt + 1
      handleUpdatePrompts({
         id: id + 1,
         prompt,
         response: "",
         isLoading: true,
      });

      if (prompt) {
         ReviewService.sendPrompt(prompt)
            .then((response) => {
               // set true prompt details to replace placeholder prompt
               handleUpdatePrompts({
                  id: id + 1,
                  prompt,
                  response: response.data.response,
                  isLoading: false,
               });

               handleSetSyncLoading(false);
            })
            .catch((err) => errorHandler(err, handleChangeSnackbar));
      }
   };

   return (
      <ChatBoxCard>
         {!isLoading && packageDetails ? (
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
                     onClick={() => continueCodeReview(2)}
                  >
                     Issues
                  </Button>
                  <Button
                     size="small"
                     variant="outlined"
                     onClick={() => continueCodeReview(3)}
                  >
                     Comments
                  </Button>
               </CardActions>
            </React.Fragment>
         ) : (
            <ChatBoxCardLoading
               mode="prompt"
               prompt={
                  promptResponses &&
                  promptResponses[promptResponses.length - 1].prompt
               }
            />
         )}
      </ChatBoxCard>
   );
};

export default ChatBoxPrompt;
