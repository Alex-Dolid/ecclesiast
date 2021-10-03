// Controllers
import { Controller } from "../controller";
// Common
import { getCRUDRoutes } from "../../../common";
// Helpers
import { clearFromSecrets } from "../../../helpers";
// Constants
import { COLLECTION_NAME } from "../constants";

export const {
  get,
  post,
  getById,
  updateById,
  removeById
} = getCRUDRoutes(Controller, COLLECTION_NAME, clearFromSecrets([ "password", "token" ]));
