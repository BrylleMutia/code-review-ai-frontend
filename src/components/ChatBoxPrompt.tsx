import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Markdown from "react-markdown";
import IconButton from "@mui/material/IconButton";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CircularProgress from "@mui/material/CircularProgress";

import ChatBoxCard from "./ChatBoxCard";
import type { AppContextType } from "../context/types";
import type { Prompt } from "../services/ReviewService.types";
import { AppContext } from "../context/AppContext";
import ReviewService from "../services/ReviewService";
import ChatBoxCardLoading from "./ChatBoxCardLoading";
import { errorHandler } from "../utils/error";
import { getPromptTemplate } from "../utils/templates";

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
      isSyncLoading,
      handleChangeSnackbar,
      promptResponses,
      currentReviewDetails,
   } = useContext(AppContext) as AppContextType;

   // used to disable action buttons on prompt card if not recent
   const isPromptLatest = promptResponses
      ? promptResponses[promptResponses?.length - 1].id === id
      : true;

   const continueCodeReview = (templateNum: number) => {
      // proceed with the next step after initial code review
      // 2: Issues
      // 3: Comments

      const prompt = getPromptTemplate(templateNum);

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
         if (currentReviewDetails) {
            ReviewService.sendPrompt(currentReviewDetails.id, prompt)
               .then((response) => {
                  // set true prompt details to replace placeholder prompt
                  handleUpdatePrompts({
                     id: id + 1,
                     prompt,
                     response: response.data.response,
                     isLoading: false,
                  });
               })
               .catch((err) => errorHandler(err, handleChangeSnackbar))
               .finally(() => {
                  handleSetSyncLoading(false);
               });
         }
      }
   };

   const handleExportConversation = () => {
      if (currentReviewDetails) {
         handleSetSyncLoading(true);

         ReviewService.generateOutline(currentReviewDetails.id)
            .then(() => {
               ReviewService.exportConversation(currentReviewDetails.id)
                  .then((response) => {
                     const href = window.URL.createObjectURL(response.data);
                     const link = document.createElement("a");

                     link.href = href;
                     link.download = currentReviewDetails.name;
                     document.body.appendChild(link);

                     link.click();

                     // clean up "a" element & remove ObjectURL
                     document.body.removeChild(link);
                     window.URL.revokeObjectURL(href);
                  })
                  .catch((error) => {
                     console.error(
                        "Error fetching exported conversation:",
                        error
                     );
                  })
                  .finally(() => {
                     handleSetSyncLoading(false);
                  });
            })
            .catch((error) => {
               console.error(
                  "Error generating process outline diagram:",
                  error
               );
               handleSetSyncLoading(false);
            });
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
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                     }}
                  >
                     <Box sx={{ display: "flex", gap: "0.3em" }}>
                        <Button
                           size="small"
                           variant="outlined"
                           disabled={!isPromptLatest}
                           onClick={() => continueCodeReview(2)}
                        >
                           Issues
                        </Button>
                        <Button
                           size="small"
                           variant="outlined"
                           disabled={!isPromptLatest}
                           onClick={() => continueCodeReview(3)}
                        >
                           Comments
                        </Button>
                        <Button
                           size="small"
                           variant="outlined"
                           disabled={!isPromptLatest}
                           onClick={() => continueCodeReview(4)}
                        >
                           Test
                        </Button>
                     </Box>

                     <Box>
                        <IconButton
                           aria-label="export"
                           size="small"
                           disabled={!isPromptLatest}
                           onClick={() => handleExportConversation()}
                        >
                           {isSyncLoading ? (
                              <CircularProgress color="inherit" size={23} />
                           ) : (
                              <FileDownloadIcon />
                           )}
                        </IconButton>
                     </Box>
                  </Box>
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
