import { Action } from "@/types";
import { State } from "./state";
import { User, UserAuth } from "./common";
import { MutationsNames } from "./mutations";

type ACP = {
  [MutationsNames.setUser]: User;
};
export type Actions = {
  authAsync: Action<State, UserAuth, ACP>;
  clear: Action<State, UserAuth, ACP>;
};
