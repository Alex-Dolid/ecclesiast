// Pages
import App from '@/App';
// Plugins
import { LocalStorage } from '@/plugins';
// Constants
import { PAGES } from '@/router/constants';

export default [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout-content" */ '../layouts/Content'),
    children: [
      {
        ...PAGES.HOME,
        component: () => import(/* webpackChunkName: "home" */ '../pages/privates/Home'),
      },
    ],
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      const { user } = LocalStorage();
      if (!user.data) {
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
        component: () => import(/* webpackChunkName: "login" */ '../pages/publics/Login'),
      },
    ],
  },
  {
    ...PAGES.ERROR,
    component: () => import(/* webpackChunkName: "layout-error" */ '../layouts/Error'),
  },
  {
    path: '*',
    redirect: 'error-404',
  },
];
