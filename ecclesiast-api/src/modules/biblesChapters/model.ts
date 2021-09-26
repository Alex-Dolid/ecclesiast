// Odm
import { Odm, BibleChapterType } from "./odm";
// Utils
import { NotFoundError, ServerError } from "../../utils";

export interface IBiblesChaptersModel {
  create: (payload: BibleChapterType) => Promise<BibleChapterType>;
  getAll: () => Promise<BibleChapterType[]>;
  getById: (_id: string) => Promise<BibleChapterType>;
  updateById: (_id: string, payload: Partial<BibleChapterType>) => Promise<BibleChapterType>;
  removeById: (_id: string) => Promise<BibleChapterType>;
}

export class Model implements IBiblesChaptersModel {
  async create(payload: BibleChapterType): Promise<BibleChapterType> {
    try {
      return await Odm.create(payload);
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getAll(): Promise<BibleChapterType[]> {
    try {
      return await Odm
        .find()
        .sort("-created")
        .select("-__v -created -modified")
        .populate("locale", "-created -modified -__v")
        .lean();
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getById(_id: string): Promise<BibleChapterType> {
    try {
      const data = await Odm
        .findOne({ _id })
        .select("-__v")
        .lean();

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async updateById(_id: string, payload: Partial<BibleChapterType>): Promise<BibleChapterType> {
    try {
      const data = await Odm.findOneAndUpdate({ _id }, payload, {
        new: true
      });

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async removeById(_id: string): Promise<BibleChapterType> {
    try {
      const data = await Odm.findOneAndDelete({ _id });

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
