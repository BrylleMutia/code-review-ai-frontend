import React, { useState } from "react";
import { createContext } from "react";
import type { AppContextType, MUIThemes, SnackBarConfig } from "./types";
import type { Prompt, Review } from "../services/ReviewService.types";
import type { BaseUserDetails } from "../services/AuthService.types";
import type { BasePackageDetails } from "../services/ReviewService.types";

export const AppContext = createContext<AppContextType | null>(null);

type AppContextProviderProps = {
   children: React.ReactNode;
};

const AppContextProvider = ({ children }: AppContextProviderProps) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [userDetails, setUserDetails] = useState<BaseUserDetails>({
      id: "",
      email: "",
      name: "",
   });
   const [isSyncLoading, setIsSyncLoading] = useState(false);
   const [currentReviewDetails, setCurrentReviewDetails] =
      useState<Review | null>(null);
   const [packageDetails, setPackageDetails] =
      useState<BasePackageDetails | null>(null);
   const [promptResponses, setPromptResponses] = useState<Prompt[] | null>(
      null
   );
   const [snackBarDetails, setSnackBarDetails] = useState<SnackBarConfig>({
      isShown: false,
      message: "",
   });
   const [reviews, setReviews] = useState<Review[] | null>(null);
   const [selectedTheme, setSelectedTheme] = useState<MUIThemes>("light");

   const handleAuthChange = (authState: boolean) => {
      setIsAuthenticated(authState);
   };
   const handleUserDetailsChange = (userDetails: BaseUserDetails) => {
      setUserDetails(userDetails);
      localStorage.setItem("userId", userDetails.id);
   };
   const handleSetSyncLoading = (syncState: boolean) => {
      setIsSyncLoading(syncState);
   };

   const handleChangeCurrentReview = (review: Review) => {
      setCurrentReviewDetails(review);
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
      reviews.sort((reviewA, reviewB) =>
         reviewA.date_created > reviewB.date_created ? -1 : 1
      );

      setReviews(reviews);
   };

   const handleAddReview = (review: Review) => {
      setReviews((prev) => {
         if (prev) {
            return [review, ...prev];
         }

         return [review];
      });
   };

   const handleChangeTheme = (theme: MUIThemes) => {
      setSelectedTheme(theme);
      localStorage.setItem("theme", theme);
   };

   return (
      <AppContext.Provider
         value={{
            isAuthenticated,
            handleAuthChange,
            userDetails,
            handleUserDetailsChange,
            isSyncLoading,
            handleSetSyncLoading,
            currentReviewDetails,
            handleChangeCurrentReview,
            packageDetails,
            handlePackageDetailsChange,
            handleUserLogout,
            promptResponses,
            handleUpdatePrompts,
            snackBarDetails,
            handleChangeSnackbar,
            reviews,
            handleUpdateReviews,
            handleAddReview,
            selectedTheme,
            handleChangeTheme,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
