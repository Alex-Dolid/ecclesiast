// Core
import { BaseController } from "../../core";
// Models
import { Model } from "./model";
// Odm
import { BibleVerse, BibleVerseDoc } from "./odm";

export class Controller extends BaseController<BibleVerse, BibleVerseDoc, Model> {
  constructor() {
    super({ model: new Model() });
  }
}
