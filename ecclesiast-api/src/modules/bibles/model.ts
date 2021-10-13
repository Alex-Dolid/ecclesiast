// Core
import { BaseModel, GetAllPayload, GetAllResult } from "../../core";
// Odm
import { Bible, BibleDoc, Odm } from "./odm";
// Constants
import { RAWS } from "../../constants";

const populate = [
  { path: "locale", select: RAWS.SELECT },
  {
    path: "verses",
    select: RAWS.SELECT,
    populate: {
      path: "locale chapter book",
      select: RAWS.SELECT
    }
  }
];

export class Model extends BaseModel<Bible, BibleDoc> {
  constructor() {
    super({ odm: Odm });
  }

  async getAll(payload?: GetAllPayload): Promise<GetAllResult<Bible>> {
    return await super.getAll(payload, { populate });
  }

  async updateById(_id: string, payload: Partial<Bible>): Promise<Bible> {
    return await super.updateById(_id, payload, { populate });
  }

  async getById(_id: string): Promise<Bible> {
    return await super.getById(_id, { populate });
  }
}
