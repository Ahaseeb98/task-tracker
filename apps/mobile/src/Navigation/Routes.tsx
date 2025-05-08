import { FC } from "react";
import { CREATE_TASK_PATH, HOME_PATH, LOGIN_PATH, SIGNUP_PATH } from "./Paths";
import Login from "../Screens/Auth/Login";
import Signup from "../Screens/Auth/Signup";
import Home from "../Screens/Main/Home";
import CreateTask from "../Screens/Main/CreateTask";
export interface ROUTES_TYPE {
  path: string;
  label: string;

  Component: FC;
}

export const AUTH_ROUTES: ROUTES_TYPE[] = [
  {
    path: LOGIN_PATH,
    label: "Login",
    Component: Login,
  },
  {
    path: SIGNUP_PATH,
    label: "Signup",
    Component: Signup,
  },
];

export const MAIN_ROUTES: ROUTES_TYPE[] = [
  {
    path: HOME_PATH,
    label: "Home",
    Component: Home,
  },
  {
    path: CREATE_TASK_PATH,
    label: "Create Task",
    Component: CreateTask,
  },
];
