// Core
import { BaseController } from "../../core";
// Models
import { AccessRolesModel } from "./model";
// Odm
import { AccessRole, AccessRoleDoc } from "./odm";

export class AccessRolesController extends BaseController<AccessRole, AccessRoleDoc, AccessRolesModel> {
  constructor() {
    super({ model: new AccessRolesModel() });
  }
}
