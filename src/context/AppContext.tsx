import React, { useState } from "react";
import { createContext } from "react";
import {
   AppContextType,
   Prompt,
   Review,
   SnackBarConfig,
   UserDetails,
} from "./types";
import { BasePackageDetails } from "../services/types";
export const AppContext = createContext<AppContextType | null>(null);

type AppContextProviderProps = {
   children: React.ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [userDetails, setUserDetails] = useState<UserDetails>({
      id: "",
      email: "",
      name: "",
   });
   const [packageDetails, setPackageDetails] =
      useState<BasePackageDetails | null>(null);
   const [promptResponses, setPromptResponses] = useState<Prompt[] | null>(
      null
   );
   const [isSyncLoading, setIsSyncLoading] = useState(false);
   const [snackBarDetails, setSnackBarDetails] = useState<SnackBarConfig>({
      isShown: false,
      message: "",
   });
   const [reviews, setReviews] = useState<Review[] | null>(null);

   const handleAuthChange = (authState: boolean) => {
      setIsAuthenticated(authState);
   };
   const handleUserDetailsChange = (userDetails: UserDetails) => {
      setUserDetails(userDetails);
      localStorage.setItem("userId", userDetails.id);
   };
   const handleSetSyncLoading = (syncState: boolean) => {
      setIsSyncLoading(syncState);
   };
   const handlePackageDetailsChange = (
      packageDetails: BasePackageDetails | null
   ) => {
      setPackageDetails(packageDetails);
   };

   const handleUpdatePrompts = (prompt: Prompt | null) => {
      setPromptResponses((prev) => {
         if (prev && prompt) {
            // remove placeholder prompt from array for loader
            // then add true prompt details to display on chatbox
            let prevPromptsNoPlaceholder = prev.filter(
               (prevPrompt) => prevPrompt.id !== prompt.id
            );

            return [...prevPromptsNoPlaceholder, prompt];
         } else if (prompt) {
            // add initial prompt
            return [prompt];
         }

         // clear prompts array if null is sent
         return null;
      });
   };

   const handleUserLogout = () => {
      handleAuthChange(false);
      handleUserDetailsChange({
         id: "",
         email: "",
         name: "",
      });
      handlePackageDetailsChange(null);
      localStorage.removeItem("access_token");
   };

   const handleChangeSnackbar = (snackBar: SnackBarConfig) => {
      setSnackBarDetails(snackBar);
   };

   const handleUpdateReviews = (reviews: Review[]) => {
      setReviews(reviews);
   };

   // TODO: Add function to update current reviews with latest one, get one review per request only

   return (
      <AppContext.Provider
         value={{
            isAuthenticated,
            handleAuthChange,
            userDetails,
            handleUserDetailsChange,
            isSyncLoading,
            handleSetSyncLoading,
            packageDetails,
            handlePackageDetailsChange,
            handleUserLogout,
            promptResponses,
            handleUpdatePrompts,
            snackBarDetails,
            handleChangeSnackbar,
            reviews,
            handleUpdateReviews,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
