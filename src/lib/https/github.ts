import axios from "axios";

export const githubHttps = axios.create({
  baseURL: import.meta.env.VITE_PR_URL,
});