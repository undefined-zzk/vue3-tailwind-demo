import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    children: [
      {
        path: "ticTacToe",
        component: () => import("@/views/tictactoe/index.vue"),
        meta: {
          KeepAlive: false,
          title: "井字棋",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
