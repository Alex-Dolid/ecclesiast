// Core
import { NextFunction, Request, Response } from "express";
// Utils
import { errorLogger, notFoundLogger, validationLogger } from "../utils";
// Helpers
import { sendResponse } from "../helpers";
// Constants
import { Statuses } from "../constants";
// Types
import { IErrorHandler } from "../types";

export const ErrorHandler = (error: Error & IErrorHandler, req: Request, res: Response, next: NextFunction): void => {
  const { name, message, statusCode = Statuses.ServerError } = error;
  const errorMessage = `${ name }: ${ message }`;

  switch (error.name) {
    case "NotFoundError":
      notFoundLogger.error(errorMessage);
      break;

    case "ValidationError":
      validationLogger.error(errorMessage);
      break;

    default:
      errorLogger.error(errorMessage);
      break;
  }

  sendResponse(res, { type: "error", name: error.name, message }, { statusCode });
};
