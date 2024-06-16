import { Box } from "@mui/material";
import ChatInput from "../components/ChatInput";
import PackageSelectDialog from "../components/PackageSelectDialog";

export default function Home() {
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
            <PackageSelectDialog />
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
            <Box sx={{ width: "40em" }}>
               <ChatInput />
            </Box>
         </Box>
      </Box>
   );
}
