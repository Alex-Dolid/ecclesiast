// Core
import { Response } from "express";
// Types
import { Middleware } from "../types";
// Constants
import { DEFAULT_STATUS, Statuses } from "../constants";

type Options = {
  middlewares?: Middleware | Middleware[],
  statusCode?: Statuses
}

export const sendResponse = (res: Response, data: unknown, options: Options = {}): void => {
  const { middlewares, statusCode = DEFAULT_STATUS } = options;

  const send = (_data: unknown): void => {
    res.status(statusCode).json(_data);
  };

  if (!middlewares) {
    return send(data);
  }

  const newData = !Array.isArray(middlewares)
    ? middlewares(data)
    : middlewares.reduce((acc, current) => current(!acc.length ? data : acc), []);

  send(newData);
};
