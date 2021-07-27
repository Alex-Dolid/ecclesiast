// Core
import { RouteRecordRaw } from "vue-router";
// Store
import store from "@/store";
// Pages
import { Home } from "@/pages";
// Routes
import { adminPanelRoutes } from "@/pages/privates/AdminPanel"

export enum RoutesNames {
  Home = "Home",
  SignIn = "SignIn",
  AdminPanel = "AdminPanel",
  NotFound = "NotFound"
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: RoutesNames.Home,
    component: Home
  },
  {
    path: "/sign-in",
    name: RoutesNames.SignIn,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "SignIn" */ "@/app/Auth/pages/SignIn")
  },
  {
    path: "/admin",
    name: RoutesNames.AdminPanel,
    component: () => import(/* webpackChunkName: "AdminPanel" */ "@/pages/privates/AdminPanel"),
    children: adminPanelRoutes,
    beforeEnter: () => {
      // TODO переробити доробити щоб працювали типи
      // @ts-ignore
      if (!store.state.auth.user) {
        return { name: RoutesNames.Home }
      }
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: RoutesNames.NotFound,
    redirect: {
      name: RoutesNames.Home
    }
  }
];

export default routes;
