import { AxiosResponse } from "axios";
import http from "../http";
import { getAccessToken } from "../utils/token";
import {
   ReviewResponse,
   SetPackageRes,
   PromptRes,
   FindPackageRes,
   SetTemplateRes,
   ReviewReloadResponse,
} from "./ReviewService.types";

const findPackage = async (
   packageStr: string
): Promise<AxiosResponse<FindPackageRes>> => {
   const token = getAccessToken();

   return await http.post(
      "/code/find_package",
      { data: { package_str: packageStr } },
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );
};

const setPackage = async (
   packageName: string
): Promise<AxiosResponse<SetPackageRes>> => {
   const token = getAccessToken();

   return await http.post(
      "/code/set_package",
      {
         data: { package_name: packageName },
      },
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );
};

const setTemplate = async (
   tempalateNum: number
): Promise<AxiosResponse<SetTemplateRes>> => {
   const token = getAccessToken();

   return await http.post(
      "/code/set_template",
      { data: { template_num: tempalateNum } },
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );
};

const sendPrompt = async (
   prompt: string
): Promise<AxiosResponse<PromptRes>> => {
   const token = getAccessToken();

   return await http.post(
      "/code/prompt",
      { data: { query: prompt } },
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );
};

const getReviews = async (): Promise<AxiosResponse<ReviewResponse>> => {
   const token = getAccessToken();

   return await http.get("/code/reviews", {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });
};

const reloadReview = async (
   review_id: number
): Promise<AxiosResponse<ReviewReloadResponse>> => {
   const token = getAccessToken();

   return await http.get(`/code/review/reload/${review_id}`, {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
   });
};

const ReviewService = {
   findPackage,
   setPackage,
   setTemplate,
   sendPrompt,
   getReviews,
   reloadReview,
};

export default ReviewService;
