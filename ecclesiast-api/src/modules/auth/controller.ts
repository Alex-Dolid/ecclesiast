// Models
import { Model, SignInPayload } from "./model";
import { User, UsersController } from "../users";

export class Controller extends UsersController {
  protected readonly authModel: Model;

  constructor() {
    super();

    this.authModel = new Model();
  }

  async signIn(payload: SignInPayload): Promise<User> {
    return await this.authModel.signIn(payload);
  }

  async signOut(_id: string): Promise<void> {
    return await this.authModel.signOut(_id);
  }

  async refresh(_id: string): Promise<User> {
    return await this.authModel.refresh(_id);
  }

  async signUp(payload: User): Promise<void> {
    return await this.authModel.create(payload);
  }
}
