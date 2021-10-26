// Pages
// import App from '@/App';
// Plugins
import { LocalStorage } from '@/plugins';
// Constants
import { PAGES } from '@/router/constants';

export default [
  {
    path: '/',
    redirect: () => {
      const { user } = LocalStorage();
      if (!user.data) {
        return { name: PAGES.LOGIN.name };
      }
      // const userData = JSON.parse(localStorage.getItem('userData'))
      // const userRole = userData && userData.role ? userData.role : null

      // if (userRole === 'admin') return { name: 'dashboard-crm' }
      // if (userRole === 'client') return { name: 'page-access-control' }

      return { name: PAGES.LOGIN.name };
    },
  },
  {
    component: () => import(/* webpackChunkName: "login" */ '../pages/publics/Login'),
    ...PAGES.LOGIN,
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
