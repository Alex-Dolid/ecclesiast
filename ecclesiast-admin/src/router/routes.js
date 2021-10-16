// Pages
import App from '@/App.vue';
// Init
import { LocalStorage } from '@/init';
// Constants
import { PAGES } from '@/router/constants';

export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout-content" */ '../layouts/Content.vue'),
    children: [
      {
        ...PAGES.HOME,
        component: () => import(/* webpackChunkName: "home" */ '../pages/privates/Home.vue'),
      },
    ],
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      const { user } = LocalStorage();
      if (!user) {
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
  {
    ...PAGES.ERROR,
    component: () => import(/* webpackChunkName: "layout-error" */ '../layouts/Error.vue'),
  },
  {
    path: '*',
    redirect: 'error-404',
  },
];
