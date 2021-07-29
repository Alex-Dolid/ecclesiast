import { Module as _Module } from "vuex";
import { State } from "./state";
import { RootState } from "@/types";

export type Module = _Module<State, RootState>;

export { State };
export { Mutations, MutationsNames } from "./mutations";
export { Actions, ActionsNames } from "./actions";
