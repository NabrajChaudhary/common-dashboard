import { getCookie } from "js-cookie-helper";

import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/constants/index.constants";

const createAxiosInstance = (baseURL: string | undefined) =>
  axios.create({ baseURL });

const publicAxios = createAxiosInstance(NEXT_PUBLIC_API_URL);

publicAxios.interceptors.request.use(
  (config) => {
    if (getCookie("auth-token")) {
      config.headers["Authorization"] = `Bearer ${getCookie("auth-token")}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

publicAxios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export { publicAxios };
