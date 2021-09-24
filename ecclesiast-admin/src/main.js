// Core
import Vue from 'vue';
// App
import App from './App.vue';
// Router
import router from './router';
// Store
import store from './store';
// Plugins
import vuetify from './plugins/vuetify';

// configure...
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
