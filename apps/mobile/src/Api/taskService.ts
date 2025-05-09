import { TASK_URL, TASKS_URL } from "../Constants/API_ROUTES";
import axiosInstance from "./axiosInstance"; // Adjust path as needed

export const getTasks = async () => {
  const response = await axiosInstance.get(TASKS_URL);
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await axiosInstance.get(TASK_URL?.replace(":id", id));
  return response.data;
};
export const createTask = async (formData: FormData) => {
  const response = await axiosInstance.post(TASKS_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateTask = async (
  id: string,
  taskData: Partial<{
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
  }>
) => {
  const response = await axiosInstance.put(
    TASK_URL?.replace(":id", id),
    taskData
  );
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(TASK_URL?.replace(":id", id));
  return response.data;
};
