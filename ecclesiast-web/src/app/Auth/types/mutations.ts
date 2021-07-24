import { Mutation } from "@/types";
import { State, UserState } from "./state";

export type Mutations = {
  setUser: Mutation<State, UserState>
}
