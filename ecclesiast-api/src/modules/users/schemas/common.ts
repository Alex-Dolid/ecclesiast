// Types
import { UsersCommonScheme } from "./types";

export const common: UsersCommonScheme = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      nullable: true
    },
    email: {
      type: "string",
      minLength: 7
    },
    password: {
      type: "string",
      minLength: 8
    }
  },
  additionalProperties: false,
  required: []
};
