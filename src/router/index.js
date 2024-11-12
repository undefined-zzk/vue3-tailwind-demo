import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/views/home/index.vue") },
  { path: "/other", component: () => import("@/views/other/index.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
