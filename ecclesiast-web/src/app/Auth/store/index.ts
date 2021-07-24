import state from "./state";
import mutations from "./mutations";
import { Module } from "../types";

const module: Module = {
  namespaced: true,
  state: { ...state },
  mutations: { ...mutations },
}

export default module;
