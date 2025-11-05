import axios from "axios";

const api = axios.create({
  baseURL: "https://abitare-back-production.up.railway.app/api", // tu backend
});

export default api;
