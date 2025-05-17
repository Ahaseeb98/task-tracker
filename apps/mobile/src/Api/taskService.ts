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

export const updateTask = async (id: string, formData: FormData) => {
  console.log(id);
  const response = await axiosInstance.patch(
    TASK_URL?.replace(":id", id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(TASK_URL?.replace(":id", id));
  return response.data;
};

export const updateTaskStatus = async (
  id: string,
  data: { status: string; comment?: string }
) => {
  console.log(`/tasks/${id}/status`);
  const response = await axiosInstance.patch(`/tasks/${id}/status`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
