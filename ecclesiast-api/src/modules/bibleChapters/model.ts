// Common
import { BaseModel } from "../../core";
// Odm
import { BibleChapter, BibleChapterDoc, Odm } from "./odm";

export class Model extends BaseModel<BibleChapter, BibleChapterDoc> {
  constructor() {
    super({ odm: Odm });
  }
}
