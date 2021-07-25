// Api
import authApi from "../api";
// Helpers
import { setLocalUser, setToken } from "../helpers";
// Types
import { Actions, MutationsNames } from "../types";

const actions: Actions = {
  authAsync: async ({ commit }, payload) => {
    try {
      const user = await authApi.auth(payload);
      commit(MutationsNames.setUser, user);
      setToken(user.token);
      setLocalUser(user);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  clear: ({ commit }) => {
    commit(MutationsNames.setUser, null);
  }
};

export default actions;
