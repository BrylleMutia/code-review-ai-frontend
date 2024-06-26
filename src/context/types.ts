import { BaseUserDetails } from "../services/AuthService.types";
import type { BasePackageDetails } from "../services/ReviewService.types";
import type { Prompt, Review } from "../services/ReviewService.types";

export type AppContextType = {
   isAuthenticated: boolean;
   handleAuthChange: (authState: boolean) => void;
   userDetails: BaseUserDetails;
   handleUserDetailsChange: (userDetails: BaseUserDetails) => void;
   isSyncLoading: boolean;
   handleSetSyncLoading: (syncState: boolean) => void;
   currentReviewDetails: Review | null;
   handleChangeCurrentReview: (reviewDetails: Review) => void;
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
   handleAddReview: (review: Review) => void;
   selectedTheme: MUIThemes;
   handleChangeTheme: (theme: MUIThemes) => void;
};

export type MUIThemes = "light" | "dark";

export type SnackBarConfig = {
   isShown: boolean;
   message: string;
};
