import { Mutations } from "../types";

const mutations: Mutations = {
  setBibles: (state, payload) => state.bibles = payload,
};

export default mutations;
