import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import ConversationsList from "./ConversationsList";

type CustomDrawerProps = {
   handleNavToggle: () => void;
   isNavOpen: boolean;
};

export default function CustomDrawer({
   handleNavToggle,
   isNavOpen,
}: CustomDrawerProps) {
   const list = () => (
      <Box
         role="presentation"
         sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
         }}
      >
         <div>
            <ConversationsList />

            <Divider />
         </div>
         <List>
            <ListItem key="profile" disablePadding>
               <ListItemButton>
                  <ListItemIcon sx={{ paddingLeft: "2em" }}>
                     <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
               </ListItemButton>
            </ListItem>

            <ListItem key="logout" disablePadding>
               <ListItemButton>
                  <ListItemIcon sx={{ paddingLeft: "2em" }}>
                     <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
               </ListItemButton>
            </ListItem>
         </List>
      </Box>
   );

   return (
      <Drawer
         variant={isNavOpen ? "permanent" : "temporary"}
         anchor="left"
         open={isNavOpen}
         onClose={handleNavToggle}
         sx={{
            height: "100vh",
            "& .MuiDrawer-paper": {
               position: "static",
            },
         }}
      >
         {list()}
      </Drawer>
   );
}
