import { createWebHistory, createRouter } from "vue-router"
import { useRouteStore } from '@/stores/modules/route'
export const routes = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    meta: {
      keepAlive: false,
      title: '首页',
      name: 'home',
      icon: 'home',
      hidden: false
    }
  },
  {
    path: "/ticTacToe",
    component: () => import("@/views/tictactoe/index.vue"),
    meta: {
      keepAlive: true,
      title: "井字棋",
      name: 'tictactoe',
      icon: 'tictactoe',
      hidden: false
    },
  },
  {
    path: "/gomoku",
    component: () => import("@/views/gomoku/index.vue"),
    meta: {
      keepAlive: true,
      title: "五子棋",
      name: 'gomoku',
      icon: 'gomoku',
      hidden: false
    },
  },
  {
    path: "/cancel",
    component: () => import("@/views/cancel/index.vue"),
    meta: {
      keepAlive: true,
      title: "Axios测试",
      name: 'cancel',
      icon: 'axios',
      hidden: false
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
