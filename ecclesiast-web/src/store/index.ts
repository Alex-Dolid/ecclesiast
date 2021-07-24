// Core
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex"
// Stores
import { authStore } from "@/app/Auth";
// Types
import { ModuleTree, RootState } from "@/types";

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

const modules: ModuleTree = {
  auth: authStore,
};

export default createStore<RootState>({
  modules: { ...modules }
})
