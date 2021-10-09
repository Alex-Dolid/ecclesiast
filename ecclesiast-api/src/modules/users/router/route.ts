// Controllers
import { Controller } from "../controller";
// Common
import { getCRUDRoutes } from "../../../core";
// Helpers
import { clearFromSecrets } from "../../../helpers";
// Constants
import { COLLECTION_NAME } from "../constants";
// Types
import { User } from "../odm";

const excludedProps = [ "password", "token" ];

export const {
  get,
  post,
  getById,
  updateById,
  removeById
} = getCRUDRoutes(Controller, COLLECTION_NAME, clearFromSecrets<User, typeof excludedProps>(excludedProps));
