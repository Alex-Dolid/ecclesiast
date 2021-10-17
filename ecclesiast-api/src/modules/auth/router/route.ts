/// Core
import { NextFunction, Request, Response } from "express";
import dg from "debug";
// Controllers
import { Controller } from "../controller";
// Helpers
import { clearFromSecrets, sendResponse } from "../../../helpers";
// Constants
import { ROUTER } from "../../../constants";
import { COLLECTION_NAME } from "../constants";
// Types
import { Middleware } from "../../../types";
import { User } from "../../users";

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

const excludedProps = [ "password" ];

const constructRoute = (route: Routes, middlewares?: Middleware | Middleware[]): RouteFn => {
  const debug = dg(`${ ROUTER.LOG_TITLE }:${ COLLECTION_NAME }`);
  const getLog = (req: Request): string => `${ req.method } - ${ req.originalUrl }`;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    debug(getLog(req));

    try {
      const controller = new Controller();
      const data = route !== Routes.SIGN_OUT && route !== Routes.REFRESH
        ? await controller[route](req.body)
        : await controller[route](req.params?._id);

      sendResponse(res, data, { middlewares });
    } catch (error) {
      next(error);
    }
  };
};

export const { signIn, signOut, signUp, refresh } = Object.values(Routes)
  .reduce<RoutesFn>((acc, route) => ({
    ...acc,
    [route]: constructRoute(route, clearFromSecrets<User, typeof excludedProps>(excludedProps))
  }), {} as RoutesFn);

