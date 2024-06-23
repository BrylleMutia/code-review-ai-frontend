export type FindPackageRes = {
   packages: string[];
};

export type ModuleDetails = {
   referenced_type: string;
   referenced_name: string;
};

export type BasePackageDetails = {
   line_count: number;
   package_name: string;
   ref_modules: ModuleDetails[];
   ref_tables: string[];
};

export type SetPackageRes = {
   data: BasePackageDetails;
};

export type PromptRes = {
   response: string;
};

export type SetTemplateRes = {
   response: string;
   review: Review;
};

export type Prompt = {
   id: number;
   prompt: string;
   response: string;
   isLoading: boolean;
};

export type Review = {
   id: number;
   user_id: number;
   package_name: string;
   review_name: string;
   date_created: string;
};

export type ReviewResponse = {
   response: Review[];
};
