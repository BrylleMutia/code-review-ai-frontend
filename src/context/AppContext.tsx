import React, { useState } from "react";
import { createContext } from "react";
import { AppContextType, ChatBoxMode, UserDetails } from "./types";
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
   const [isSyncLoading, setIsSyncLoading] = useState(false);
   const [chatBoxMode, setChatBoxMode] = useState<ChatBoxMode>("package");

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
   const handleChatBoxModeChange = (mode: ChatBoxMode) => {
      setChatBoxMode(mode);
   };

   const handleUserLogout = () => {
      handleAuthChange(false);
      handleUserDetailsChange({
         id: "",
         email: "",
         name: "",
      });
      handleChatBoxModeChange("package");
      handlePackageDetailsChange(null);
      localStorage.removeItem("access_token");
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
            packageDetails,
            handlePackageDetailsChange,
            chatBoxMode,
            handleChatBoxModeChange,
            handleUserLogout,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
