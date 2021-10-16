// Core
import Vue from 'vue';
// App
import App from './App.vue';
// Router
import router from './router';
// Store
import store from './store';
// Plugins
import { vuetify, localStorage } from './plugins';
// Init
import { LocalStorage } from '@/init';

// configure...
Vue.config.productionTip = false;
Vue.use(localStorage, { useLocalStorage: LocalStorage });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
