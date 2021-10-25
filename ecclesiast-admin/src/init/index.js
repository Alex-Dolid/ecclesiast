// Core
import Vue from 'vue';
// Libs
import VueCompositionAPI from '@vue/composition-api';
import { abilitiesPlugin } from '@casl/vue';
// Plugins
import { localStorage, LocalStorage as MyLocalStorage, ability } from '@/plugins';

// Configure and init ...
Vue.use(localStorage, { MyLocalStorage });
Vue.use(VueCompositionAPI);
Vue.use(abilitiesPlugin, ability);
