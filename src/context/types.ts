import type { BasePackageDetails } from "../services/types";

export type AppContextType = {
   isAuthenticated: boolean;
   handleAuthChange: (authState: boolean) => void;
   userDetails: UserDetails;
   handleUserDetailsChange: (userDetails: UserDetails) => void;
   isSyncLoading: boolean;
   handleSetSyncLoading: (syncState: boolean) => void;
   packageDetails: BasePackageDetails | null;
   handlePackageDetailsChange: (
      packageDetails: BasePackageDetails | null
   ) => void;
   promptResponses: Prompt[] | null;
   handleUpdatePrompts: (prompt: Prompt | null) => void;
   handleUserLogout: () => void;
};

export type UserDetails = {
   id: string;
   email: string;
   name: string;
};

export type Prompt = {
   id: number;
   prompt: string;
   response: string;
   isLoading: boolean;
};
