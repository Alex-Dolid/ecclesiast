// Libs
import * as bcrypt from "bcryptjs";
// Common
import { BaseModel } from "../../core";
// Odm
import { UserDoc, User, Odm } from "./odm";
// Utils
import { ServerError } from "../../utils";
// Constants
import { RAWS } from "../../constants";

const populate = [{ path: "accessRole", select: RAWS.SELECT }];

export class Model extends BaseModel<User, UserDoc> {
  constructor() {
    super({ odm: Odm });
  }

  async create(payload: User): Promise<void> {
    await super.create(await this.transformCreateUser(payload));
  }

  async getAll(): Promise<User[]> {
    return await super.getAll({ populate });
  }

  async updateById(_id: string, payload: Partial<User>): Promise<User> {
    return await super.updateById(_id, payload, { populate });
  }

  async getById(_id: string): Promise<User> {
    return await super.getById(_id, { populate });
  }

  private async transformCreateUser({ password, ...otherUserData }: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(password, 11);

      return {
        password: hashedPassword,
        ...otherUserData
      };
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
