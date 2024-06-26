export type BasePackageDetails = {
   package_name: string;
   line_count: number;
   ref_modules: ModuleDetails[];
   ref_tables: string[];
};

export type FindPackageRes = {
   packages: string[];
};

export type ModuleDetails = {
   referenced_type: string;
   referenced_name: string;
};

export type ModuleDetailsResponse = {
   type: string;
   name: string;
};

export type TableDetails = {
   name: string;
};

export type Review = {
   id: number;
   user_id: number;
   package_name: string;
   name: string;
   date_created: string;
   line_count: number;
};

export type ReviewReload = {
   ref_modules: ModuleDetailsResponse[];
   ref_tables: TableDetails[];
   prompts: PromptResponse[];
} & Review;

export type ReviewReloadResponse = {
   data: ReviewReload;
};

export type Prompt = {
   id: number;
   prompt: string;
   response: string;
   isLoading: boolean;
};

export type PromptResponse = {
   id: number;
   name: string;
   response: string;
   review_id: number;
};

export type SetPackageRes = {
   data: BasePackageDetails;
   review: Review;
};

export type PromptRes = {
   response: string;
};

export type SetTemplateRes = {
   response: string;
   review: Review;
};

export type ReviewResponse = {
   response: Review[];
};
