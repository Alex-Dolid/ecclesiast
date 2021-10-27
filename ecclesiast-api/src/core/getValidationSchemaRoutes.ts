// Core
import { NextFunction, Request, Response } from "express";
// Libs
import dg from "debug";
// Helpers
import { sendResponse } from "../helpers";
// Constants
import { ROUTER } from "../constants";

const constructRoute = (collectionName: string, routeName: string, schema: any) => {
  const debug = dg(`${ ROUTER.LOG_TITLE }:${ collectionName }:${ routeName }`);
  const getLog = (req: Request): string => `${ req.method } - ${ req.originalUrl }`;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    debug(getLog(req));

    try {
      await sendResponse(res, schema);
    } catch (error) {
      next(error);
    }
  };
};

type RouteFn = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type RoutesFn<T extends string> = {
  [key in T]: RouteFn
}
type Props = {
  collectionName: string,
  routesSchemasMap: Record<string, unknown>,
};
const getValidationSchemaRoutes = <T extends string>({ collectionName, routesSchemasMap }: Props): RoutesFn<T> => {
  return Object.entries(routesSchemasMap).reduce((acc, [ routeName, schema ]) => ({
    ...acc,
    [routeName]: constructRoute(collectionName, routeName, schema)
  }), {} as RoutesFn<T>);
};

export default getValidationSchemaRoutes;

