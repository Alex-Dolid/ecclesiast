// Core
import { BaseController } from "../../core";
// Models
import { Model } from "./model";
// Odm
import { BibleChapter, BibleChaptersDoc } from "./odm";

export class Controller extends BaseController<BibleChapter, BibleChaptersDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
