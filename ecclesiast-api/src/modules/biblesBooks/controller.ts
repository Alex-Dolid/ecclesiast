// Core
import { BaseController } from "../../core";
// Models
import { Model } from "./model";
// Odm
import { BibleBook, BibleBookDoc } from "./odm";

export class Controller extends BaseController<BibleBook, BibleBookDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
