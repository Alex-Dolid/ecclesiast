// Types
import { AuthSignInScheme } from "./types";

export const signIn: AuthSignInScheme = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      minLength: 7
    },
    password: {
      type: "string",
      format: "password",
      minLength: 8
    }
  },
  additionalProperties: false,
  required: [ "email", "password" ]
};
