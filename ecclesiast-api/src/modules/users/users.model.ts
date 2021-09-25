// Core
import { BaseModel } from "../../common";
// Odm
import { UserDoc, User, UsersOdm } from "./users.odm";

export class UsersModel extends BaseModel<User, UserDoc> {
  constructor() {
    super({ odm: UsersOdm });
  }
}
