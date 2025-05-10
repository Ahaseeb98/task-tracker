import { FC } from "react";
import {
  CREATE_TASK_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  SIGNUP_PATH,
  TASK_PATH,
} from "./Paths";
import Login from "../Screens/Auth/Login";
import Signup from "../Screens/Auth/Signup";
import Home from "../Screens/Main/Home";
import CreateTask from "../Screens/Main/CreateTask";
import Task from "../Screens/Main/Task";
import Profile from "../Screens/Main/Profile";
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
  {
    path: TASK_PATH,
    label: "Task",
    Component: Task,
  },
  {
    path: PROFILE_PATH,
    label: "Profile",
    Component: Profile,
  },
];
