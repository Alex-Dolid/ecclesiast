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
    component: (): Promise<unknown> => import(/* webpackChunkName: "AdminPanelHome" */ "@/pages/privates/AdminPanel/pages/Home"),
    meta: {
      title: "Home"
    }
  },
  {
    path: "locales",
    name: RoutesNames.Locales,
    component: (): Promise<unknown> => import(/* webpackChunkName: "AdminPanelLocales" */ "@/pages/privates/AdminPanel/pages/Locales"),
    meta: {
      title: "Locales"
    }
  },
];

export default routes;
