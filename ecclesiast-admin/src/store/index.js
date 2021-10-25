// Core
import Vue from 'vue';
import Vuex from 'vuex';
// Stores
import appConfigStoreModule from '@core/@app-config/appConfigStoreModule';
import { authStore } from '@/app/Auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    appConfig: appConfigStoreModule,
    auth: authStore,
  },
});
