export const PAGES = {
  LOGIN: {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'blank',
      resource: 'Public',
      redirectIfLoggedIn: true,
    },
  },
  ERROR: {
    path: '/error-404',
    name: 'Error',
    meta: {
      layout: 'blank',
      resource: 'Public',
      redirectIfLoggedIn: true,
    },
  },
};
