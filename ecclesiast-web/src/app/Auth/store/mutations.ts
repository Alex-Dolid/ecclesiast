import { Mutations } from "../types";

const mutations: Mutations = {
  setUser: (state, payload) => state.user = payload
};

export default mutations;
