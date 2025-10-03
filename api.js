import asyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-ayomama.onrender.com",
  // Request timeout
  timeout: 5000, 
});
export default api;

api.interceptors.request.use(
  async (config) => {
    const token = await asyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
);