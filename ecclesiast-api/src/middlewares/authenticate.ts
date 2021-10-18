// Core
import { NextFunction, Request, Response } from "express";
// Libs
import * as jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
// Instruments
import { PermissionError } from "../utils";
// Helpers
import { AccessToken, generatePrivateKey, getToken } from "../helpers";
// Constants
import { Statuses, Token } from "../constants";
import { Model as UsersModel } from "../modules/users/model";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization && getToken(req.headers.authorization);

  if (!token) {
    throw new PermissionError("User is unauthorized", Statuses.Unauthorized);
  }

  const isRefreshUrl = () => req.url?.includes("/refresh");

  let refreshToken = null;
  if (isRefreshUrl()) {
    const decodedAccessToken = jwt.decode(token);
    if (decodedAccessToken && typeof decodedAccessToken === "object") {
      refreshToken = decodedAccessToken.refreshToken;
    }
  }

  const _token = isRefreshUrl() ? refreshToken : token;
  const _typePrivateKey = isRefreshUrl() ? Token.Refresh : Token.Access;

  jwt.verify(
    _token,
    generatePrivateKey(_typePrivateKey),
    (error: JsonWebTokenError | null, _decodedAccessToken: any): Response | void => {
      const { user, refreshToken: _refreshToken } = _decodedAccessToken as AccessToken;

      if (error) {
        return next(new PermissionError(error.message, isRefreshUrl() ? Statuses.Forbidden : Statuses.Unauthorized));
      }

      const model = new UsersModel();
      model.getById(user._id)
        .then((_user) => {
          if (_user.token !== token) {
            return next(new PermissionError("jwt malformed", Statuses.Forbidden));
          }

          if (isRefreshUrl()) {
            return next();
          }

          jwt.verify(
            _refreshToken,
            generatePrivateKey(Token.Refresh),
            (_error: JsonWebTokenError | null): Response | void => {
              if (_error) {
                return next(new PermissionError(_error.message, Statuses.Forbidden));
              }

              return next();
            }
          );
        })
        .catch((_error) => {
          return next(new PermissionError(`Access denied: ${ _error.message }`, Statuses.Forbidden));
        });
    }
  );
};
