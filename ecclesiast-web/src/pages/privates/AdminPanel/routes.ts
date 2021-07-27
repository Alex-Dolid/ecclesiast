// Core
import { RouteRecordRaw } from "vue-router";

enum RoutesNames {
  Home = "AdminPanelHome",
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
  // {
  //   path: "home",
  //   name: RoutesNames.Home,
  //   component: () => import(/* webpackChunkName: "AdminPanelHome" */ "@/pages/privates/AdminPanel/pages/Home"),
  //   meta: {
  //     title: "About"
  //   }
  // },
];

export default routes;
