// Types
import { Document } from "mongoose";
import BaseModel from "./BaseModel";

interface IBaseController<T> {
  create: (payload: T) => Promise<void>;
  getAll: () => Promise<T[]>;
  getById: (_id: string) => Promise<T>;
  updateById: (_id: string, payload: Partial<T>) => Promise<T>;
  removeById: (_id: string) => Promise<void>;
}

export default class BaseController<T, Doc extends Document & T, M extends BaseModel<T, Doc>> implements IBaseController<T> {
  protected readonly model: M;

  constructor(params: { model: M }) {
    this.model = params.model;
  }

  async create(payload: T): Promise<void> {
    return await this.model.create(payload);
  }

  async getAll(): Promise<T[]> {
    return await this.model.getAll();
  }

  async getById(_id: string): Promise<T> {
    return await this.model.getById(_id);
  }

  async updateById(_id: string, payload: Partial<T>): Promise<T> {
    return await this.model.updateById(_id, payload);
  }

  async removeById(_id: string): Promise<void> {
    return await this.model.removeById(_id);
  }
}
