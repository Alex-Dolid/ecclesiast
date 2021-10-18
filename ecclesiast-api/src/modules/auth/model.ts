// Libs
import * as bcrypt from "bcryptjs";
import { omit } from "lodash";
// Odm
import { User, UsersModel } from "../users";
// Utils
import { NotFoundError, ServerError, PermissionError } from "../../utils";
// Helpers
import { createToken } from "../../helpers";
// Constants
import { RAWS } from "../../constants";

export type SignInPayload = Pick<User & { password: string }, "email" | "password">;

const populate = [{ path: "accessRole", select: RAWS.SELECT }];

export class Model extends UsersModel {
  async signIn({ email, password }: SignInPayload): Promise<User> {
    try {
      const user = await this.findOne({ email }, { populate });

      if (!user) {
        throw new NotFoundError("User with this email not found");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new PermissionError("Credentials not valid");
      }

      const token = await createToken(omit(user, [ "password", "token" ]));

      return await this.updateById(user._id, { token });
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async refresh(_id: string): Promise<User> {
    try {
      const user = await this.getById(_id);

      const token = await createToken(omit(user, [ "password", "token" ]));

      return await this.updateById(user._id, { token });
    } catch (error) {
      throw new ServerError(error.message);
    }
  }

  async signOut(_id: string): Promise<void> {
    try {
      await this.updateById(_id, { token: null });
    } catch (error) {
      throw new ServerError(error.message);
    }
  }
}
