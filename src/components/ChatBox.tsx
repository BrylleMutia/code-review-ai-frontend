import React, { useContext } from "react";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import ChatBoxPackageDetails from "./ChatBoxPackageDetails";
import ChatBoxPrompt from "./ChatBoxPrompt";
import { Box } from "@mui/material";

const ChatBox = () => {
   const { chatBoxMode } = useContext(AppContext) as AppContextType;

   const chatBoxModeDisplay = () => {
      switch (chatBoxMode) {
         case "package":
            return <ChatBoxPackageDetails />;

         case "prompt":
            return <ChatBoxPrompt />;

         default:
            return <ChatBoxPackageDetails />;
      }
   };

   return <Box>{chatBoxModeDisplay()}</Box>;
};

export default ChatBox;
