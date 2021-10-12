// Common
import { BaseModel } from "../../core";
// Odm
import { LocaleDoc, Locale, Odm } from "./odm";

export class Model extends BaseModel<Locale, LocaleDoc> {
  constructor() {
    super({ odm: Odm });
  }
}
