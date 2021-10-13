// Core
import { BaseModel, GetAllPayload, GetAllResult } from "../../core";
// Odm
import { BibleVerse, BibleVerseDoc, Odm } from "./odm";
// Constants
import { RAWS } from "../../constants";

const populate = [
  { path: "locale", select: RAWS.SELECT },
  { path: "chapter", select: RAWS.SELECT },
  {
    path: "book",
    select: RAWS.SELECT,
    populate: {
      path: "locale",
      select: RAWS.SELECT
    }
  }
];

export class Model extends BaseModel<BibleVerse, BibleVerseDoc> {
  constructor() {
    super({ odm: Odm });
  }

  async getAll(payload?: GetAllPayload): Promise<GetAllResult<BibleVerse>> {
    return await super.getAll(payload, { populate });
  }

  async updateById(_id: string, payload: Partial<BibleVerse>): Promise<BibleVerse> {
    return await super.updateById(_id, payload, { populate });
  }

  async getById(_id: string): Promise<BibleVerse> {
    return await super.getById(_id, { populate });
  }
}
