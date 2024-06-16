import { AxiosResponse } from "axios";
import http from "../http";
import { FindPackageRes, PromptRes, SetPackageRes } from "./types";
import { getAccessToken } from "../utils/token";

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
): Promise<AxiosResponse<PromptRes>> => {
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

const ReviewService = {
   findPackage,
   setPackage,
   setTemplate,
   sendPrompt,
};

export default ReviewService;
