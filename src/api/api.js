import axios from "axios";

const api = axios.create({
  baseURL: "https://lc82mg08-10000.brs.devtunnels.ms/api", // tu backend
});

export default api;
