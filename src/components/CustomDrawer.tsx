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
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

type CustomDrawerProps = {
   handleSidebarToggle: () => void;
   isNavOpen: boolean;
};

export default function CustomDrawer({
   handleSidebarToggle,
   isNavOpen,
}: CustomDrawerProps) {
   const { handleAuthChange, handleUserDetailsChange, userDetails } =
      useContext(AppContext) as AppContextType;

   const handleUserLogout = () => {
      handleAuthChange(false);
      handleUserDetailsChange({
         id: "",
         email: "",
         name: "",
      });
      localStorage.removeItem("access_token");
   };

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
                  <ListItemText
                     sx={{ paddingLeft: "1em" }}
                     primary={userDetails.name}
                  />
               </ListItemButton>
            </ListItem>

            <ListItem key="logout" disablePadding>
               <ListItemButton onClick={handleUserLogout}>
                  <ListItemIcon sx={{ paddingLeft: "2em" }}>
                     <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText sx={{ paddingLeft: "1em" }} primary="Logout" />
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
         onClose={handleSidebarToggle}
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
