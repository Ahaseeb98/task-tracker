// rootReducer.ts
import { combineReducers } from "redux";
import authSlice from "./authSlice";
import appSlice from "./appSlice";
import taskSlice from "./taskSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  app: appSlice,
  task: taskSlice,
});

export default rootReducer;
