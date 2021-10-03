/// Core
import { NextFunction, Request, Response } from "express";
import dg from "debug";
// Controllers
import { Controller } from "../controller";
// Helpers
import {clearFromSecrets, sendResponse} from "../../../helpers";
// Constants
import { ROUTER } from "../../../constants";
// Types
import { Middleware } from "../../../types";

enum Routes {
  SIGN_IN = "signIn",
  SIGN_OUT = "signOut",
  REFRESH = "refresh",
  SIGN_UP = "signUp"
}

type RouteFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type RoutesFn = {
  [key in Routes]: RouteFn
}

const constructRoute = (route: Routes, middlewares?: Middleware | Middleware[]): RouteFn => {
  const debug = dg(`${ ROUTER.LOG_TITLE }:auth`);
  const getLog = (req: Request): string => `${ req.method } - ${ req.originalUrl }`;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    debug(getLog(req));

    try {
      const controller = new Controller();
      const data = await controller[route](req.body);

      sendResponse(res, data, { middlewares });
    } catch (error) {
      next(error);
    }
  };
};

export const { signIn, signOut, signUp, refresh } = Object.values(Routes)
  .reduce<RoutesFn>((acc, route) => ({ ...acc, [route]: constructRoute(route, clearFromSecrets([ "password" ])) }), {} as RoutesFn);

