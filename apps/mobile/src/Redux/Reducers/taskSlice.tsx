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
    editTask: (state, { payload }) => {
      const index = state.tasks.findIndex((task) => task._id === payload._id);
      if (index !== -1) {
        state.tasks[index] = payload;
      }
    },
  },
});

export const { addTasks, addNewTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;
