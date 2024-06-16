import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

import ReviewService from "../services/ReviewService";

export default function ChatInput() {
   const [prompt, setPrompt] = useState<string | null>(null);

   const handlePromptChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
   ) => {
      setPrompt(event.target.value);
   };

   const handleSubmitPrompt = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (prompt) {
         ReviewService.sendPrompt(prompt).then((response) => {
            console.log(response.data);
         });
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
            id="prompt"
            name="prompt"
            autoComplete="prompt"
            placeholder="What can I help you with?"
            autoFocus
            onChange={handlePromptChange}
            fullWidth
            size="small"
         />
         <IconButton aria-label="send" color="primary" type="submit">
            <SendIcon />
         </IconButton>
         {/* <Button variant="contained" endIcon={<SendIcon />} /> */}
      </Box>
   );
}
