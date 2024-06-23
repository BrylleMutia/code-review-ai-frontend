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
   snackBarDetails: SnackBarConfig;
   handleChangeSnackbar: (snackBar: SnackBarConfig) => void;
   reviews: Review[] | null;
   handleUpdateReviews: (reviews: Review[]) => void;
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

export type SnackBarConfig = {
   isShown: boolean;
   message: string;
};

export type Review = {
   id: number;
   user_id: number;
   package_name: string;
   date_created: string;
};

export type ReviewResponse = {
   response: Review[];
};
