export type AppContextType = {
   isAuthenticated: boolean;
   handleAuthChange: (authState: boolean) => void;
   userDetails: UserDetails;
   handleUserDetailsChange: (userDetails: UserDetails) => void;
   isSyncLoading: boolean;
   handleSetSyncLoading: (syncState: boolean) => void;
};

export type UserDetails = {
   id: string;
   email: string;
   name: string;
};
