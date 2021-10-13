// Types
import { UserCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: UserCommonScheme = {
  ...common,
  required: [ "nickname", "email", "password", "accessRole" ]
};
