// Types
import { UsersCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: UsersCommonScheme = {
  ...common,
  required: [ "nickname", "email", "password", "accessRole" ]
};
