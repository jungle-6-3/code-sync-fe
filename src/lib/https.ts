import axios from "axios";

const BASE_URL = "https://code-sync.net/api/";

const https = axios.create({
  baseURL: BASE_URL,
});

export default https;
