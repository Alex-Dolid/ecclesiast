// Core
import Vue from 'vue';
import Vuex from 'vuex';
// Api
import api from './api';
// Init
import { LocalStorage } from '@/init';

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
            const { user } = LocalStorage();
            const data = await api.signIn(payload);
            commit('setUser', data);
            user.set(data);
          } catch (error) {
            console.error(error);
            throw error;
          }
        },
        clear: ({ commit }) => {
          commit('setUser', null);
        },
      },
    },
  },
});
