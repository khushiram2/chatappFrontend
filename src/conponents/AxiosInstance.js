import axios from "axios";

const token=window.localStorage.getItem("token")
export const axiosInstance = axios.create();

export const setTokenInAxiosInstance=(Token)=>{
      
    axiosInstance.interceptors.request.use(
      (config) => {
        if (Token ) {
          config.headers.Authorization = Token ||token;
          return config;
        }else{
            Promise.reject("token is missing")
        }
      },
      (error) => {
        return Promise.reject(error);
      }
    );


}