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
   chatBoxMode: ChatBoxMode;
   handleChatBoxModeChange: (mode: ChatBoxMode) => void;
   promptResponses: Prompt[];
   handleUpdatePrompts: (prompt: Prompt) => void;
   handleUserLogout: () => void;
};

export type UserDetails = {
   id: string;
   email: string;
   name: string;
};

export type Prompt = {
   prompt: string;
   response: string;
};

export type ChatBoxMode = "package" | "prompt";
