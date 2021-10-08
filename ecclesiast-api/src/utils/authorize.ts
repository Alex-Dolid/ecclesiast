// Core
import { NextFunction, Request, Response } from "express";
// Libs
import * as jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
// Models
import { UsersModel } from "../modules/users";
// Utils
import { ValidationError } from "./errors";
// Helpers
import { AccessToken, generatePrivateKey, getToken } from "../helpers";
// Constants
import { ROLES } from "../modules/accessRoles";
import { Statuses, Token } from "../constants";
// Types
import { ExpressMiddleware } from "../types";

export const authorize = (roles: ROLES[]): ExpressMiddleware => (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization && getToken(req.headers.authorization);

  if (!token) {
    throw new ValidationError("User is unauthorized", Statuses.Unauthorized);
  }

  jwt.verify(
    token,
    generatePrivateKey(Token.Access),
    (error: JsonWebTokenError | null, _decodedAccessToken: any): Response | void => {
      const { user } = _decodedAccessToken as AccessToken;

      if (error) {
        throw new ValidationError(error.message, Statuses.Unauthorized);
      }

      const model = new UsersModel();
      model.getById(user._id)
        .then((_user) => {
          if (_user.accessRole._id !== user.accessRole._id
            || _user.accessRole.name !== user.accessRole.name
            || !roles.includes(_user.accessRole.name)
          ) {
            throw new ValidationError("Access denied", Statuses.Forbidden);
          }

          next();
        })
        .catch((_error) => {
          throw _error;
        });
    }
  );
};
