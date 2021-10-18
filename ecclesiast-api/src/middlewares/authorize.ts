// Core
import { NextFunction, Request, Response } from "express";
// Libs
import * as jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
// Models
import { Model as UsersModel } from "../modules/users/model";
// Utils
import { PermissionError } from "../utils";
// Helpers
import { AccessToken, generatePrivateKey, getToken } from "../helpers";
// Constants
import { Statuses, Token } from "../constants";
import { ROLES } from "../modules/accessRoles/constants";
// Types
import { ExpressMiddleware } from "../types";

export const authorize = (roles: ROLES[]): ExpressMiddleware => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const accessRoles = [ ROLES.ROOT, ...roles ];
    const token = req.headers.authorization && getToken(req.headers.authorization);

    if (!token) {
      throw new PermissionError("User is unauthorized", Statuses.Unauthorized);
    }

    jwt.verify(
      token,
      generatePrivateKey(Token.Access),
      (error: JsonWebTokenError | null, _decodedAccessToken: any): Response | void => {
        const { user } = _decodedAccessToken as AccessToken;

        if (error) {
          return next(new PermissionError(error.message, Statuses.Unauthorized));
        }

        const model = new UsersModel();
        model.getById(user._id)
          .then((_user) => {
            const { _id } = req.params;

            if (_user._id !== user._id
              || (_id && _user._id !== _id)
              || _user.accessRole._id.toString() !== user.accessRole._id
              || _user.accessRole.name !== user.accessRole.name
              || !accessRoles.includes(_user.accessRole.name)
            ) {
              return next(new PermissionError("Access denied", Statuses.Forbidden));
            }

            return next();
          })
          .catch((_error) => {
            return next(new PermissionError(`Access denied: ${ _error.message }`, Statuses.Forbidden));
          });
      }
    );
  };
};
