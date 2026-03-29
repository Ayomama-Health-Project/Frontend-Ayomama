import axios from "axios";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { clearStoredTokens, getStoredTokens } from "./utils/authStorage";
import { clearSession } from "./store/authSlice";
import { store } from "./store";

let isHandlingUnauthorized = false;

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  async (config) => {
    try {
      const { accessToken } = await getStoredTokens();
      const token = accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Log the full URL being called for debugging
      console.log(
        `API Request: ${config.method.toUpperCase()} ${config.baseURL}${
          config.url
        }`
      );
    } catch (error) {
      console.error("Error getting token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle common errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    // Log detailed error information
    if (error.response) {
      console.error(`API Error: ${error.response.status} ${error.config?.url}`);
      console.error("Error data:", error.response.data);
    } else if (error.request) {
      console.error("Network Error: No response received", error.message);
    } else {
      console.error("Request Error:", error.message);
    }

    const requestUrl = error.config?.url || "";
    const authHeader =
      error.config?.headers?.Authorization || error.config?.headers?.authorization;
    const isSessionUnauthorized =
      error.response?.status === 401 &&
      (Boolean(authHeader) || requestUrl.includes("/api/v1/auth/refresh"));

    if (isSessionUnauthorized) {
      if (!isHandlingUnauthorized) {
        isHandlingUnauthorized = true;
        Toast.show({
          type: "error",
          text1: "Session expired",
          text2: "Please log back in to continue.",
          position: "top",
        });
      }
      await clearStoredTokens();
      store.dispatch(clearSession());
      router.replace("/Onboarding");
      setTimeout(() => {
        isHandlingUnauthorized = false;
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default api;
