import React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChatIcon from "@mui/icons-material/Chat";

export default function ConversationsList() {
   const [open, setOpen] = React.useState(true);

   const handleClick = () => {
      setOpen(!open);
   };

   return (
      <List
         sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
         component="nav"
         aria-labelledby="nested-list-subheader"
         subheader={
            <ListSubheader component="div" id="nested-list-subheader">
               Menu
            </ListSubheader>
         }
      >
         <ListItemButton onClick={handleClick}>
            <ListItemIcon>
               <ChatIcon />
            </ListItemIcon>
            <ListItemText
               sx={{ marginRight: "1em" }}
               primary="Your conversations"
            />
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
               <ListItemButton sx={{ pl: 2 }}>
                  <ListItemText primary="Starred" />
               </ListItemButton>
            </List>
         </Collapse>
      </List>
   );
}
