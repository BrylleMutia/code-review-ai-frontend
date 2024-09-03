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
   review_id: number,
   tempalateNum: number
): Promise<AxiosResponse<SetTemplateRes>> => {
   const token = getAccessToken();

   return await http.post(
      `/code/set_template/${review_id}`,
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
   review_id: number,
   prompt: string
): Promise<AxiosResponse<PromptRes>> => {
   const token = getAccessToken();

   return await http.post(
      `/code/prompt/${review_id}`,
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

const generateOutline = async (
   review_id: number
): Promise<AxiosResponse<File>> => {
   const token = getAccessToken();

   return await http.post(
      `/code/review/outline/${review_id}`,
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      },
      {
         responseType: "blob",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );
};

const exportConversation = async (
   review_id: number
): Promise<AxiosResponse<File>> => {
   const token = getAccessToken();

   return await http.post(
      `/code/review/export/${review_id}`,
      {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      },
      {
         responseType: "blob",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      }
   );
};

const ReviewService = {
   findPackage,
   setPackage,
   setTemplate,
   sendPrompt,
   getReviews,
   reloadReview,
   generateOutline,
   exportConversation,
};

export default ReviewService;
