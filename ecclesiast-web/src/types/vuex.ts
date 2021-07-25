import { ActionObject, CommitOptions, Dispatch, Module, Payload, Store } from "vuex";
import { State as AuthState } from "@/app/Auth";

export type Mutation<S, P = unknown> = (state: S, payload: P) => void;

export type RootState = AuthState;

export interface ModuleTree {
  [key: string]: Module<AuthState, RootState>;
}

export interface Commit<P> {
  (type: keyof P, payload: P[keyof P] | null, options?: CommitOptions): void;
  <P extends Payload>(payloadWithType: P, options?: CommitOptions): void;
}

export interface ActionContext<S, ACP> {
  dispatch: Dispatch;
  commit: Commit<ACP>;
  state: S;
  getters: any;
  rootState: RootState;
  rootGetters: any;
}

export type ActionHandler<S, P, ACP> = (this: Store<RootState>, injectee: ActionContext<S, ACP>, payload: P) => unknown;

export type Action<S, P = unknown, ACP = unknown> = ActionHandler<S, P, ACP> | ActionObject<S, RootState>;
