import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

type ChatBoxCardProps = {
   children: React.ReactNode;
};

export default function ChatBoxCard({ children }: ChatBoxCardProps) {
   return (
      <Box sx={{ minWidth: "500px", maxWidth: "700px", margin: "1em" }}>
         <Card variant="outlined">{children}</Card>
      </Box>
   );
}
