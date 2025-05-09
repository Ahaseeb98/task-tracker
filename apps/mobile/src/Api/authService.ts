import axiosInstance from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

export const loginRequest = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/login", { email, password });
  const { access_token } = response.data;
  if (access_token) {
    await SecureStore.setItemAsync("token", access_token);
  }
  return response.data;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  address?: string;
  role: "employee" | "employer";
  referredBy?: string;
  avatar?: File;
};

export const registerRequest = async (data: RegisterPayload) => {
  const response = await axiosInstance.post("/auth/register", data);
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
