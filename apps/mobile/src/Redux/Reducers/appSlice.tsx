// appSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { APP_TYPES } from "../Types/AppTypes";

const initialState: APP_TYPES = {
  mode: "main",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addAppModes: (state, { payload }) => {
      state.mode = payload;
    },
  },
});

export const { addAppModes } = appSlice.actions;

export default appSlice.reducer;
