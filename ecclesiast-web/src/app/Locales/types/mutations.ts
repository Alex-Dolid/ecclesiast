import { Mutation } from "@/types";
import { State, LocalesState } from "./state";

export enum MutationsNames {
  setLocales = "setLocales",
}
export type Mutations = {
  [keyof in MutationsNames]: Mutation<State, LocalesState>
}
