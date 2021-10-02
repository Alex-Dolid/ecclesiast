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
  create: (payload: T) => Promise<void>;
  getAll: (options?: Partial<Options>) => Promise<T[]>;
  getById: (_id: string, options?: Partial<Omit<Options, "sort">>) => Promise<T>;
  updateById: (_id: string, payload: Partial<T>) => Promise<T>;
  removeById: (_id: string) => Promise<void>;
}

export default class BaseModel<T, Doc extends Document & { _id?: string } & T> implements IBaseModel<T> {
  protected readonly odm: mongoose.Model<Doc>;

  constructor(params: { odm: mongoose.Model<Doc> }) {
    const { odm } = params;

    this.odm = odm;
  }

  async create(payload: T): Promise<void> {
    try {
      await this.odm.create(payload);
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getAll({
    sort = {},
    select = {},
    populate
  }: Partial<Options> = { sort: { isDefault: 1 }, select: { isDefault: 1 } }): Promise<T[]> {
    try {
      const result = this.odm
        .find()
        .sort(this.getRaw(sort, "sort"))
        .select(this.getRaw(select, "select"));

      return populate ? await this.withPopulate<T[], Doc>(result, populate) : await result.lean();
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getById(_id: string, {
    select = {},
    populate
  }: Partial<Omit<Options, "sort">> = { select: { isDefault: 1 } }): Promise<T> {
    try {
      const data = this.odm
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .findOne({ _id })
        .select(this.getRaw(select, "select"));

      const result = populate ? await this.withPopulate<T | null, Doc>(data, populate) : await data.lean();

      if (!result) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return result as T;
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

  async removeById(_id: string): Promise<void> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const data = await this.odm.findOneAndDelete({ _id });

      if (!data) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  private getRaw(option: MapOption, recipient: "sort" | "select"): MapOption {
    const defaultSortRaw = "-created";
    const defaultSelectRaw = "-__v -created -modified";

    if (typeof option === "string" || !option.isDefault) {
      return option;
    }

    return recipient === "sort" ? defaultSortRaw : defaultSelectRaw;
  }

  private handlePopulateObj(populateObj: CompositePopulateOption): CompositePopulateOption {
    return {
      ...populateObj,
      sort: populateObj.sort ? this.getRaw(populateObj.sort, "sort") : null,
      select: populateObj.select ? this.getRaw(populateObj.select, "select") : null,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-nested-ternary
      populate: populateObj.populate
        ? !Array.isArray(populateObj.populate)
          ? this.handlePopulateObj(populateObj.populate)
          // eslint-disable-next-line no-use-before-define
          : this.handlePopulateArray(populateObj.populate)
        : null
    };
  }

  private handlePopulateArray(populateArray: PopulateOptionAsArrayOption): PopulateOptionAsArrayOption {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return populateArray.map((item) => {
      if (!item || typeof item === "string") {
        return item;
      }

      if (Array.isArray(item)) {
        return this.handlePopulateArray(item);
      }

      if (!Array.isArray(item) && item.path) {
        return this.handlePopulateObj(item as CompositePopulateOption);
      }

      return this.getRaw(item as MapOption, "select");
    });
  }

  // eslint-disable-next-line require-await
  private async withPopulate
  <PT extends T | T[] | null, PDoc extends Doc>(
    odm: Query<PT, PDoc>,
    populateOption: PopulateOption
  ): Promise<Query<PT, PDoc>> {
    return odm.populate(
      !Array.isArray(populateOption)
        ? this.handlePopulateObj(populateOption)
        : this.handlePopulateArray(populateOption)
    ).lean();
  }
}
