import { BaseModel, GetAllPayload, GetAllResult } from "../../core";
// Odm
import { BibleBook, BibleBookDoc, Odm } from "./odm";
// Constants
import { RAWS } from "../../constants";

const populate = [{ path: "locale", select: RAWS.SELECT }];

export class Model extends BaseModel<BibleBook, BibleBookDoc> {
  constructor() {
    super({ odm: Odm });
  }

  async getAll(payload?: GetAllPayload): Promise<GetAllResult<BibleBook>> {
    return await super.getAll(payload, { populate });
  }

  async updateById(_id: string, payload: Partial<BibleBook>): Promise<BibleBook> {
    return await super.updateById(_id, payload, { populate });
  }

  async getById(_id: string): Promise<BibleBook> {
    return await super.getById(_id, { populate });
  }
}
