// Core
import { NextFunction, Request, Response } from "express";

export type Middleware = (data: any) => any;
export type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void
