// Core
import * as crypto from "crypto-js";
// Constants
import { Token } from "../constants";

export const generatePrivateKey = (type: Token): string => {
  const password = process.env.PASSWORD ? process.env.PASSWORD : "password";

  if (type === Token.Access) {
    return crypto.SHA256(process.env.PASSWORD + crypto.MD5(password)
      .toString())
      .toString();
  }

  return crypto.SHA512(password)
    .toString();
};
