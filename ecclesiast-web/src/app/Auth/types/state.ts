import { User } from "./common";

export type UserState = User | null;
export type State = {
  user: UserState;
};
