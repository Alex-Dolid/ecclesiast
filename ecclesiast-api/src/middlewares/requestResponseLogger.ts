// Core
import { NextFunction, Request, Response } from "express";
// Utils
import { logger } from "../utils";

export const requestResponseLogger = (req: Request, res: Response, next: NextFunction): void => {
  let body = null;

  if (req.method !== "GET") {
    body = JSON.stringify(req.body, null, 2);
  }

  logger.debug(`${ req.method } ${ req.url } ${ body ? `\n${ body }` : "" }`);
  next();
};
