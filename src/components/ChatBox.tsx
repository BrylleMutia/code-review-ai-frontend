import { createRef, useContext } from "react";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import ChatBoxPackageDetails from "./ChatBoxPackageDetails";
import ChatBoxPrompt from "./ChatBoxPrompt";
import { Box } from "@mui/material";

import { useScrollIntoView } from "../hooks";

const ChatBox = () => {
   const { promptResponses } = useContext(AppContext) as AppContextType;

   const latestPromptCardRef = createRef<HTMLDivElement>();

   useScrollIntoView(latestPromptCardRef, promptResponses);

   return (
      <Box sx={{ marginTop: "2em" }}>
         <ChatBoxPackageDetails />

         {!!promptResponses &&
            promptResponses.map((prompt, index) => (
               <ChatBoxPrompt
                  key={index}
                  id={prompt.id}
                  prompt={prompt.prompt}
                  response={prompt.response}
                  isLoading={prompt.isLoading}
               />
            ))}

         <div ref={latestPromptCardRef} />
      </Box>
   );
};

export default ChatBox;
