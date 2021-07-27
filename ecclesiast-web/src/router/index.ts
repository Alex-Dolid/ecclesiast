// Core
import { createRouter, createWebHistory } from "vue-router"
// Config
import routes, { RoutesNames } from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export { RoutesNames };
export default router
