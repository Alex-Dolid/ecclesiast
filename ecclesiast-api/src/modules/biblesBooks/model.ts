// Odm
import { Odm, BibleBookType } from "./odm";
// Utils
import { NotFoundError, ServerError } from "../../utils";

export interface IBiblesBooksModel {
  create: (payload: BibleBookType) => Promise<BibleBookType>;
  getAll: () => Promise<BibleBookType[]>;
  getById: (_id: string) => Promise<BibleBookType>;
  updateById: (_id: string, payload: Partial<BibleBookType>) => Promise<BibleBookType>;
  removeById: (_id: string) => Promise<BibleBookType>;
}

export class Model implements IBiblesBooksModel {
  async create(payload: BibleBookType): Promise<BibleBookType> {
    try {
      return await Odm.create(payload);
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getAll(): Promise<BibleBookType[]> {
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

  async getById(_id: string): Promise<BibleBookType> {
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

  async updateById(_id: string, payload: Partial<BibleBookType>): Promise<BibleBookType> {
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

  async removeById(_id: string): Promise<BibleBookType> {
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
