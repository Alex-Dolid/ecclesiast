// Pages
import App from '@/App.vue';
// Constants
import { PAGES } from '@/router/constants';

export default [
  {
    path: '/',
    children: [
      {
        ...PAGES.HOME,
        component: () => import(/* webpackChunkName: "home" */ '../pages/privates/Home.vue'),
      },
    ],
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      if (!localStorage.getItem('auth')) {
        return next({ name: PAGES.LOGIN.name });
      }

      next();
    },
  },
  {
    path: '/public',
    component: App,
    children: [
      {
        ...PAGES.LOGIN,
        component: () => import(/* webpackChunkName: "login" */ '../pages/publics/Login.vue'),
      },
    ],
  },
];
