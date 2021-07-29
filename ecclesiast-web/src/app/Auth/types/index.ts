import { Module as _Module } from "vuex";
import { State } from "./state";
import { RootState } from "@/types";

export type Module = _Module<State, RootState>;

export { Mutations, MutationsNames } from "./mutations";
export { Actions } from "./actions";
export { UserAuth, User } from "./common";
export { State };
