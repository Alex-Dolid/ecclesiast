// Controllers
import { UsersController } from "../users.controller";
// Common
import { getCRUDRoutes } from "../../../common";
// Constants
import { COLLECTION_NAME } from "../constants";

export const { get, post, getById, updateById, removeById } = getCRUDRoutes(UsersController, COLLECTION_NAME);
