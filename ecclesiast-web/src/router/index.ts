import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { Home } from "@/pages";

export enum RoutesNames {
  Home = "Home",
  SignIn = "SignIn"
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
