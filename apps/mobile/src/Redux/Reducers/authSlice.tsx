// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { AUTH_TYPE } from "../Types/AuthTypes";

const initialState: AUTH_TYPE = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isAuthenticated = true;
      state.token = payload.access_token;
      state.token = payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
