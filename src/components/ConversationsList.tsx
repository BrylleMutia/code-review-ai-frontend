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
import ReviewService from "../services/ReviewService";
import { BasePackageDetails } from "../services/ReviewService.types";

export default function ConversationsList() {
   const [open, setOpen] = React.useState(true);

   const {
      packageDetails,
      reviews,
      handlePackageDetailsChange,
      handleSetSyncLoading,
      handleUpdatePrompts,
      handleChangeCurrentReview,
   } = useContext(AppContext) as AppContextType;

   const handleClick = () => {
      setOpen(!open);
   };

   const handleReviewReload = (review_id: number) => {
      handleSetSyncLoading(true);
      handleUpdatePrompts(null);
      handlePackageDetailsChange(null);

      ReviewService.reloadReview(review_id).then((response) => {
         const {
            package_name,
            line_count,
            ref_modules,
            ref_tables,
            prompts,
            date_created,
            id,
            name,
            user_id,
         } = response.data.data;

         // update package details
         const packageDetailsReload: BasePackageDetails = {
            package_name,
            line_count,
            ref_modules: ref_modules.map((mod) => ({
               referenced_type: mod.type,
               referenced_name: mod.name,
            })),
            ref_tables: ref_tables.map((table) => table.name),
         };
         handlePackageDetailsChange(packageDetailsReload);

         // update current review
         handleChangeCurrentReview({
            id,
            date_created,
            line_count,
            name,
            package_name,
            user_id,
         });

         // update prompts
         console.log(prompts);
         prompts.forEach((prompt) => {
            handleUpdatePrompts({
               id: prompt.id,
               prompt: prompt.name,
               response: prompt.response,
               isLoading: false,
            });
         });

         handleSetSyncLoading(false);
      });
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
               display: packageDetails ? "flex" : "none",
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
                     <ListItemButton
                        sx={{ pl: 2 }}
                        key={index}
                        dense
                        onClick={() => handleReviewReload(review.id)}
                     >
                        <ListItemText
                           sx={{
                              "& .MuiListItemText-primary": {
                                 fontSize: "0.8em",
                              },
                           }}
                           primary={review.name}
                        />
                     </ListItemButton>
                  ))}
            </List>
         </Collapse>
      </List>
   );
}
