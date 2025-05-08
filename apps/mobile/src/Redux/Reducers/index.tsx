// rootReducer.ts
import { combineReducers } from "redux";
import authSlice from "./authSlice";
import appSlice from "./appSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
});

export default rootReducer;
