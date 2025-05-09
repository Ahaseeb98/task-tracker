import * as SecureStore from "expo-secure-store";

import axios from "axios";
import { API_BASE_URL } from "../Constants/API_ROUTES";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // You can handle specific HTTP errors here
      if (error.response.status === 401) {
        alert("Unauthorized! Maybe redirect to login.");
      } else if (error.response.status === 500) {
        alert("Server error.");
      }
    } else {
      alert("Something went wrong, try later");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
