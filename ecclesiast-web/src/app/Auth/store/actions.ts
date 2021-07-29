// Api
// import authApi from "../api";
// Helpers
import { setLocalUser, setToken } from "../helpers";
// Types
import { Actions, MutationsNames } from "../types";
import { Role } from "@/app/Auth/types/enums";

const actions: Actions = {
  authAsync: async ({ commit }) => {
    try {
      // const { data } = await authApi.auth(payload);
      const data = {
        _id: "id",
        email: "email",
        role: Role.admin,
        token: "tokennn",
        password: "password",
      }
      commit(MutationsNames.setUser, data);
      setToken(data.token);
      setLocalUser(data);
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
