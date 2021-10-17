// Core
import Vue from 'vue';
import Vuex from 'vuex';
// Api
import api from './api';
// Helpers
import { setToken } from '@/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: {
      state: {
        user: null,
      },
      mutations: {
        setUser: (state, payload) => state.user = payload,
      },
      actions: {
        signInAsync: async ({ commit }, payload) => {
          try {
            const user = api.signIn(payload);
            commit('setUser', user);
            setToken(user.token);
          } catch (e) {
            console.error(e);
          }
        },
        clear: ({ commit }) => {
          commit('setUser', null);
        },
      },
    },
  },
});
