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
   const { userDetails, handleUserLogout } = useContext(
      AppContext
   ) as AppContextType;

   const list = () => (
      <Box
         role="presentation"
         sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "17em",
         }}
      >
         <div>
            <ConversationsList />

            <Divider />
         </div>

         <List>
            <ListItem key="profile" disablePadding>
               <ListItemButton sx={{ paddingX: "3em" }}>
                  <ListItemIcon
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                     }}
                  >
                     <AccountCircleIcon />
                     <ListItemText
                        sx={{
                           paddingX: "1em",
                           maxWidth: "12em",
                           textAlign: "center",
                        }}
                        primary={userDetails.name}
                     />
                  </ListItemIcon>
               </ListItemButton>
            </ListItem>

            <ListItem key="logout" disablePadding>
               <ListItemButton
                  sx={{ paddingX: "3em" }}
                  onClick={handleUserLogout}
               >
                  <ListItemIcon
                     sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                     <ExitToAppIcon />
                     <ListItemText
                        sx={{ paddingX: "1em", textAlign: "center" }}
                        primary="Logout"
                     />
                  </ListItemIcon>
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
