// Constants
import { ROLES } from "../constants";
// Types
import { AccessRoleCommonScheme } from "./types";

export const common: AccessRoleCommonScheme = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      nullable: true
    },
    name: {
      type: "string",
      enum: [ ...Object.values(ROLES) ],
      minLength: 3
    }
  },
  additionalProperties: false,
  required: []
};
