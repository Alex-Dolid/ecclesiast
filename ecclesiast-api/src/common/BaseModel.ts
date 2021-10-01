// Core
import * as mongoose from "mongoose";
import { Document, Query } from "mongoose";
// Utils
import { NotFoundError, ServerError } from "../utils";

type DefaultSelectKeys = "__v" | "created" | "modified" | "isDefault" | string;
type MapOption = ({ [key in DefaultSelectKeys]: 0 | 1 }) | string;
type SimplePopulateOption = [string, string | MapOption | undefined];
type CompositePopulateOption = {
  path: string,
  sort?: MapOption | null,
  select?: MapOption | null,
  populate?: CompositePopulateOption | CompositePopulateOption[] | null,
};
type PopulateOptionAsArrayOption = SimplePopulateOption
  | SimplePopulateOption[]
  | CompositePopulateOption[];
type PopulateOption = PopulateOptionAsArrayOption | CompositePopulateOption;
type Options = {
  sort: MapOption,
  select: MapOption,
  populate: PopulateOption,
};
export interface IBaseModel<T> {
  create: (payload: T) => Promise<T>;
  getAll: (options?: Partial<Options>) => Promise<T[]>;
  getById: (_id: string) => Promise<T>;
  updateById: (_id: string, payload: Partial<T>) => Promise<T>;
  removeById: (_id: string) => Promise<T>;
}

export default class BaseModel<T, Doc extends Document & { _id?: string } & T> implements IBaseModel<T> {
  protected readonly odm: mongoose.Model<Doc>;

  constructor(params: { odm: mongoose.Model<Doc> }) {
    const { odm } = params;

    this.odm = odm;
  }

  async create(payload: T): Promise<T> {
    try {
      return await this.odm.create(payload);
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getAll({ sort = {}, select = {}, populate }: Partial<Options> = { sort: { isDefault: 1 }, select: { isDefault: 1 } }): Promise<T[]> {
    try {
      const defaultSortRaw = "-created";
      const defaultSelectRaw = "-__v -created -modified";
      // eslint-disable-next-line no-confusing-arrow,no-nested-ternary
      const getSortRaw = (sortObj: MapOption): MapOption => typeof sortObj === "string"
        ? sortObj : sortObj.isDefault
          ? defaultSortRaw : { ...sortObj };
      // eslint-disable-next-line no-confusing-arrow,no-nested-ternary
      const getSelectRaw = (sortObj: MapOption): MapOption => typeof sortObj === "string"
        ? sortObj : sortObj.isDefault
          ? defaultSelectRaw : { ...sortObj };
      const handlers = {
        handlePopulateObj: (populateObj: CompositePopulateOption): CompositePopulateOption => ({
          ...populateObj,
          sort: populateObj.sort ? getSortRaw(populateObj.sort) : null,
          select: populateObj.select ? getSelectRaw(populateObj.select) : null,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-nested-ternary
          populate: populateObj.populate
            ? !Array.isArray(populateObj.populate)
              ? handlers.handlePopulateObj(populateObj.populate)
              // eslint-disable-next-line no-use-before-define
              : handlers.handlePopulateArray(populateObj.populate)
            : null
        }),
        handlePopulateArray: (populateArray: PopulateOptionAsArrayOption): PopulateOptionAsArrayOption => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return populateArray.map((item) => {
            if (!item || typeof item === "string") {
              return item;
            }

            if (Array.isArray(item)) {
              return handlers.handlePopulateArray(item);
            }

            if (!Array.isArray(item) && item.path) {
              return handlers.handlePopulateObj(item as CompositePopulateOption);
            }

            return getSelectRaw(item as MapOption);
          });
        }
      };
      // eslint-disable-next-line require-await
      const withPopulate = async (odm: Query<Doc[], Doc>, populateOption: PopulateOption): Query<Doc[], Doc> => {
        return odm.populate(
          !Array.isArray(populateOption)
            ? handlers.handlePopulateObj(populateOption)
            : handlers.handlePopulateArray(populateOption)
        ).lean();
      };
      const result = this.odm
        .find()
        .sort(getSortRaw(sort))
        .select(getSelectRaw(select));

      return populate ? await withPopulate(result, populate) : await result.lean();
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getById(_id: string): Promise<T> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await this.odm.findOne({ _id }).select("-__v");

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async updateById(_id: string, payload: Partial<T>): Promise<T> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await this.odm.findOneAndUpdate({ _id }, payload, {
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

  async removeById(_id: string): Promise<T> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await this.odm.findOneAndDelete({ _id });

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return data;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
