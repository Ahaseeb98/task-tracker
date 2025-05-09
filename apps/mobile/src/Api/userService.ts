import { USERS_URL } from "../Constants/API_ROUTES";
import axiosInstance from "./axiosInstance"; // Adjust path as needed

export const getUsers = async () => {
  const response = await axiosInstance.get(USERS_URL);
  return response.data;
};
