// Libs
import * as bcrypt from "bcryptjs";
// Odm
import { User, UsersModel } from "../users";
// Utils
import { NotFoundError, ServerError, ValidationError } from "../../utils";
// Helpers
import { createToken } from "../../helpers";

export type SignInPayload = Pick<User & { password: string }, "email" | "password">;

export class Model extends UsersModel {
  async signIn({ email, password }: SignInPayload): Promise<User> {
    try {
      const token = await createToken();

      const user = await this.findOne({ email });

      if (!user) {
        throw new NotFoundError("No user found in users data");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new ValidationError("Credentials not valid");
      }

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