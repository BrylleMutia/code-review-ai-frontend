import { AxiosResponse } from "axios";
import http from "../http";
import { BaseUserDetails, UserDetailsAuth } from "./AuthService.types";
import { getAccessToken } from "../utils/token";

const signupUser = async (
   email: string,
   username: string,
   password: string
): Promise<AxiosResponse<UserDetailsAuth>> => {
   return await http.post("/auth/signup", {
      headers: {
         "Content-Type": "application/json",
      },
      data: { email, username, password },
      withCredentials: false,
   });
};

const loginUser = async (
   email: string,
   password: string,
   remember: boolean
): Promise<AxiosResponse<UserDetailsAuth>> => {
   return await http.post("/auth/login", {
      headers: {
         "Content-Type": "application/json",
      },
      data: { email, password, remember },
      withCredentials: false,
   });
};

const checkToken = async (): Promise<AxiosResponse<BaseUserDetails>> => {
   const token = getAccessToken();

   return await http.get("/auth/token", {
      headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
   });
};

const AuthService = {
   signupUser,
   loginUser,
   checkToken,
};

export default AuthService;
