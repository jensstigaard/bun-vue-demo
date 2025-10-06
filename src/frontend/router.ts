import { createWebHistory, createRouter } from "vue-router"

import GeoMapView from "./views/GeoMap.vue"
import HomeView from "./views/Home.vue"
import ListView from "./views/List.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/map", component: GeoMapView },
  { path: "/list", component: ListView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
