// Core
import * as mongoose from "mongoose";
import { Document, FilterQuery, Query } from "mongoose";
// Utils
import { NotFoundError, ServerError } from "../utils";
// Constants
import { RAWS, DOC_VERSION, TIMESTAMPS } from "../constants";

const IS_DEFAULT_KEY_FLAG = "isDefault";
const DEFAULT_SORT_SELECT: { [IS_DEFAULT_KEY_FLAG]: 1 } = { [IS_DEFAULT_KEY_FLAG]: 1 };

type DefaultSelectKeys = typeof DOC_VERSION
  | typeof TIMESTAMPS.CREATED_AT
  | typeof TIMESTAMPS.UPDATED_AT
  | typeof IS_DEFAULT_KEY_FLAG
  | string;
type MapOption = ({ [key in DefaultSelectKeys]: 0 | 1 }) | string;
type SimplePopulateOption = [string, (string | MapOption)? ];
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
export type GetAllPayload = Partial<{
  page: number,
  size: number,
}> | null;
export type GetAllResult<T> = { data: T[], pagination: { total: number, page: number, size: number } };
export interface IBaseModel<T> {
  create: (payload: T) => Promise<void>;
  getAll: (payload?: GetAllPayload, options?: Partial<Options>) => Promise<GetAllResult<T>>;
  getById: (_id: string, options?: Partial<Omit<Options, "sort">>) => Promise<T>;
  updateById: (_id: string, payload: Partial<T>, options?: Partial<Omit<Options, "sort">>) => Promise<T>;
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

  async getAll(payload?: GetAllPayload, {
    sort = DEFAULT_SORT_SELECT,
    select = DEFAULT_SORT_SELECT,
    populate
  }: Partial<Options> = { sort: { isDefault: 1 }, select: { isDefault: 1 } }): Promise<GetAllResult<T>> {
    try {
      const { page = 0, size = 0 } = payload ?? {};
      const total = await this.odm.countDocuments();
      const offset = (page - 1) * size;
      const pagination = { total, page, size };

      const result = this.odm
        .find()
        .sort(this.getRaw(sort, "sort"))
        .skip(offset)
        .limit(size)
        .select(this.getRaw(select, "select"));

      const data: T[] = populate ? await this.withPopulate<T[], Doc>(result, populate) : await result.lean();

      return {
        data,
        pagination
      };
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async findOne(conditions: FilterQuery<T>, {
    select = DEFAULT_SORT_SELECT,
    populate
  }: Partial<Omit<Options, "sort">> = { select: { isDefault: 1 } }): Promise<T> {
    try {
      const data = this.odm
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .findOne(conditions)
        .select(this.getRaw(select, "select"));

      const result = populate ? await this.withPopulate<T | null, Doc>(data, populate) : await data.lean();

      if (!result) {
        throw new NotFoundError(`can not find document with conditions: ${ JSON.stringify(conditions) }`);
      }

      return result as T;
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async getById(_id: string, options?: Partial<Omit<Options, "sort">>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return await this.findOne({ _id }, options);
  }

  async updateById(_id: string, payload: Partial<T>, {
    select = DEFAULT_SORT_SELECT,
    populate
  }: Partial<Omit<Options, "sort">> = { select: { isDefault: 1 } }): Promise<T> {
    try {
      const data = this.odm
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .findOneAndUpdate({ _id }, payload, {
          new: true
        })
        .select(this.getRaw(select, "select"));

      const result = populate ? await this.withPopulate<T, Doc>(data, populate) : await data.lean();

      if (!result) {
        throw new NotFoundError(`can not find document with id ${ _id }`);
      }

      return result as T;
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

  protected getRaw(option: MapOption, recipient: "sort" | "select"): MapOption {
    if (typeof option === "string" || !option.isDefault) {
      return option;
    }

    return recipient === "sort" ? RAWS.SORT : RAWS.SELECT;
  }

  protected handlePopulateObj(populateObj: CompositePopulateOption): CompositePopulateOption {
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

  protected handlePopulateArray(populateArray: PopulateOptionAsArrayOption): PopulateOptionAsArrayOption {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return populateArray.map((item, i) => {
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
  protected async withPopulate
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
