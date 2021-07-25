import { Mutation } from "@/types";
import { State, UserState } from "./state";

export enum MutationsNames {
  setUser = "setUser",
}
export type Mutations = {
  [keyof in MutationsNames]: Mutation<State, UserState>
}
