import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
})

http.interceptors.request.use((config) => {
  return config;
}, (err: any) => {
  return Promise.reject(err);
})

http.interceptors.response.use((config) => { return config }, (err: any) => { Promise.reject(err); });
