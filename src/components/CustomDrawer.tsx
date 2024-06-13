import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

type CustomDrawerProps = {
   handleNavToggle: () => void;
   isNavOpen: boolean;
};

export default function CustomDrawer({
   handleNavToggle,
   isNavOpen,
}: CustomDrawerProps) {
   const list = () => (
      <Box role="presentation">
         <List>
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
               <ListItem key={text} disablePadding>
                  <ListItemButton>
                     <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                     </ListItemIcon>
                     <ListItemText primary={text} />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
         <Divider />
         <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
               <ListItem key={text} disablePadding>
                  <ListItemButton>
                     <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                     </ListItemIcon>
                     <ListItemText primary={text} />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </Box>
   );

   return (
      <div>
         <React.Fragment key="drawer">
            <SwipeableDrawer
               anchor="left"
               open={isNavOpen}
               onClose={handleNavToggle}
               onOpen={handleNavToggle}
            >
               {list()}
            </SwipeableDrawer>
         </React.Fragment>
      </div>
   );
}
