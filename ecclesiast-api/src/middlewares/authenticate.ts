// Core
import { NextFunction, Request, Response } from "express";
// Libs
import * as jwt from "jsonwebtoken";
import { JsonWebTokenError } from "jsonwebtoken";
// Instruments
import { ValidationError } from "../utils";
// Helpers
import { AccessToken, generatePrivateKey, getToken } from "../helpers";
// Constants
import { Statuses, Token } from "../constants";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization && getToken(req.headers.authorization);

  if (!token) {
    throw new ValidationError("User is unauthorized", Statuses.Unauthorized);
  }

  const isRefreshUrl = () => req.url === "/refresh";

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
      const decodedAccessToken = _decodedAccessToken as AccessToken;

      if (error) {
        throw new ValidationError(error.message, isRefreshUrl() ? Statuses.Forbidden : Statuses.Unauthorized);
      }

      if (isRefreshUrl()) {
        next();
      } else {
        jwt.verify(
          decodedAccessToken.refreshToken,
          generatePrivateKey(Token.Refresh),
          (_error: JsonWebTokenError | null): Response | void => {
            if (_error) {
              throw new ValidationError(_error.message, Statuses.Forbidden);
            }

            next();
          }
        );
      }
    }
  );
};
