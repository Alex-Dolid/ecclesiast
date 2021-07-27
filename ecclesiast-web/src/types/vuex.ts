import { ActionObject, CommitOptions, DispatchOptions, Module, Payload, Store } from "vuex";
import { State as AuthState } from "@/app/Auth";
import { State as BiblesState } from "@/app/Bibles";
import { State as LocalesState } from "@/app/Locales";

export type Mutation<S, P = unknown> = (state: S, payload: P) => void;

export type RootState = AuthState & BiblesState & LocalesState;

export interface ModuleTree {
  auth: Module<AuthState, RootState>;
  bibles: Module<BiblesState, RootState>;
  locales: Module<LocalesState, RootState>;
}

export interface Commit<P> {
  (type: keyof P, payload: P[keyof P] | null, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface Dispatch<P> {
  (type: keyof P, payload: P[keyof P] | null, options?: DispatchOptions): Promise<any>;
  <P extends Payload>(payloadWithType: P, options?: DispatchOptions): Promise<any>;
}

export interface ActionContext<S, ACP, ACD> {
  dispatch: Dispatch<ACD>;
  commit: Commit<ACP>;
  state: S;
  getters: any;
  rootState: RootState;
  rootGetters: any;
}

export type ActionHandler<S, P, ACP, ACD> = (this: Store<RootState>, injectee: ActionContext<S, ACP, ACD>, payload: P) => unknown;

export type Action<S, P = unknown, ACP = unknown, ACD = unknown> = ActionHandler<S, P, ACP, ACD> | ActionObject<S, RootState>;
