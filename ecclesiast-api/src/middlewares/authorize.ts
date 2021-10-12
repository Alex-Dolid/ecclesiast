// Core
import { NextFunction, Request, Response } from "express";
// Libs
import * as jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
// Models
import { Model as UsersModel } from "../modules/users/model";
// Utils
import { ValidationError } from "../utils";
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
      throw new ValidationError("User is unauthorized", Statuses.Unauthorized);
    }

    jwt.verify(
      token,
      generatePrivateKey(Token.Access),
      (error: JsonWebTokenError | null, _decodedAccessToken: any): Response | void => {
        const { user } = _decodedAccessToken as AccessToken;

        if (error) {
          next(new ValidationError(error.message, Statuses.Unauthorized));
        }

        const model = new UsersModel();
        model.getById(user._id)
          .then((_user) => {
            if (_user.accessRole._id.toString() !== user.accessRole._id
              || _user.accessRole.name !== user.accessRole.name
              || !accessRoles.includes(_user.accessRole.name)
            ) {
              next(new ValidationError("Access denied", Statuses.Forbidden));
            }

            next();
          })
          .catch((_error) => {
            next(_error);
          });
      }
    );
  };
};
