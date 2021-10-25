// Api
import api from '@/app/Auth/api';
// Plugins
import { LocalStorage } from '@/plugins';

export default {
  namespace: true,
  state: {
    user: null,
  },
  mutations: {
    setUser: (state, payload) => state.user = payload,
  },
  actions: {
    initAuthState: ({ commit }) => {
      const { user } = LocalStorage();
      if (!user.data) return;

      commit('setUser', user.data);
    },
    signInAsync: async ({ commit }, payload) => {
      try {
        const { user } = LocalStorage();
        const data = await api.signIn(payload);
        commit('setUser', data);
        user.set(data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    signOutAsync: async ({ commit, state }) => {
      const { clearAll } = LocalStorage();
      const { user } = state;
      if (!user) return;
      await api.signOut(state.user._id);
      commit('setUser', null);
      clearAll();
    },
    clear: ({ commit }) => {
      commit('setUser', null);
    },
  },
};
