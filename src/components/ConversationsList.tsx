import React, { useContext } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChatIcon from "@mui/icons-material/Chat";
import PackageSelectDialog from "./PackageSelectDialog";
import { Box } from "@mui/material";
import { AppContextType } from "../context/types";
import { AppContext } from "../context/AppContext";

export default function ConversationsList() {
   const [open, setOpen] = React.useState(true);

   const { packageDetails, reviews } = useContext(AppContext) as AppContextType;

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
         <Box
            sx={{
               display: !!packageDetails ? "flex" : "none",
               width: "100%",
               justifyContent: "center",
               marginTop: "1em",
               marginBottom: "1em",
            }}
         >
            <PackageSelectDialog />
         </Box>

         <ListItemButton onClick={handleClick}>
            <ListItemIcon>
               <ChatIcon />
            </ListItemIcon>
            <ListItemText sx={{ marginRight: "1em" }} primary="Reviews" />
            {open ? <ExpandLess /> : <ExpandMore />}
         </ListItemButton>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
               {reviews &&
                  reviews.map((review, index) => (
                     <ListItemButton sx={{ pl: 2 }} key={index} dense>
                        <ListItemText
                           sx={{
                              "& .MuiListItemText-primary": {
                                 fontSize: "0.8em",
                              },
                           }}
                           primary={review.review_name}
                        />
                     </ListItemButton>
                  ))}
            </List>
         </Collapse>
      </List>
   );
}
