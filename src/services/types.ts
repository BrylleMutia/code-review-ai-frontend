export type BaseUserDetails = {
   id: string;
   name: string;
   email: string;
};

export type UserDetailsAuth = {
   access_token: string;
} & BaseUserDetails;

export type FindPackageRes = {
   packages: string[];
};

export type ModuleDetails = {
   referenced_type: string;
   referenced_name: string;
};

export type SetPackageRes = {
   data: {
      line_count: number;
      package_name: string;
      ref_modules: ModuleDetails[];
      ref_tables: string[];
   };
};

export type PromptRes = {
   response: string;
};