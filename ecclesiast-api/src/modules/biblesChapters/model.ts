// Common
import { BaseModel } from "../../core";
// Odm
import { BibleChapter, BibleChaptersDoc, Odm } from "./odm";

export class Model extends BaseModel<BibleChapter, BibleChaptersDoc> {
  constructor() {
    super({ odm: Odm });
  }
}
