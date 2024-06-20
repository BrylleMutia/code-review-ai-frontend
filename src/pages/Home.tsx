import { Box } from "@mui/material";
import ChatInput from "../components/ChatInput";
import PackageSelectDialog from "../components/PackageSelectDialog";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { AppContextType } from "../context/types";
import ChatBox from "../components/ChatBox";

export default function Home() {
   const { packageDetails, isSyncLoading } = useContext(
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
         <Box
            sx={{
               width: "100%",
               display: "flex",
               justifyContent: "center",
               marginTop: "auto",
               overflowY: "scroll",
            }}
         >
            {!packageDetails && !isSyncLoading ? (
               <PackageSelectDialog />
            ) : (
               <ChatBox />
            )}
         </Box>

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
      </Box>
   );
}
