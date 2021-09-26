// Core
import { BaseController } from "../../common";
// Models
import { Model } from "./model";
// Odm
import { User, UserDoc } from "./odm";

export class Controller extends BaseController<User, UserDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
