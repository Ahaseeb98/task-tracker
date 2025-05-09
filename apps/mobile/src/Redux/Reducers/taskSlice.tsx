import { createSlice } from "@reduxjs/toolkit";
import { TASK_TYPES } from "../Types/TaskTypes";

const initialState: TASK_TYPES = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTasks: (state, { payload }) => {
      state.tasks = payload;
    },
    addNewTask: (state, { payload }) => {
      state.tasks = [payload, ...state.tasks];
    },
  },
});

export const { addTasks, addNewTask } = taskSlice.actions;

export default taskSlice.reducer;
