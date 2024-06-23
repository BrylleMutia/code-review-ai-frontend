import React, { useContext, useState } from "react";
import { Box, TextField } from "@mui/material";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import ReviewService from "../services/ReviewService";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import { errorHandler } from "../utils/error";

export default function ChatInput() {
   const [prompt, setPrompt] = useState<string>("");

   const {
      isSyncLoading,
      handleSetSyncLoading,
      handleUpdatePrompts,
      promptResponses,
      handleChangeSnackbar,
   } = useContext(AppContext) as AppContextType;

   const handlePromptChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      setPrompt(event.target.value);
   };

   const handleSubmitPrompt = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (promptResponses && prompt) {
         handleSetSyncLoading(true);

         // set empty placeholder prompt for loader while waiting for response
         // prompt id is last prompt + 1
         handleUpdatePrompts({
            id: promptResponses.length + 1,
            prompt: "",
            response: "",
            isLoading: true,
         });

         const newPrompt = prompt;
         setPrompt("");

         ReviewService.sendPrompt(newPrompt)
            .then((response) => {
               // set true prompt details to replace placeholder prompt
               handleUpdatePrompts({
                  id: promptResponses.length + 1,
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
      <Box
         component="form"
         onSubmit={handleSubmitPrompt}
         sx={{ display: "flex" }}
      >
         <TextField
            required
            value={prompt}
            id="prompt"
            name="prompt"
            autoComplete="prompt"
            placeholder="Type something"
            autoFocus
            onChange={handlePromptChange}
            fullWidth
            size="small"
         />
         <IconButton
            aria-label="send"
            color="primary"
            type="submit"
            disabled={isSyncLoading}
         >
            <SendIcon />
         </IconButton>
         {/* <Button variant="contained" endIcon={<SendIcon />} /> */}
      </Box>
   );
}
