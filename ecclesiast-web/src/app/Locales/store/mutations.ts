import { Mutations } from "../types";

const mutations: Mutations = {
  setLocales: (state, payload) => state.locales = payload,
};

export default mutations;
