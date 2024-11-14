import { createWebHistory, createRouter } from "vue-router"
import { useRouteStore } from '@/stores/modules/route'
export const routes = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    meta: {
      keepAlive: false,
      title: '首页',
      name: 'home'
    }
  },
  {
    path: "/ticTacToe",
    component: () => import("@/views/tictactoe/index.vue"),
    meta: {
      keepAlive: true,
      title: "井字棋",
      name: 'tictactoe'
    },
  },
  {
    path: "/gomoku",
    component: () => import("@/views/gomoku/index.vue"),
    meta: {
      keepAlive: true,
      title: "五子棋",
      name: 'gomoku'
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  const useRoute = useRouteStore()
  useRoute.setCacheRoute()
  return true
})

export default router
