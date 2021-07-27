import { Module as _Module } from "vuex";
import { State } from "./state";
import { RootState } from "@/types";

type Module = _Module<State, RootState>;

export { State, Module };
export { Mutations, MutationsNames } from "./mutations";
export { Actions, ActionsNames } from "./actions";
