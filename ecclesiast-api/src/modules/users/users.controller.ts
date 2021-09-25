// Core
import { BaseController } from "../../common";
// Models
import { UsersModel } from "./users.model";
// Odm
import { User, UserDoc } from "./users.odm";

export class UsersController extends BaseController<User, UserDoc, UsersModel> {
  constructor() {
    super({ model: new UsersModel() });
  }
}
