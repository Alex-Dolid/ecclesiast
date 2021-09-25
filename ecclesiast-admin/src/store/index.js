// Core
import Vue from 'vue';
import Vuex from 'vuex';
// Api
import api from './api';
// Helpers
import { setToken } from '@/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
  },
  mutations: {
    setAuth: (state, payload) => state.auth = payload,
  },
  actions: {
    loginAsync: async ({ commit }, payload) => {
      try {
        const user = api.auth(payload);
        commit('setAuth', user);
        setToken(user.token);
      } catch (e) {
        console.error(e);
      }
    },
  },
  modules: {},
});
