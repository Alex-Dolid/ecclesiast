import { Role } from "./enums";

export type User = {
  email: string;
  password?: string;
  role: Role;
};
