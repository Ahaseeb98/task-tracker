import { LOGIN_URL, SIGNUP_URL } from "../Constants/API_ROUTES";
import axiosInstance from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosInstance.post(LOGIN_URL, { email, password });
  const { access_token } = response.data;
  if (access_token) {
    await SecureStore.setItemAsync("token", access_token);
  }
  return response.data;
};

export const registerRequest = async (formData: FormData) => {
  const response = await axiosInstance.post(SIGNUP_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const { access_token } = response.data;

  if (access_token) {
    await SecureStore.setItemAsync("token", access_token);
  }

  return response.data;
};

export const logout = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("token");
};
