// Core
import { BaseController } from "../../core";
// Models
import { Model } from "./model";
// Odm
import { BibleChapter, BibleChapterDoc } from "./odm";

export class Controller extends BaseController<BibleChapter, BibleChapterDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
