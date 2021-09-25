// Core
import * as mongoose from "mongoose";
import { Document } from "mongoose";
// Utils
import { NotFoundError, ServerError } from "../utils";

export interface IBaseModel<T> {
  create: (payload: T) => Promise<T>;
  getAll: () => Promise<T[]>;
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

  async getAll(): Promise<T[]> {
    try {
      return await this.odm.find().sort("-created");
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
