// Core
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex"
// Stores
import { authStore } from "../app/Auth";

// define your typings for the store state
export interface State {}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<State>({
  modules: {
    auth: authStore
  }
})
