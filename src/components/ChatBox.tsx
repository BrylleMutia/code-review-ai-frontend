import React, { useContext } from "react";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import ChatBoxPackageDetails from "./ChatBoxPackageDetails";
import ChatBoxPrompt from "./ChatBoxPrompt";
import { Box } from "@mui/material";

const ChatBox = () => {
   const { promptResponses } = useContext(
      AppContext
   ) as AppContextType;

   return (
      <Box>
         <ChatBoxPackageDetails />

         {!!promptResponses.length &&
            promptResponses.map((prompt, index) => (
               <ChatBoxPrompt
                  key={index}
                  prompt={prompt.prompt}
                  response={prompt.response}
               />
            ))}
      </Box>
   );
};

export default ChatBox;
