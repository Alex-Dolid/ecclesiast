import { Mutation } from "@/types";
import { State, BiblesState } from "./state";

export enum MutationsNames {
  setBibles = "setBibles",
}
export type Mutations = {
  [keyof in MutationsNames]: Mutation<State, BiblesState>
}
