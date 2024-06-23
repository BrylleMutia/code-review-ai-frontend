export type BaseUserDetails = {
   id: string;
   name: string;
   email: string;
};

export type UserDetailsAuth = {
   access_token: string;
} & BaseUserDetails;
