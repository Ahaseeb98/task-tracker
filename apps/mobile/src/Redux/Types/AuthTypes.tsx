import { USER_TYPE } from "./../../../../../packages/Types/USERS";
export interface AUTH_TYPE {
  isAuthenticated: boolean;
  token: string | null;
  user?: USER_TYPE | null;
}
