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
               position: "absolute",
               bottom: "0px",
               left: "50%",
               transform: "translateX(-25%)",
               marginBottom: "1em",
            }}
         >
            <Box
               sx={{ width: "40em", marginBottom: "1em" }}
               hidden={!packageDetails}
            >
               {/* TODO: Fix chat input now adjusting to center when drawer is closed */}
               <ChatInput />
            </Box>
         </Box>
      </Box>
   );
}
