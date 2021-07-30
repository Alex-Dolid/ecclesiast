// Core
import { RouteRecordRaw } from "vue-router";

enum RoutesNames {
  Home = "AdminPanelHome",
  Locales = "AdminPanelLocales",
  Bibles = "AdminPanelBibles",
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
  {
    path: "bibles",
    name: RoutesNames.Bibles,
    component: (): Promise<unknown> => import(/* webpackChunkName: "AdminPanelBibles" */ "@/pages/privates/AdminPanel/pages/Bibles"),
    meta: {
      title: "Bibles"
    }
  },
];

export default routes;
