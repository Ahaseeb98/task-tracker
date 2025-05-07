import { USER_TYPE } from "./../Types/USERS";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: USER_TYPE;
}
