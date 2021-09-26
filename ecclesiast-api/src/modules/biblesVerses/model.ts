// Odm
import { Odm, BibleVerseType } from "./odm";
// Utils
import { NotFoundError, ServerError } from "../../utils";

export type BiblesVersesQueryParamsForGetByQueryFuncType = {
  bibleId: string,
  text: string
};

export interface IBiblesVersesModel {
  create: (payload: BibleVerseType) => Promise<BibleVerseType>;
  getAll: () => Promise<BibleVerseType[]>;
  getById: (_id: string) => Promise<BibleVerseType>;
  updateById: (_id: string, payload: Partial<BibleVerseType>) => Promise<BibleVerseType>;
  removeById: (_id: string) => Promise<BibleVerseType>;
  getByQuery: (queryParams: BiblesVersesQueryParamsForGetByQueryFuncType) => Promise<BibleVerseType[]>;
}

export class Model implements IBiblesVersesModel {
  async create(payload: BibleVerseType): Promise<BibleVerseType> {
    try {
      return await Odm.create(payload);
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getAll(): Promise<BibleVerseType[]> {
    try {
      return await Odm
        .find()
        .sort("-created")
        .select("-__v -created -modified")
        .populate("locale", "-created -modified -__v")
        .populate("chapter", "-created -modified -__v")
        .populate({
          path: "book",
          select: "-created -modified -__v",
          populate: {
            path: "locale",
            select: "-created -modified -__v"
          }
        })
        .lean();
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getById(_id: string): Promise<BibleVerseType> {
    try {
      const data = await Odm
        .findOne({ _id })
        .select("-__v")
        .populate("locale", "-created -modified -__v")
        .populate("chapter", "-created -modified -__v")
        .populate({
          path: "book",
          select: "-created -modified -__v",
          populate: {
            path: "locale",
            select: "-created -modified -__v"
          }
        })
        .lean();

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async updateById(_id: string, payload: Partial<BibleVerseType>): Promise<BibleVerseType> {
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

  async removeById(_id: string): Promise<BibleVerseType> {
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

  async getByQuery(queryParams: BiblesVersesQueryParamsForGetByQueryFuncType): Promise<BibleVerseType[]> {
    try {
      const textRegExp = new RegExp(queryParams.text, "ig");
      const data = await Odm
        .find({ ...queryParams, text: textRegExp })
        .select("-__v -created -modified")
        .populate("locale", "-created -modified -__v")
        .populate("chapter", "-created -modified -__v")
        .populate({
          path: "book",
          select: "-created -modified -__v",
          populate: {
            path: "locale",
            select: "-created -modified -__v"
          }
        })
        .lean();

      if (!data) {
        throw new NotFoundError(`can not find document with that query params ${ queryParams }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
