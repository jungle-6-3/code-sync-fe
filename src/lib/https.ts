import axios from "axios";
import VITE_BASE_URL from "../env.ts";

const https = axios.create({
  baseURL: VITE_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

https.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const errorAuth = [
  "AUTH_1",
  "AUTH_2",
  "AUTH_3",
  "AUTH_4",
  "AUTH_5",
  "AUTH_6",
  "AUTH_7",
  "AUTH_8",
  "AUTH_9",
];

https.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status) {
      if (errorAuth.includes(error.response.data?.code)) {
        return alert(error.response.data?.message);
      }
    }
    return Promise.reject(error);
  },
);

export default https;
