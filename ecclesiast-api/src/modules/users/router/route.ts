// Core
import { NextFunction, Request, Response } from "express";
// Libs
import dg from "debug";
// Controllers
import { UsersController } from "../users.controller";
// Constants
import { ROUTER } from "../../../constants";
import { COLLECTION_NAME } from "../constants";

const debug = dg(`${ ROUTER.LOG_TITLE }:${ COLLECTION_NAME }`);

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  debug(`${ req.method } - ${ req.originalUrl }`);

  try {
    const controller = new UsersController();
    const data = await controller.getAll();

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  debug(`${ req.method } - ${ req.originalUrl }`);

  try {
    const payload = req.body;
    const controller = new UsersController();
    const data = await controller.create(payload);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
