import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { LSService } from "./ls-service";

// تعریف نوع برای پاسخ‌های خطا
interface ErrorResponse {
  errors?: Record<string, string[]>;
  title?: string;
}

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string, // BASE_URL (inside .env files)
  headers: { "Content-Type": "application/json; charset=UTF-8" },
  timeout: 180000, // 3 minutes
});

// "Requset" interceptors
http.interceptors.request.use(
  (config) => {
    const token = LSService.getToken();
    if (token && token !== "") {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// "Response" interceptors
http.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response) {
      if (error.response.status > 399) {
        const errorData: ErrorResponse = error?.response?.data;
        if (errorData?.errors) {
          Object.values(errorData.errors).forEach((errorArray) => {
            toast.error(errorArray.join(" , "));
          });
        } else if (errorData?.title) {
          toast.error(errorData?.title);
        } else {
          toast.error(error?.message);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Methodes (Requests)
export const get = (url: string, configs?: AxiosRequestConfig) => {
  return http.get(url, configs);
};

export const post = (url: string, payload?: any, configs?: AxiosRequestConfig) => {
  return http.post(url, payload, configs);
};

export const put = (url: string, payload: any, configs?: AxiosRequestConfig) => {
  return http.put(url, payload, configs);
};

export const patch = (url: string, payload: any, configs?: AxiosRequestConfig) => {
  return http.patch(url, payload, configs);
};

export const delete_ = (url: string, configs?: AxiosRequestConfig) => {
  return http.delete(url, configs);
};
