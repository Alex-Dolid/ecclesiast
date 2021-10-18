// Core
import { NextFunction, Request, Response } from "express";
// Utils
import { errorLogger, notFoundLogger, validationLogger, permissionLogger, serverLogger } from "../utils";
// Helpers
import { sendResponse } from "../helpers";
// Constants
import { Statuses, ErrorNames } from "../constants";
// Types
import { IError } from "../types";

export const ErrorHandler = (error: Error & IError, req: Request, res: Response, next: NextFunction): void => {
  const { name, message, errors, statusCode = Statuses.ServerError } = error;
  const errorMessage = `${ name }: ${ message }`;

  switch (name) {
    case ErrorNames.NotFoundError:
      notFoundLogger.error(errorMessage);
      break;

    case ErrorNames.ValidationError:
      validationLogger.error(errorMessage);
      break;

    case ErrorNames.PermissionError:
      permissionLogger.error(errorMessage);
      break;

    case ErrorNames.ServerError:
      serverLogger.error(errorMessage);
      break;

    default:
      errorLogger.error(errorMessage);
      break;
  }

  sendResponse(res, { type: "error", name, message, errors }, { statusCode });
};
