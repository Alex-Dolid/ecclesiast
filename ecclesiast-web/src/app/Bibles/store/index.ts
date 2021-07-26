// Store
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
// Types
import { Module } from "../types";

const module: Module = {
  namespaced: true,
  state: { ...state },
  mutations: { ...mutations },
  actions: { ...actions },
};

export default  module;
