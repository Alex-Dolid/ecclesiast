// Libs
import * as bcrypt from "bcryptjs";
// Common
import { BaseModel } from "../../common";
// Odm
import { UserDoc, User, Odm } from "./odm";
// Utils
import { ServerError } from "../../utils";

export class Model extends BaseModel<User, UserDoc> {
  constructor() {
    super({ odm: Odm });
  }

  async create(payload: User): Promise<void> {
    await super.create(await this.transformCreateUser(payload));
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
