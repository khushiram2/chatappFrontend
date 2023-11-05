import axios from "axios";

const Token = window.localStorage.getItem("token");

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    if (Token) {
      config.headers.Authorization = Token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);