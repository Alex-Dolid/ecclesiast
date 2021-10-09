// Common
import { BaseModel } from "../../core";
// Odm
import { AccessRoleDoc, AccessRole, AccessRolesOdm } from "./odm";

export class AccessRolesModel extends BaseModel<AccessRole, AccessRoleDoc> {
  constructor() {
    super({ odm: AccessRolesOdm });
  }
}
