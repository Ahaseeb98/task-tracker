import * as SecureStore from "expo-secure-store";

import axios from "axios";
import { API_BASE_URL } from "../Constants/API_ROUTES";
import Toast from "react-native-toast-message";

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
    console.log(error);
    if (error.response) {
      // You can handle specific HTTP errors here
      if (error.response.status === 401) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Unauthorized! Maybe redirect to login.",
        });
      } else if (error.response.status === 500) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Server error.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong, try later",
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
