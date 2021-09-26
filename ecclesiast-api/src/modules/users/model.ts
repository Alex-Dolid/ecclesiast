// Core
import { BaseModel } from "../../common";
// Odm
import { UserDoc, User, Odm } from "./odm";

export class Model extends BaseModel<User, UserDoc> {
  constructor() {
    super({ odm: Odm });
  }
}
