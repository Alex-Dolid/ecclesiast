// Controllers
import { Model, IBiblesChaptersModel } from "./model";
// Types
import { BibleChapterType } from "./odm";

interface IBiblesChaptersController {
  create: (payload: BibleChapterType) => Promise<BibleChapterType>;
  getAll: () => Promise<BibleChapterType[]>;
  getById: (_id: string) => Promise<BibleChapterType>;
  updateById: (_id: string, payload: Partial<BibleChapterType>) => Promise<BibleChapterType>;
  removeById: (_id: string) => Promise<BibleChapterType>;
}

type BiblesChaptersControllerModelsType = {
  chapters: IBiblesChaptersModel
}

export class Controller implements IBiblesChaptersController {
  private readonly models: BiblesChaptersControllerModelsType;

  constructor() {
    this.models = {
      chapters: new Model()
    };
  }

  async create(payload: BibleChapterType): Promise<BibleChapterType> {
    return await this.models.chapters.create(payload);
  }

  async getAll(): Promise<BibleChapterType[]> {
    return await this.models.chapters.getAll();
  }

  async getById(_id: string): Promise<BibleChapterType> {
    return await this.models.chapters.getById(_id);
  }

  async updateById(_id: string, payload: Partial<BibleChapterType>): Promise<BibleChapterType> {
    return await this.models.chapters.updateById(_id, payload);
  }

  async removeById(_id: string): Promise<BibleChapterType> {
    return await this.models.chapters.removeById(_id);
  }
}
