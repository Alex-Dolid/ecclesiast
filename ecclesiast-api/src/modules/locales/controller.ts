// Models
import { Model, ILocalesModel } from "./model";
// Odm
import { LocaleDocType, LocaleType } from "./odm";

type LocalesControllerModelsType = {
  locales: ILocalesModel
}

export class Controller implements ILocalesModel {
  private readonly models: LocalesControllerModelsType;

  constructor() {
    this.models = {
      locales: new Model()
    };
  }

  async create(payload: LocaleType): Promise<LocaleType> {
    return await this.models.locales.create(payload);
  }

  async getAll(): Promise<LocaleType[]> {
    return await this.models.locales.getAll();
  }

  async getById(_id: string): Promise<LocaleType> {
    return await this.models.locales.getById(_id);
  }

  async updateById(_id: string, payload: Partial<LocaleType>): Promise<LocaleDocType> {
    return await this.models.locales.updateById(_id, payload);
  }

  async removeById(_id: string): Promise<LocaleDocType> {
    return await this.models.locales.removeById(_id);
  }
}
