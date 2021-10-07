// Core
import { NextFunction, Request, Response } from "express";
// Constants
import { ROLES } from "../modules/accessRoles";
// Types
import { ExpressMiddleware } from "../types";

export const authorize = (roles?: ROLES[]): ExpressMiddleware => (req: Request, res: Response, next: NextFunction): void => {
  next();
};
