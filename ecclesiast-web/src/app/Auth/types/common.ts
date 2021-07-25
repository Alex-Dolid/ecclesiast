import { Role } from "./enums";

export type UserAuth = {
  email: string;
  password: string;
}
export type User = UserAuth & {
  _id: string;
  password: Partial<UserAuth["password"]>;
  role: Role;
  token: string;
};
