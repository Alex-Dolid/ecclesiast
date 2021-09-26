// Types
import { AccessRolesCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: AccessRolesCommonScheme = {
  ...common,
  required: [ "name" ]
};
