import axios from "axios";

const https = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:4000",
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
      if (errorAuth.includes(error.response.code)) {
        return alert(error.response.message);
      }
    }
    return Promise.reject(error);
  },
);

export default https;
