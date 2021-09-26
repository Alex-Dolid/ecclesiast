// Types
import { UsersCommonScheme } from "./types";

export const common: UsersCommonScheme = {
  type: "object",
  properties: {
    _id: {
      type: "string",
      nullable: true
    },
    nickname: {
      type: "string",
      minLength: 3
    },
    email: {
      type: "string",
      minLength: 7
    },
    accessRole: {
      type: "string",
      minLength: 10
    },
    password: {
      type: "string",
      minLength: 8
    },
    token: {
      type: "string",
      nullable: true
    }
  },
  additionalProperties: false,
  required: []
};
