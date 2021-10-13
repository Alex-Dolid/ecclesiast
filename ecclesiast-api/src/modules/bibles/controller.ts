// Core
import { BaseController } from "../../core";
// Models
import { Model } from "./model";
// Odm
import { Bible, BibleDoc } from "./odm";

export class Controller extends BaseController<Bible, BibleDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
