// Core
import { BaseController } from "../../core";
// Models
import { Model } from "./model";
// Odm
import { Locale, LocaleDoc } from "./odm";

export class Controller extends BaseController<Locale, LocaleDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
