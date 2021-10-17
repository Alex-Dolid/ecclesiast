// Core
import Vue from 'vue';
import Vuex from 'vuex';
// Stores
import { authStore } from '@/app/Auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authStore,
  },
});
