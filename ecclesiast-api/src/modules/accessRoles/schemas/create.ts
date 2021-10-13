// Types
import { AccessRoleCommonScheme } from "./types";
// Schemas
import { common } from "./common";

export const create: AccessRoleCommonScheme = {
  ...common,
  required: [ "name" ]
};
