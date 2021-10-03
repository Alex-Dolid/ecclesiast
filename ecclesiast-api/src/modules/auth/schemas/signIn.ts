// Types
import { AuthSignInScheme } from "./types";

export const signIn: AuthSignInScheme = {
  type: "object",
  properties: {
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
  required: [ "email", "password" ]
};
