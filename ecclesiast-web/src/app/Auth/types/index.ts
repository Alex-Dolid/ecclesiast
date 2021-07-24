import { Module as _Module } from "vuex";
import { State } from "./state";
import { RootState } from "@/types";

type Module = _Module<State, RootState>;

export { Mutations } from "./mutations";
export { State, Module };
