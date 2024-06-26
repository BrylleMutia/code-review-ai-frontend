import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

import { AppContext } from "../context/AppContext";
import { AppContextType } from "../context/types";
import ReviewService from "../services/ReviewService";
import { errorHandler } from "../utils/error";

const PackageSelectDialog = () => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [searchPackage, setSearchPackage] = useState<string | null>(null);
   const [matchedPackages, setMatchedPackages] = useState<string[]>([]);
   const [selectedPackage, setSelectedPackage] = useState<string>("");
   const [isSearchCaptionShown, setIsSearchCaptionShown] = useState(false);
   const [isSearchLoading, setIsSearchLoading] = useState(false);

   const {
      handlePackageDetailsChange,
      handleSetSyncLoading,
      handleUpdatePrompts,
      handleChangeSnackbar,
      handleAddReview,
   } = useContext(AppContext) as AppContextType;

   const handleDialogOpen = () => {
      setIsDialogOpen(true);
   };

   const handleDialogClose = () => {
      setSearchPackage(null);
      setIsDialogOpen(false);
   };

   const handleSearchPackageChange = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setSearchPackage(event.target.value);
   };

   const handlePackageSearch = () => {
      if (searchPackage) {
         setIsSearchLoading(true);

         ReviewService.findPackage(searchPackage).then((response) => {
            setMatchedPackages(response.data.packages);
            setIsSearchLoading(false);

            if (response.data.packages.length) {
               setSelectedPackage(response.data.packages[0]);
               setIsSearchCaptionShown(true);
            }
         });
      }
   };

   const handlePackageChange = (event: SelectChangeEvent<string>) => {
      setSelectedPackage(event.target.value);
   };

   const handleSubmitPackageForReview = (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();

      if (selectedPackage) {
         setIsSearchCaptionShown(false);
         handleDialogClose();
         handleSetSyncLoading(true);

         // clear up prompts from previous review
         handleUpdatePrompts(null);

         // setup initial package details for loader
         handlePackageDetailsChange({
            line_count: 0,
            package_name: selectedPackage,
            ref_modules: [],
            ref_tables: [],
         });

         ReviewService.setPackage(selectedPackage)
            .then((response) => {
               handlePackageDetailsChange(response.data.data);
               handleAddReview(response.data.review);
               handleSetSyncLoading(false);
            })
            .catch((err) => errorHandler(err, handleChangeSnackbar));
      }
   };

   return (
      <React.Fragment>
         <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleDialogOpen}
         >
            New Review
         </Button>
         <Dialog
            fullWidth
            maxWidth="xs"
            open={isDialogOpen}
            onClose={handleDialogClose}
            PaperProps={{
               component: "form",
               onSubmit: handleSubmitPackageForReview,
            }}
         >
            <DialogTitle>Review</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Please search package to review
               </DialogContentText>
               <Box
                  sx={{
                     display: "flex",
                     flexDirection: "column",
                     m: "auto",
                     width: "fit-content",
                     marginTop: "2em",
                  }}
               >
                  <FormControl
                     sx={{
                        display: "flex",
                        flexDirection: "row",
                        mt: 2,
                        minWidth: 120,
                     }}
                  >
                     <TextField
                        id="package-search"
                        label="Search package"
                        variant="outlined"
                        onChange={handleSearchPackageChange}
                        size="small"
                        autoFocus
                     />
                     <IconButton
                        aria-label="send"
                        color="primary"
                        type="button"
                        onClick={handlePackageSearch}
                     >
                        {isSearchLoading ? (
                           <CircularProgress color="inherit" size={23} />
                        ) : (
                           <SearchIcon />
                        )}
                     </IconButton>
                  </FormControl>

                  {isSearchCaptionShown && (
                     <Typography
                        variant="caption"
                        display="block"
                        color="primary"
                     >
                        Found {matchedPackages.length} packages
                     </Typography>
                  )}

                  <FormControl sx={{ mt: 2, minWidth: 120 }} required>
                     <InputLabel size="small" htmlFor="package-name">
                        Package name
                     </InputLabel>
                     <Select
                        value={selectedPackage}
                        onChange={handlePackageChange}
                        label="Package name"
                        required
                        inputProps={{
                           name: "package-name",
                           id: "package-name",
                        }}
                        size="small"
                     >
                        {matchedPackages.map((packageName, index) => (
                           <MenuItem value={packageName} key={index}>
                              {packageName}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </Box>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleDialogClose} color="inherit">
                  Close
               </Button>
               <Button type="submit">Review</Button>
            </DialogActions>
         </Dialog>
      </React.Fragment>
   );
};

export default PackageSelectDialog;
