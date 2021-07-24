import { Module } from "vuex";
import { State as AuthState } from "@/app/Auth";

export type Mutation<S, P = unknown> = (state: S, payload: P) => void;

export type RootState = AuthState;

export interface ModuleTree {
  [key: string]: Module<AuthState, RootState>;
}
