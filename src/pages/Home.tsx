import { Box } from "@mui/material";
import ChatInput from "../components/ChatInput";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { AppContextType } from "../context/types";
import ChatBox from "../components/ChatBox";
import NoReview from "../components/NoReview";

export default function Home() {
   const { packageDetails, isSyncLoading, promptResponses } = useContext(
      AppContext
   ) as AppContextType;

   return (
      <Box
         sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
         }}
      >
         {!packageDetails && !isSyncLoading ? (
            <NoReview />
         ) : (
            <Box
               sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  overflowY: "scroll",
               }}
            >
               <ChatBox />
            </Box>
         )}

         {!!promptResponses && (
            <Box
               sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "auto",
               }}
            >
               <Box
                  sx={{ width: "40em", marginY: "1em" }}
                  hidden={!packageDetails}
               >
                  <ChatInput />
               </Box>
            </Box>
         )}
      </Box>
   );
}
