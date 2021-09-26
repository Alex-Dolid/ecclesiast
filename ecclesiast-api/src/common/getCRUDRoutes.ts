// Core
import { NextFunction, Request, Response } from "express";
import dg from "debug";
// Constants
import { ROUTER } from "../constants";

type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
type CRUDRoutes = {
  get: RouteHandler;
  post: RouteHandler;
  getById: RouteHandler;
  updateById: RouteHandler;
  removeById: RouteHandler;
}

const getCRUDRoutes = (Controller: new () => any, collectionName: string): CRUDRoutes => {
  const debug = dg(`${ ROUTER.LOG_TITLE }:${ collectionName }`);
  const getLog = (req: Request): string => `${ req.method } - ${ req.originalUrl }`;
  const send = (res: Response, data: unknown) => res.status(200).json(data);

  return {
    get: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      debug(getLog(req));

      try {
        const controller = new Controller();
        const data = await controller.getAll();

        send(res, data);
      } catch (error) {
        next(error);
      }
    },

    post: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      debug(getLog(req));

      try {
        const payload = req.body;
        const controller = new Controller();
        const data = await controller.create(payload);

        send(res, data);
      } catch (error) {
        next(error);
      }
    },

    getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      debug(getLog(req));

      try {
        const { _id } = req.params;
        const controller = new Controller();
        const data = await controller.getById(_id);

        send(res, data);
      } catch (error) {
        next(error);
      }
    },

    updateById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      debug(getLog(req));

      try {
        const { _id } = req.params;
        const payload = req.body;
        const controller = new Controller();
        const data = await controller.updateById(_id, payload);

        send(res, data);
      } catch (error) {
        next(error);
      }
    },

    removeById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      debug(getLog(req));

      try {
        const { _id } = req.params;
        const controller = new Controller();
        const data = await controller.removeById(_id);

        send(res, data);
      } catch (error) {
        next(error);
      }
    }
  };
};

export default getCRUDRoutes;
