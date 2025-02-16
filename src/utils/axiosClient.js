import axios from "axios";
import { tokenUtils } from "./tokenUtils";

const createAxiosClient = (config = {}) => {
  const { isAdmin = false, isAuth = false } = config;

  const getBaseURL = () => {
    if (isAuth) {
      return `${import.meta.env.VITE_BASE_URL}`;
    }
    return `${import.meta.env.VITE_BASE_URL}/api/${import.meta.env.VITE_BASE_PATH}${isAdmin ? "/admin" : ""}`;
  };

  const instance = axios.create({
    baseURL: getBaseURL(),
    timeout: 20000,
  });

  // 請求攔截器
  instance.interceptors.request.use((config) => {
    const token = tokenUtils.getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  // 回應攔截器
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const { response } = error;

      if (response?.status === 401) {
        tokenUtils.removeToken();
        window.location.href = "/login";
      }

      const errorMessage = response?.data?.message || error.message;
      console.error("API 錯誤:", errorMessage);

      return Promise.reject({
        success: false,
        message: errorMessage,
        status: response?.status,
      });
    },
  );

  return instance;
};

export const adminAPI = createAxiosClient({ isAdmin: true });
export const clientAPI = createAxiosClient({ isAdmin: false });
export const authAPI = createAxiosClient({ isAuth: true });
