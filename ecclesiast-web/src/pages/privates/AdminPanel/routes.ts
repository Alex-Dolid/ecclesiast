// Core
import { RouteRecordRaw } from "vue-router";

enum RoutesNames {
  Home = "AdminPanelHome",
  Locales = "AdminPanelLocales",
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: RoutesNames.Home,
    component: () => import(/* webpackChunkName: "AdminPanelHome" */ "@/pages/privates/AdminPanel/pages/Home"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "locales",
    name: RoutesNames.Locales,
    component: () => import(/* webpackChunkName: "AdminPanelLocales" */ "@/pages/privates/AdminPanel/pages/Locales"),
    meta: {
      title: "Locales"
    }
  },
];

export default routes;
