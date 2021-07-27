// Core
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex"
// Stores
import { authStore } from "@/app/Auth";
import { biblesStore } from "@/app/Bibles";
import { localesStore } from "@/app/Locales";
// Types
import { ModuleTree, RootState } from "@/types";

// define injection key
export const key: InjectionKey<Store<RootState>> = Symbol();

const modules: ModuleTree = {
  auth: authStore,
  bibles: biblesStore,
  locales: localesStore,
};

export default createStore<RootState>({
  modules: { ...modules }
})

export const useStore = () => baseUseStore(key);
