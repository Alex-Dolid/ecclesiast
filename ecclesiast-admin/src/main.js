// Core
import Vue from 'vue';
// App
import App from './App';
// Router
import router from './router';
// Store
import store from './store';
// Plugins
import { vuetify, i18n } from './plugins';
// Init
import '@/init';

// configure...
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
