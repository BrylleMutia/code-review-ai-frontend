import React, { useState } from "react";
import { createContext } from "react";
import { AppContextType, UserDetails } from "./types";
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
   const [isSyncLoading, setIsSyncLoading] = useState(false);

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

   return (
      <AppContext.Provider
         value={{
            isAuthenticated,
            handleAuthChange,
            userDetails,
            handleUserDetailsChange,
            isSyncLoading,
            handleSetSyncLoading,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
