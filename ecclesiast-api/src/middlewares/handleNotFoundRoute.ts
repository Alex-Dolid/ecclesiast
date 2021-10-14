// Core
import { NextFunction, Request, Response } from "express";
// Utils
import { NotFoundError } from "../utils";

export const handleNotFoundRoute = (req: Request, res: Response, next: NextFunction): void => {
  const error = new NotFoundError(
    `Can not find right route for method ${ req.method } and path ${ req.originalUrl }`
  );
  next(error);
};
