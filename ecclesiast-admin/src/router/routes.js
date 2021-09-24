// Pages
import Home from '@/pages/privates/Home.vue';
// Constants
import { PAGES } from '@/router/constants';

export default [
  {
    ...PAGES.HOME,
    component: Home,
  },
  {
    ...PAGES.LOGIN,
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../pages/publics/Login.vue'),
  },
];
