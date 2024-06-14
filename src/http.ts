import axios from "axios";

const baseURL =
   import.meta.env.PROD === true
      ? import.meta.env.VITE_BASE_URL
      : import.meta.env.VITE_BASE_URL_DEV;

export default axios.create({
   baseURL: baseURL,
});
