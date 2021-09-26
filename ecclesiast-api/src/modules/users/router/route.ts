// Controllers
import { Controller } from "../controller";
// Common
import { getCRUDRoutes } from "../../../common";
// Constants
import { COLLECTION_NAME } from "../constants";

export const { get, post, getById, updateById, removeById } = getCRUDRoutes(Controller, COLLECTION_NAME);
