// Core
import * as jwt from "jsonwebtoken";
// Helpers
import { generatePrivateKey } from "./generatePrivateKey";
// Constants
import { Token } from "../constants";
// Types
import { User } from "../modules/users";

export type AccessToken = {
  user: Omit<User, "password" | "token">,
  refreshToken: string
}

export const createToken = async (user: Omit<User, "password" | "token">): Promise<string> => {
  const payload: AccessToken = {
    user,
    refreshToken: await jwt.sign({}, generatePrivateKey(Token.Refresh), { expiresIn: 86400 })
  };
  const token = await jwt.sign(payload, generatePrivateKey(Token.Access), { expiresIn: 900 });

  return token;
};
